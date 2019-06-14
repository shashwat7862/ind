 
var BaseService = require('./BaseService');
 

FashionProductsService = function (app) {
    this.app = app;
};

FashionProductsService.prototype = new BaseService();

FashionProductsService.prototype.saveProduct = function (productData, callback) {
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

FashionProductsService.prototype.saveProductDetails = function (productDataDetails, callback) {
    productDataDetails.save((err, savedproductDetails) => {
        console.log("savedproductDetails", savedproductDetails, err)

        if (err || !savedproductDetails) {
            callback(err, null);

        } else {
            callback(err, {
                productDetails: savedproductDetails,
                message: "Product Save Successfully"
            });
        }
    });
}





module.exports = function (app) {
    return new FashionProductsService(app);
};
