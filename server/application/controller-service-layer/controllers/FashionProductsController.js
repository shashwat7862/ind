module.exports = function () {

    var saveProduct = function (req, res, callback) {
        console.log("hgvf", req.body, req.body.isBranded == false);

        if (req.body.isBranded == false){
            console.log("req.isBranded false");
            var productData = new domain.FashionNonBrandedProduct(req.body);
            this.services.fashionProductsService.saveProduct(productData, callback);
        }else{
            var productData = new domain.FashionBrandedProduct(req.body);
            this.services.fashionProductsService.saveProduct(productData, callback);
        }
        
    }

 



    return {
        saveProduct,
    }
};