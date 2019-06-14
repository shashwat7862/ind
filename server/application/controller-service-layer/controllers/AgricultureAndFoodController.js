module.exports = function () {

    var saveProduct = function (req, res, callback) {
        
            var productData = new domain.AgricultureAndFood(req.body);
            this.services.fashionProductsService.saveProduct(productData, callback);
         

    }

    return {
        saveProduct,
    }
};