
var QuerySchema = new mongooseSchema({
    name: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },

    email: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    query: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
   
    mobile: {
        type: Number,
        trim: true,
        required: false,
    }
    
});



var Query = mongoose.model('Query', QuerySchema);
module.exports = Query

