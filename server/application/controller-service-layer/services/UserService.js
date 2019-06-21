var BaseService = require('./BaseService');
var jwt = require("jsonwebtoken");
var fs = require('fs');

class UserService extends BaseService {

    findOneUser(query, selectFields = '') {
        return domain.User.findOne(query).select(selectFields);
    }

    findUsers(query, selectFields = '') {
        return domain.User.find(query).select(selectFields);
    }

    findSellers(query, selectFields = '') {
        return domain.Seller.find(query).select(selectFields);
    }

    findQuotations(query, selectFields = '') {
        return domain.Quotation.find(query).select(selectFields);
    }

    findQueries(query, selectFields = '') {
        return domain.Query.find(query).select(selectFields);
    }

    findShowInterest(query, selectFields = '') {
        return domain.ShowInterest.find(query).select(selectFields);
    }


    async isUserExixts(_mobile, callback) {
        console.log("_mobileObj", _mobile);

        const query = {
            mobile:_mobile,
            deleted: false
        }
        const [err, user] = await To(this.findOneUser(query));

        console.log(err,user)

        if (err) return callback(err,null);
        if (!user) return callback(null , {
            msg:'No User Found'
        });

        callback(null, {
            msg:"already User registered",
            userDetails:user
        });

        // user.save((err, userObj) => {
        //     console.log("userObj", userObj, err)

        //     if (err || !userObj) {
        //         callback(err, null);

        //     } else {
        //         var loginTokenObj = {
        //             email: userObj.email,
        //             password: userObj.password
        //         };

        //         var token = jwt.sign(loginTokenObj, "4phd7fdjEUewFB0dYRuHyw==", {
        //             expiresIn: "1h"
        //         });

        //         callback(err, {
        //             userDetails: userObj,
        //             authToken: token
        //         });
        //     }
        // });
    }

    saveShowinterst(data,callback){
        console.log("userObj", data);

        let showInterest = new domain.ShowInterest(data);

        showInterest.save((err, obj) => {
            console.log("obj", obj, err)

            if (err || !obj) {
                callback(err, null);

            } else {

                callback(err, obj);
            }
        });
    }

    editUserDetails(id, userObj, callback) {
        domain.User.findOneAndUpdate({
            _id: id
        }, userObj, {
                new: true
            }, (err, user) => callback(err, user));
    }

    editSellerDetails(id, sellerObj, callback) {
        console.log("he is there", id, sellerObj);

        domain.Seller.findOneAndUpdate({
            _id: id
        }, sellerObj, {
                new: true
            }, (err, user) => callback(err, user));
    }

    async getUser(id, callback) {
        const query = {
            _id: ObjectId(id),
            deleted: false
        }

        const [err, user] = await To(this.findOneUser(query));

        if (err) return callback(err);
        if (!user) return callback(new Error('No user found'));

        callback(null, user);
    }

    async deleteUser(id, callback) {
        const data = {
            deleted: true
        };

        this.updateUser(id, data, callback);
    }

    async searchUser(value, callback) {
        let query = {
            deleted: false
        };

        if (value) {
            query = {
                deleted: false,
                $or: [{
                    firstName: new RegExp('(^' + value + '|' + value + ')', 'i')
                }, {
                    lastName: new RegExp('(^' + value + '|' + value + ')', 'i')
                }, {
                    email: new RegExp('(^' + value + '|' + value + ')', 'i')
                }]
            };
        }

        const [err, users] = await To(this.findUsers(query, '_id firstName lastName email role createdAt'));

        return callback(null, users);
    }

    sellerSaveProfileImage(file, id, callback) {
        console.log("file", file);
        var paths = path.join(__dirname, "../../public/usersImgCollection/");
        var imageName = new Date().getTime() + '_' + file.selectFile.originalFilename;
        var writeFilePath = paths + '/' + imageName;
        fs.readFile(file.selectFile.path, function (err, data) {
            if (err) { } else {
                fs.writeFile(writeFilePath, data, function (error, success) {
                    if (error) {
                        callback(error, null)
                    } else {
                        console.log("id", id);
                        var mongoose = require('mongoose');


                        domain.Seller.findOneAndUpdate(
                            { _id: mongoose.Types.ObjectId(id) },
                            {
                                sellerImage: imageName,

                            },
                            {
                                upsert: true,
                                returnNewDocument: true
                            }
                            , function (ers, success) {
                                console.log("5", ers, success);
                                if (ers) {
                                    callback(ers, null)
                                } else {
                                    console.log("6");

                                    var User = {};
                                    User.msg = "seller Profile image save successfully! and User collection updated"
                                    User.name = imageName;
                                    callback(null, {
                                        data: success,
                                        userDetails: User
                                    })
                                }
                            });
                    }
                });
            }
        });
    };

    async getUserList(req, callback) {
        const [err, users] = await To(this.findUsers({}));
        callback(err, users)
    }

    async getSellerList(req, callback) {
        const [err, seller] = await To(this.findSellers({}));
        callback(err, seller)
    }

    async getQuotationList(req, callback) {
        const [err, Quotation] = await To(this.findQuotations({}));
        callback(err, Quotation)
    }

    async getQueryList(req, callback) {
        const [err, Query] = await To(this.findQueries({}));
        callback(err, Query)
    }

    async getShowInterestList(req, callback) {
        console.log(req.params.mobile,"req.params.mobile", req.params)
        let query = req.params.mobile !== 'null' ? {
            mobile:req.params.mobile
        } : {}
        console.log(query,"show interest query")
        const [err, Query] = await To(this.findShowInterest(query));
        callback(err, Query)
    }


    userSaveProfileImage(file, id, callback) {
        console.log("file", file);
        var paths = path.join(__dirname, "../../public/usersImgCollection/");
        var imageName = new Date().getTime() + '_' + file.selectFile.originalFilename;
        var writeFilePath = paths + '/' + imageName;
        fs.readFile(file.selectFile.path, function (err, data) {
            if (err) { } else {
                fs.writeFile(writeFilePath, data, function (error, success) {
                    if (error) {
                        callback(error, null)
                    } else {
                        console.log("id", id);
                        var mongoose = require('mongoose');


                        domain.User.findOneAndUpdate(
                            { _id: mongoose.Types.ObjectId(id) },
                            {
                                userImage: imageName,

                            },
                            {
                                upsert: true,
                                returnNewDocument: true
                            }
                            , function (ers, success) {
                                console.log("5", ers, success);
                                if (ers) {
                                    callback(ers, null)
                                } else {
                                    console.log("6");

                                    var User = {};
                                    User.msg = "User Profile image save successfully! and User collection updated"
                                    User.name = imageName;
                                    callback(null, {
                                        data: success,
                                        userDetails: User
                                    })
                                }
                            });
                    }
                });
            }
        });
    };

    saveQuotation(Quotation, callback) {
        console.log("QuotationObj", Quotation);

        Quotation.save((err, QuotationObj) => {
            console.log("QuotationObj", QuotationObj, err)

            if (err || !QuotationObj) {
                callback(err, null);

            } else {
                callback(err, {
                    QuotationDetails: QuotationObj,
                    "message": "You Quotation Has been Saved Successfully"
                });
            }
        });
    }

    askQuery(Query, callback) {
        console.log("QueryObj", Query);

        Query.save((err, QueryObj) => {
            console.log("QueryObj", QueryObj, err)

            if (err || !QueryObj) {
                callback(err, null);

            } else {
                callback(err, {
                    QueryDetails: QueryObj,
                    "message": "You Query Has been Saved Successfully"
                });
            }
        });
    }


}





module.exports = function (app) {
    return new UserService(app);
};