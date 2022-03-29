const mongoose = require("mongoose")


// creating Schema for seller
const sellerSchema = new mongoose.Schema({
    selector:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    // state:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
    },

})
// creating Schema for customer
const customerSchema = new mongoose.Schema({
    selector:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    // state:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
    },

})
// creating Schema for Admin
// const AdminSchema = new mongoose.Schema({
//     selector:{
//         type:String,
//         required:true
//     },
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     phone:{
//         type:Number,
//         required:true,
//         unique:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     pin:{
//         type:Number,
//         required:true
//     },
//     // state:{
//     //     type:String,
//     //     required:true
//     // },
//     password:{
//         type:String,
//         required:true
//     },
//     confirmpassword:{
//         type:String,
//     },

// })

// now we need to create a collections

const Seller = new mongoose.model("Seller", sellerSchema)
const Customer = new mongoose.model("Customer", customerSchema)

module.exports = {
    Seller, Customer
}    //export the collections
