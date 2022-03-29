const mongoose = require("mongoose")
const https = require("http")
const { json } = require("express")


 // ______________________________________API For Pin__________________________________________
 const url ="https://api.worldpostallocations.com/?postalcode=263153&countrycode=IN"

 https.get(url,function(res){
     res.on("data",function(data){
         const apiData = json.parse(data)
         const city = apiData.main
     })
 })
    