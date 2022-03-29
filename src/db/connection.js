const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/NewusersDB",{
    useNewUrlParser:true
}).then(function(){
    console.log("Connection successful")
}).catch(function(err){
    console.log(err)
})