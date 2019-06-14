var baseService = require("./BaseService.js");
var userService = require("./UserService.js");
var jwt = require("jsonwebtoken");
var request = require('request');

class AuthenticatonService extends baseService {


    generateAuthenticationToken(email, password, userData, callback) {
        var UserObj = {
            email: email,
            password: password
        };
        var token = jwt.sign(UserObj, "4phd7fdjEUewFB0dYRuHyw==", {
            expiresIn: "1h"
        });
        console.log(token)
        callback(null, {
            authToken: token,
            userDetails: userData
        })
    }



    async login(email, password, callback) {
        console.log(email, password);


        const query = {
            email: email.toLowerCase()
        }

        const [err, user] = await To(domain.User.findOne(query));



        if (err || !user) return callback(new Error("Invalid email or Password"));

        // if (user.isAccountLocked == true) return callback(new Error('Your account is locked.Please contact to site admin.'))

        // if (user.isAccountActive == false) return callback(new Error("Verify your email."));

        if (configHolder.encryptUtil.verifyPassword(user, password)) {
            this.generateAuthenticationToken(email, password, user, callback);
        } else {
            callback(new Error("Invalid 1 Email or Password"), null);
        }
    }

    async sellerlogin(email, password, callback) {
        console.log(email, password);


        const query = {
            email: email.toLowerCase()
        }

        const [err, user] = await To(domain.Seller.findOne(query));

        console.log("1", err)

        if (err || !user) return callback(new Error("Invalid email or Password"));

        // if (user.isAccountLocked == true) return callback(new Error('Your account is locked.Please contact to site admin.'))

        // if (user.isAccountActive == false) return callback(new Error("Verify your email."));
        console.log("2", err, user)
        if (configHolder.encryptUtil.verifyPassword(user, password)) {
            this.generateAuthenticationToken(email, password, user, callback);
        } else {
            callback(new Error("Invalid 1 Email or Password"), null);
        }
    }

    /* This method allow user to log out.
     * Simply find the Authentication token and delete it.
     */
    logout(token, callback) {
        domain.AuthenticationToken.remove({
            authToken: token
        }, (err, token) => callback(err, {
            message: 'user succcessfully logout'
        }));
    }

    saveForgotPasswordToken(token, user) {
        const forgotPasswordToken = new domain.RegistrationToken({
            "forgotPasswordToken": token,
            "email": user.email,
            "user": user._id
        });
        return forgotPasswordToken.save();
    }

    sendEmailToUser(appName, token, user) {
        const toEmail = user.email;
        const subject = "Change Password";
        let forgetPasswordUrl = url.resolve(configHolder.config.angularAppUrl, `/reset-password/${token}`);

        if (appName.toLowerCase() == "vuejs") {
            forgetPasswordUrl = url.resolve(configHolder.config.vueAppUrl, `/#/reset-password/${token}`);
        }

        const emailBody = `Hi ${user.firstName},
                Please click the link below to change your password.
                ${forgetPasswordUrl} 
        Thank you`;

        return configHolder.EmailUtil.sendMail(toEmail, subject, emailBody);
    }

    /*
     * This function is used to initiate change password process.
     * finds the user through email.
     * If user exists, generate forget Password token
     * send it to user through email.
     */
    async forgotPassword(email, token, appName, callback) {
        const query = {
            email: email,
            deleted: false
        }

        try {
            const user = await domain.User.findOne(query);

            if (!user) throw new Error('Invalid Email.');

            const forgotPasswordToken = await this.saveForgotPasswordToken(token, user);

            if (!forgotPasswordToken) throw new Error('Unable to save the forgot password token.');

            const success = this.sendEmailToUser(appName, token, user);

            if (!success) throw new Error('Unable to send the email.');

            return callback(null, {
                message: 'Email has been sent to your mail.Please check it.'
            });

        } catch (err) {
            return callback(err);
        }
    }

    findUserThroughToken(token) {
        return domain.RegistrationToken.findOne({
            forgotPasswordToken: token
        }).populate('user');
    }


    generateOTP(mobile, email, callback) {

        var availableNumbers = "0123456789";
        var otp = '';
        for (var i = 0; i <= 3; i++) {
            var symbol = availableNumbers[(Math.floor(Math.random() * availableNumbers.length))];
            otp += symbol;
        }

        console.log(mobile, "mobile")
        var url = configHolder.config.otpUrl + mobile + "/" + otp
        console.log("Final OTP url", url);
        request(url, function (err, success) {
            if (err) {
                callback(err, null)
            } else {
                // callback(null, success);
                var otpObj = new domain.Otp({
                    "otp": otp,
                    email: email,
                    mobileNumber: mobile,
                    countrycode: "+91"
                });
                otpObj.save(function (err, success) {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, success)
                    }
                });
            }
        });


    }



    //varify
    getUserByOTP(next, results, mobileNumber, Otp) {
        console.log("inside getUserByOTP", mobileNumber, Otp)
        domain.Otp.findOne({
            mobileNumber: mobileNumber,
            otp: Otp,
        },
            function (err, otpSuccess) {
                if (err || otpSuccess == null) {
                    next(("No User Found On with OTP"), null)
                } else {
                    console.log("@@", otpSuccess)
                    next(null, otpSuccess)
                }
            });
    }


    removeOTP(next, mobileNumber, Otp) {
        domain.Otp.remove({
            mobileNumber: mobileNumber,
            otp: Otp
        }, function (err, removed) {
            if (err) {
                next(err, null)
            } else {
                console.log(removed)
                next(null, removed)
            }
        });
    }


    findOneOTP(query, selectFields = '') {
        return domain.Otp.findOne(query).select(selectFields);
    }

    removeOTP(query, selectFields = '') {
        return domain.Otp.remove(query).select(selectFields);
    }


    async varifyUserByOTP(mobile, otp, callback) {
        console.log("mo", mobile, otp);

        const query = {
            mobileNumber: mobile,
            otp: otp,
        }

        const [err, otpDetails] = await To(this.findOneOTP(query));
        const [errors, otpRemoveDetails] = await To(this.removeOTP(query));
        console.log("otpDetails", otpDetails);

        if (err) return callback(err);
        if (!otpDetails) return callback(new Error('No otp found'));

        // if (errors) return callback(errors,null);
        // if (!otpRemoveDetails) return callback(new Error('RemoveDetails not found'));

        callback(null, {
            "otpDetails": otpDetails,
            "otpRemoveDetails": otpRemoveDetails
        });
    }


    //         async.auto({
    //     getUserByOTP: function (next, results) {
    //         console.log("log", this)
    //         this.getUserByOTP(next, results, mobile, Otp); // otp varification call
    //     },
    //     removeOTP: ['getUserByOTP', function (next, results) {
    //         this.removeOTP(next, mobile, Otp);
    //     }],


    // }, function (err, success) {
    //     callback(err, success);
    // });




    changeUserPassword(newPassword, userId, salt) {
        return domain.User.findOneAndUpdate({
            _id: userId
        }, {
                password: configHolder.encryptUtil.encryptPassword(salt, newPassword)
            }, {
                new: true
            });
    }

    removeforgotPasswordToken(token) {
        return domain.RegistrationToken.remove({
            forgotPasswordToken: token
        });
    }

    /*
     * This function is used to change user password.
     * finds the user through token.
     * If user exists, reset the password
     * finally, delete the token.
     */
    async resetPassword(token, newPassword, callback) {
        try {
            const tokenObj = await this.findUserThroughToken(token);

            if (!tokenObj || !tokenObj.user) throw new Error('Invalid token.');

            const {
                user
            } = tokenObj;

            let success = await this.changeUserPassword(newPassword, user._id, user.salt);

            if (!success) throw new Error('Unable to reset the password');

            success = await this.removeforgotPasswordToken(token);

            if (!success) throw new Error('Unable to delete the token.');

            return callback(null, {
                message: 'Password successfully changed.'
            })

        } catch (err) {
            return callback(err);
        }
    }

    /* Validate authentication token
     * find token in database
     * If token exists, user is logged in
     * else user logged out
     */
    validateAuthToken(token, callback) {
        domain.AuthenticationToken.findOne({
            authToken: token
        }, function (err, obj) {
            let loggedIn = true;
            if (err || !obj) loggedIn = false;

            callback(null, {
                loggedIn
            })
        });
    }

    findUserThroughRegistrationToken(token) {
        return domain.RegistrationToken.findOne({
            registrationToken: token
        }).populate('user');
    }

    updateisAccountActiveToTrue(userId) {
        return domain.User.findOneAndUpdate({
            _id: userId,
            deleted: false
        }, {
                isAccountActive: true
            }, {
                new: true
            });
    }

    removeRegistrationToken(token) {
        return domain.RegistrationToken.remove({
            registrationToken: token
        });
    }

    /*
     * This function is used to verify email.
     * find the user through registration token
     * if token is valid , activate the user account
     * delete the registration token
     */
    async verifyEmail(token, callback) {
        try {
            const tokenObj = await this.findUserThroughRegistrationToken(token);

            if (!tokenObj || !tokenObj.user) throw new Error('Invalid token.');

            const {
                user
            } = tokenObj;

            let success = await this.updateisAccountActiveToTrue(user._id);

            if (!success) throw new Error('Unable to update the user');

            success = await this.removeRegistrationToken(token);

            if (!success) throw new Error('Unable to delete the token.');

            return callback(null, {
                message: 'Account has been activated.'
            })

        } catch (err) {
            return callback(err);
        }
    }
}

module.exports = function (app) {
    return new AuthenticatonService(app);
}