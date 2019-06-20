
var fs = require('fs');
var BaseService = require('./BaseService');


CategoryService = function (app) {
    this.app = app;
};

CategoryService.prototype = new BaseService();

function findOneUser(query, selectFields = '') {
    return domain.User.findOne(query).select(selectFields);
}

function findUsers(query, selectFields = '') {
    return domain.User.find(query).select(selectFields);
}

function findSellers(query, selectFields = '') {
    return domain.Seller.find(query).select(selectFields);
}

var Category = ['food', 'fashion'];

CategoryService.prototype.saveImage = function (file, callback) {

    console.log("file", file);
    var paths = path.join(__dirname, "../../public/productImages/");
    var imageName = new Date().getTime() +".jpg"
    var writeFilePath = paths + '/' + imageName;
    fs.readFile(file.image.path, function (err, data) {
        if (err) { } else {
            fs.writeFile(writeFilePath, data, function (error, success) {
                if (error) {
                    callback(error, null)
                } else {
                    var product = {};
                    product.msg = "product image save successfully!"
                    product.name = imageName;
                    callback(null, product)
                }
            });
        }
    });
}



function makeDir(accessPath, folderName, next) {
    console.log("Going to create directory /tmp/test", accessPath + folderName);
    fs.mkdir(accessPath + folderName, function (err) {
        if (err) {
            next(err, null)
        } else {
            console.log("Directory created successfully!");
            var dir = {};
            dir.folder = "Directory created successfully!"
            next(null, dir)
        }

    });
}


CategoryService.prototype.searchProduct = function (SearchWord, callback) {
    var java = require('java4node');
    console.log(java);
    var Collections = [];
    Category.forEach(function (CategoryName) {
        console.log(CategoryName);
        if (CategoryName.includes(SearchWord)) {
            Collections.push(CategoryName);
        }

        var CollectionName;
        if (CategoryName == 'food') {
            CollectionName = "AgricultureAndFood";
        } else {
            CollectionName = "FashionBrandedProduct"
        }

        domain[CollectionName].find({
            $or: [{
                productName: new RegExp(SearchWord, 'i')
            }, {
                brandName: new RegExp(SearchWord, 'i')
            }]
        }).sort({
            _id: -1
        }).exec(function (err, obj) {
            callback(err, obj)
        });

    });
}



CategoryService.prototype.fetchProducts = function (req, callback) {
    domain[req.params.category].find().exec(function (ers, success) {
        if (ers) {
            callback(ers, null)
        } else {
            callback(null, success)
        }
    });

}


CategoryService.prototype.fetchAddToMyGodamList = function (id, callback) {
    domain.Cart.find({
        UserId: id
    }).exec(function (ers, success) {
        if (ers) {
            callback(ers, null)
        } else {
            callback(null, success)
        }
    });
}



CategoryService.prototype.saveProductDetails = function (productDataDetails, callback) {

    productDataDetails.save((err, savedproductDetails) => {
        console.log("savedproductDetails", savedproductDetails, err)

        if (err || !savedproductDetails) {
            callback(err, null);

        } else {
            callback(err, {
                Details: savedproductDetails,
                Message: "Save Successfully"
            });
        }
    });
}

CategoryService.prototype.fetchProductList = function (callback) {
    domain['industrial_product'].find().exec(function (ers, success) {
        if (ers) {
            callback(ers, null)
        } else {
            callback(null, success)
        }
    });
}






CategoryService.prototype.fetchUserData = async function (id, callback) {



        const query = {
            _id: ObjectId(id),
            deleted: false
        }

        const [err, user] = await To(findUsers(query));

        if (err) return callback(err);
        if (!user) return callback(new Error('No user found'));

        callback(null, user);

};
CategoryService.prototype.getProductDetails =  function (id, callback) {
console.log(id,"id")
    domain.industrial_product.find({
        _id: id
    }).exec(function (ers, success) {
        if (ers) {
            callback(ers, null)
        } else {
            callback(null, success)
        }
    });
}




module.exports = function (app) {
    return new CategoryService(app);
};
