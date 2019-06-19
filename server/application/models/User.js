const UserSchema = new mongooseSchema({
    fullName: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, "First name is required."]
    },
    
    email: {
        type: String,
        default: '',
        trim: true,
        unique: true
    },
    userImage: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    mobile: {
        type: Number,
        default: '',
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    salt: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    isAccountLocked: {
        type: Boolean,
        default: false,
        trim: true
    },
    isAccountActive: {
        type: Boolean,
        default: true,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        default: 'ROLE_USER',
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN','ROLE_Seller']
    }
});

 

UserSchema.plugin(mongoose_timestamps);
UserSchema.plugin(mongoose_softDelete);

//configuring different access level for the USER
UserSchema.plugin(require('mongoose-role'), {
    roles: configHolder.config.roles,
    accessLevels: configHolder.config.accessLevels
});

function stringNotNull(obj) {
    return obj.length
}

// UserSchema.pre("save", async function (next) {
//     // convert email to lowercase
//     this.email = this.email.toLowerCase();

//     //check uniqueness of email.
//     const [err, user] = await To(domain.User.findOne({
//         email: this.email
//     }, 'email'));

//     if (err) return next(err);

//     if (user) {
//         this.invalidate("email", "email must be unique");
//         return next(new Error("email must be unique"));
//     }

//     next();
// });

var User = mongoose.model('User', UserSchema);
module.exports = User