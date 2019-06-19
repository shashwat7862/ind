module.exports = (function () {

    const forgotPassword = function (req, res, callback) {
        const email = req.body.email;
        const appName = req.body.appName;
        const token = uuid.v1();
        this.services.authenticationService.forgotPassword(email, token, appName, callback);
    }

    const verifyEmail = function (req, res, callback) {
        const token = req.params.token;
        this.services.authenticationService.verifyEmail(token, callback);
    }

    const resetPassword = function (req, res, callback) {
        const token = req.params.token;
        const newpassword = req.body.newpassword;
        this.services.authenticationService.resetPassword(token, newpassword, callback);
    }

    const login = function (req, res, callback) {
        const email = req.body.email;
        const password = req.body.password;
        this.services.authenticationService.login(email, password, callback);
    }

    const sellerlogin = function (req, res, callback) {
        const email = req.body.email;
        const password = req.body.password;
        this.services.authenticationService.sellerlogin(email, password, callback);
    }


    const logout = function (req, res, callback) {
        const token = req.params.token;
        this.services.authenticationService.logout(token, callback);
    }

    const validateAuthToken = function (req, res, callback) {
        const token = req.params.token;
        this.services.authenticationService.validateAuthToken(token, callback);
    }

    const generateOTP = function (req, res, callback) {
        const mobile = req.params.mobile;
        this.services.authenticationService.generateOTP(mobile, callback);
    }

    const varifyUserByOTP = function (req, res, callback) {
        const mobile = req.params.mobile;
        const otp = req.params.otp;
        this.services.authenticationService.varifyUserByOTP(mobile,otp, callback);
    }

    return {
        forgotPassword,
        resetPassword,
        login,
        logout,
        verifyEmail,
        validateAuthToken,
        generateOTP,
        varifyUserByOTP,
        sellerlogin
    }
})();