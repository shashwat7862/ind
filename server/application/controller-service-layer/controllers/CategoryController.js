module.exports = function() {

    var searchProduct = function(req, res, callback) {
        console.log(req.params.q);
        this.services.categoryService.searchProduct(req.params.q, callback);
    }

    var saveImage = function(req, res, callback) {
        this.services.categoryService.saveImage(req.files, callback);
    }

    var saveProduct = function(req, res, callback) {
        var dynamicDomain = null;
        if (req.body) {
            switch (req.body.category) {
                case 'fashion':
                    var dynamicDomain = setDomain(req.body.category, req.body.isBranded);
                    break;
                case 'electronics':
                    var dynamicDomain = setDomain(req.body.category, req.body.isBranded);
                    break;
                case 'taxtile':
                    var dynamicDomain = setDomain(req.body.category, req.body.isBranded);
                    break;
                default:
                    break;
            }
        }

        //         "cfvgbhnj"
        // category
        // :
        // "electronics"

        console.log("dynamicDomain", dynamicDomain)

        var productData = new domain[dynamicDomain](req.body);
        this.services.categoryService.saveProductDetails(productData, callback);
    }

    var saveProductDetails = function(req, res, callback) {
        if (req.body) {
        var productData = new domain['industrial_product'](req.body);
        this.services.categoryService.saveProductDetails(productData, callback);
        }
    }


    function setDomain(domain, isBranded) {
        switch (domain) {
            case 'fashion':
                if (isBranded == false) {
                    return 'FashionNonBrandedProduct'
                } else {

                    return 'FashionBrandedProduct'
                }
            case 'electronics':
                if (isBranded == false) {
                    return 'ElectronicsNonBrandedProduct'
                } else {

                    return 'ElectronicsBrandedProduct'
                }
            case 'taxtile':
                if (isBranded == false) {
                    return 'TaxtileNonBrandedProduct'
                } else {
                    return 'TaxtileBrandedProduct'
                }
            default:
                break;
        }
    }

    function setProductDomain(domain, isBranded) {
        switch (domain) {
            case 'fashion':
                if (isBranded == false) {
                    return 'FashionNonBrandedProductDetails'
                } else {

                    return 'FashionBrandedProductDetails'
                }
            case 'taxtile':
                if (isBranded == false) {
                    return 'TaxtileNonBrandedProductDetails'
                } else {
                    return 'TaxtileBrandedProductDetails'
                }
            default:
                break;
        }
    }

    function fashion(req, callback) {
        if (req.body.isBranded == false) {
            console.log("req.isBranded false");
            var productData = new domain.FashionNonBrandedProductDetails(req.body);
            this.services.fashionProductsService.saveProductDetails(productData, callback);
        } else {
            var productData = new domain.FashionBrandedProductDetails(req.body);
            this.services.fashionProductsService.saveProductDetails(productData, callback);
        }
    }

    function electronic(req, callback) {
        if (req.body.isBranded == false) {
            console.log("req.isBranded false");
            var productData = new domain.FashionNonBrandedProductDetails(req.body);
            this.services.fashionProductsService.saveProductDetails(productData, callback);
        } else {
            var productData = new domain.FashionBrandedProductDetails(req.body);
            this.services.fashionProductsService.saveProductDetails(productData, callback);
        }
    }

    function taxtile(req, dynamicDomain, callback) {
        if (req.body.isBranded == false) {
            console.log("req.isBranded false");
            // var productData = new domain.TaxtileBrandedProductDetails(req.body);
            var productData = new domain[dynamicDomain](req.body);
            this.services.categoryService.saveProductDetails(productData, callback);
        } else {
            // console.log("req.isBranded true", req.body, dynamicDomain, domain);
            // console.log(domain[dynamicDomain]);

            // var productData = new domain.TaxtileNonBrandedProductDetails(req.body);
            var productData = new domain[dynamicDomain](req.body);
            console.log(productData, "productData");

            console.log(this.services.categoryService.saveProductDetails, "-------------------------------");

            this.services.categoryService.saveProductDetails(productData, callback);
        }
    }



    var fetchUserData = function(req, res, callback) {
        this.services.categoryService.fetchUserData(req.params.id, callback);
    }

    var fetchProducts = function(req, res, callback) {
        console.log(req.params.category);
        var domain = req.params.category;

        this.services.categoryService.fetchProducts(req, callback);
    }

    var fetchProductList = function(req, res, callback) {
        this.services.categoryService.fetchProductList(callback);
    }



    var addToMyGodam = function(req, res, callback) {
        var productData = new domain.Cart(req.body);
        this.services.categoryService.saveProductDetails(productData, callback);
    }

    var fetchAddToMyGodamList = function(req, res, callback) {

        this.services.categoryService.fetchAddToMyGodamList(req.params.id, callback);
    }

    var getProductDetails = function(req, res, callback) {

        this.services.categoryService.getProductDetails(req.params.id, callback);
    }

    





    return {
        searchProduct,
        saveImage,
        saveProduct,
        saveProductDetails,
        fetchUserData,
        fetchProducts,
        fetchProductList,
        addToMyGodam,
        fetchAddToMyGodamList,
        getProductDetails
    }
};