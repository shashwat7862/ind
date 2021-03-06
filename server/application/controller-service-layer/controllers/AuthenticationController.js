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
        const newpassword = req.body.mobile;
        this.services.authenticationService.resetPassword(mobile, callback);
    }

    const loginOld = function (req, res, callback) {
        const email = req.body.email;
        const password = req.body.password;
        this.services.authenticationService.login(email, password, callback);
    }

    const login = function (req, res, callback) {
        const mobile = req.body.mobile;
        this.services.authenticationService.login(mobile, callback);
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
        this.services.authenticationService.varifyUserByOTP(req.body, callback);
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