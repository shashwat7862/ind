
var BaseService = require('./BaseService');


AgricultureAndFoodService = function (app) {
    this.app = app;
};

AgricultureAndFoodService.prototype = new BaseService();

AgricultureAndFoodService.prototype.saveProduct = function (productData, callback) {
    productData.save((err, productDetails) => {
        console.log("userObj", productDetails, err)

        if (err || !productDetails) {
            callback(err, null);

        } else {
            callback(err, {
                productDetails: productDetails,
                message: "Product Save Successfully"
            });
        }
    });
}



module.exports = function (app) {
    return new AgricultureAndFoodService(app);
};
