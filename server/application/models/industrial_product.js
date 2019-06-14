 var IndustrialProduct = new mongooseSchema({
     category: {
         type: String,
         default: '',
         required: true,
         trim: true,
     },

     subCategory: {
         type: String,
         default: '',
         required: false,
         trim: true
     },
     productName: {
         type: String,
         default: 'default',
         required: true,
         trim: true,
     },
     productImage: {
         type: String,
         default: null,
         required: false,
         trim: true,
     },
 
     area: {
         type: String,
         default: '',
         required: true,
         trim: false
     },
     city: {
         type: String,
         trim: true,
         required: false,
     },
     pincode: {
         type: Number,

         required: false,
     },
     dealerName: {
         type: String,
         trim: true,
         required: true,
     },

     color: {
         type: String,
         default: '',
         trim: false,
     },
     description: {
         type: String,
         default: '',
         trim: true,
     },
     modelNo: {
         type: String,
         default: '',
         required: true,
         trim: true
     },
     isVerfiedByUs:{
        type: String,
        default: false,
        required: false,
        trim: true
    },

     brandName: {
         type: String,
         default: '',
         required: true,
         trim: true
     },
     isBranded: {
         type: Boolean,
         default: false,
     },
     productStatus: {
         type: Boolean,
         default: true,
         trim: true
     },price:{
         type:Number,
         default:0,
         trim:true,
         required:true
     }
 });



 var industrialProduct = mongoose.model('industrialProduct', IndustrialProduct);
 module.exports = industrialProduct



  