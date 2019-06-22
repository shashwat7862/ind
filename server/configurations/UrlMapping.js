	module.exports = function(app) {
	    var controllers = app.controllers,
	        views = app.views;

	    return {
	        "/api/v1/user": [{
	            method: "POST",
	            action: controllers.userController.createUser,
	            middleware: [
	                validate(validationSchema.user.createUser)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/:id": [{
	            method: "GET",
	            action: controllers.userController.getUser,
	            middleware: [
					function(req,res,next) {
						configHolder.security.authority("anonymous")
						next();
						
					},
	                validate(validationSchema.user.getUser)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }, {
	            method: "PUT",
	            action: controllers.userController.updateUser,
	            middleware: [
					console.log("configHolder.security", configHolder.security),
					
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.user.updateUser)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }, {
	            method: "DELETE",
	            action: controllers.userController.deleteUser,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.user.deleteUser)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/users": [{
	            method: "GET",
	            action: controllers.userController.searchUser,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.user.searchUser)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/forgotpassword": [{
	            method: "POST",
	            action: controllers.authenticationController.forgotPassword,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.authentication.forgotPassword)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/verifyemail/:token": [{
	            method: "GET",
	            action: controllers.authenticationController.verifyEmail,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.authentication.verifyEmail)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/resetpassword/:token": [{
	            method: "PUT",
	            action: controllers.authenticationController.resetPassword,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.authentication.resetPassword)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/login": [{
	            method: "POST",
	            action: controllers.authenticationController.login,
	            middleware: [
	                validate(validationSchema.authentication.login)
	            ],
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/api/v1/seller/login": [{
				method: "POST",
				action: controllers.authenticationController.sellerlogin,
				middleware: [
					// validate(validationSchema.authentication.login)
				],
				views: {
					json: views.jsonView
				}
			}],

	        "/api/v1/user/logout/:token": [{
	            method: "GET",
	            action: controllers.authenticationController.logout,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.authentication.logout)
	            ],
	            views: {
	                json: views.jsonView
	            }
	        }],

	        "/api/v1/user/authtoken/:token": [{
	            method: "GET",
	            action: controllers.authenticationController.validateAuthToken,
	            middleware: [
	                configHolder.security.authority('anonymous'),
	                validate(validationSchema.authentication.validateAuthToken)
	            ],
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/user/OTP/:mobile": [{
				method: "GET",
				action: controllers.authenticationController.generateOTP,
				middleware: [
					// configHolder.security.authority('anonymous'),
					// validate(validationSchema.authentication.validateAuthToken)
				],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/userapi/varifyUserByOTP": [{
				method: "POST",
				action: controllers.authenticationController.varifyUserByOTP,
				middleware: [
					// configHolder.security.authority('anonymous'),
					// validate(validationSchema.authentication.validateAuthToken)
				],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/products/SaveFashionItem": [{
				method: "POST",
				action: controllers.fashionProductsController.saveProduct,
				middleware: [
				],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/products/SaveAgricultureAndFoodItem": [{
				method: "POST",
				action: controllers.agricultureAndFoodController.saveProduct,
				middleware: [
				],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/products/SearchProducts/:q": [{
				method: "GET",
				action: controllers.categoryController.searchProduct,
				middleware: [
				],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/saveImage": [{
				method: "POST",
				action: controllers.categoryController.saveImage,
				middleware: [multipartMiddleware],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/saveProfileImage/seller/:id": [{
				method: "POST",
				action: controllers.userController.sellerSaveProfileImage,
				middleware: [multipartMiddleware],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/saveProfileImage/user/:id": [{
				method: "POST",
				action: controllers.userController.userSaveProfileImage,
				middleware: [multipartMiddleware],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/saveProductDetails": [{
				method: "POST",
				action: controllers.categoryController.saveProductDetails,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/saveQuery": [{
				method: "POST",
				action: controllers.categoryController.saveQuery,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/saveProductDetails": [{
				method: "POST",
				action: controllers.categoryController.saveProductDetails,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/allcategorys/allproduct/saveProduct": [{
				method: "POST",
				action: controllers.categoryController.saveProduct,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/Industrial/ProductList": [{
				method: "GET",
				action: controllers.categoryController.fetchProductList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/Quotation/saveQuotation": [{
				method: "POST",
				action: controllers.userController.saveQuotation,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/showinterst/saveShowinterst": [{
				method: "POST",
				action: controllers.userController.saveShowinterst,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/getShowInterestList/:mobile": [{
				method: "GET",
				action: controllers.userController.getShowInterestList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/ContactUs/askQuery": [{
				method: "POST",
				action: controllers.userController.askQuery,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/user/details/:id": [{
				method: "GET",
				action: controllers.categoryController.fetchUserData,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/edit/UserDetails/:id": [{
				method: "PUT",
				action: controllers.userController.editUserDetails,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/edit/SellerDetails/:id": [{
				method: "PUT",
				action: controllers.userController.editSellerDetails,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/fetch/Products/:category": [{
				method: "GET",
				action: controllers.categoryController.fetchProducts,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/fetch/userList": [{
				method: "GET",
				action: controllers.userController.getUserList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/fetch/sellerList": [{
				method: "GET",
				action: controllers.userController.getSellerList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/fetch/quotationList": [{
				method: "GET",
				action: controllers.userController.getQuotationList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}], 
			"/api/v1/fetch/queryList": [{
				method: "GET",
				action: controllers.userController.getQueryList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/addToMyGodam": [{
				method: "POST",
				action: controllers.categoryController.addToMyGodam,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/getDetails/:id": [{
				method: "GET",
				action: controllers.categoryController.getProductDetails,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
			"/api/v1/product/fetchAddToMyGodamList/:id": [{
				method: "GET",
				action: controllers.categoryController.fetchAddToMyGodamList,
				middleware: [],
				views: {
					json: views.jsonView
				}
			}],
	    };
	};


	//sudo service mongod start

// 	-- UI
// seller popup
// profiile list fix
// user profile 
// seller profile
// chat set
// etc

// --main site

// product id -> product info ->api

// buyproduct api 
// payment gatway set
// searching api fix

// -=dashboard 
// payment list

// -----done

// contact us -> api
// req for quatation api


// contact query list 
// user list api
// seller list api



// https://github.com/Instamojo/instamojo-nodejs/blob/master/instamojo.js#L8