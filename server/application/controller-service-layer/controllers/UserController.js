module.exports = function () {
	var createUser = function (req, res, callback) {
		console.log(req.body, "-------------------");
		var user = null;
		var self = this;
		var salt = uuid.v1();

		 
			console.log("user");
			user = new domain.User(req.body);
			user.role = 'ROLE_USER';
		


		user.salt = salt;
		user.password = configHolder.encryptUtil.encryptPassword(salt, req.body.password);

		console.log(user, "-------------------");

		user.validate(function (err) {
			if (err) {
				Logger.info(err.errors.stack);
				err.status = 400;
				callback(err, user);
			} else {
				self.services.userService.createUser(user, callback);

			}
		})
	}

	var getUser = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.getUser(id, callback);
	}

	var updateUser = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.updateUser(id, req.body, callback);
	}

	var deleteUser = function (req, res, callback) {
		var id = req.params.id
		this.services.userService.deleteUser(id, callback);
	}

	var searchUser = function (req, res, callback) {
		var data = req.query.value;
		this.services.userService.searchUser(data, callback);
	}

	var sellerSaveProfileImage = function (req, res, callback) {
		this.services.userService.sellerSaveProfileImage(req.files, req.params.id, callback);
	}

	var userSaveProfileImage = function (req, res, callback) {
		this.services.userService.userSaveProfileImage(req.files, req.params.id, callback);
	}

	var editUserDetails = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.editUserDetails(id, req.body, callback);
	}

	var editSellerDetails = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.editSellerDetails(id, req.body, callback);
	}

	var getUserList = function (req, res, callback) {
		this.services.userService.getUserList(req, callback);
	}

	var getSellerList = function (req, res, callback) {
		this.services.userService.getSellerList(req, callback);
	}

	var getQuotationList = function (req, res, callback) {
		this.services.userService.getQuotationList(req, callback);
	}

	var getQueryList = function (req, res, callback) {
		this.services.userService.getQueryList(req, callback);
	}

	var saveQuotation = function (req, res, callback) {
		
		let	Quotation = new domain.Quotation(req.body);
		console.log("Quotation",Quotation);
		this.services.userService.saveQuotation(Quotation, callback);
	}

	var saveShowinterst= function (req, res, callback) {
		
		let	ShowInterestData = new domain.ShowInterest(req.body);
		console.log("Quotation",ShowInterestData);
		this.services.userService.saveShowinterst(ShowInterestData, callback);
	}

	var getShowInterestList = function (req, res, callback) {
		this.services.userService.getShowInterestList(req, callback);
	}

	var askQuery = function (req, res, callback) {
		
		let	Query = new domain.Query(req.body);
		console.log("Query",Query);
		this.services.userService.askQuery(Query, callback);
	}

	return {
		createUser,
		getUser,
		updateUser,
		searchUser,
		deleteUser,
		sellerSaveProfileImage,
		userSaveProfileImage,
		editUserDetails,
		editSellerDetails,
		getShowInterestList,
		getUserList,
		saveQuotation,
		askQuery,
		getSellerList,
		getQuotationList,
		getQueryList,
		saveShowinterst
	}
};