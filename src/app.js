const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const saltRound = 10
const port =process.env.PORT || 3000        //seting part 
require("./db/connection")                  //requiring connection of database

const {Customer,Seller} = require("./modules/regUserSchema")

const app = express()

const static_path = path.join(__dirname,"../public")

app.use(express.static(static_path))        //proviging a path for public folder

app.set("view engine", "ejs")                //view engine set as ejs

app.use(bodyParser.urlencoded({
    extended:true
}))

// _______________________________________________________________________________________________


app.get("/",function (req, res) { 
    res.render('landing')
})

app.get("/rooms",function (req, res) { 
    res.render('rooms')
})
    
app.get("/productDetail",function (req, res) { 
    res.render('productDetail')
})



app.get("/signup",function (req, res) { 
    res.render('signup')
})


app.post("/signup",function(req,res){
    const password = req.body.password;
    const Rep_password = req.body.confirmpassword;
    if(password === Rep_password){  

        bcrypt.hash(req.body.password, saltRound, function(err,hash){
            const  selector= req.body.selector
            // console.log(selector)
            if(selector == "Customer"){
                const customerUser = new Customer({
                    selector: req.body.selector,
                    username: req.body.username,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    pin: req.body.pin,
                    state: req.body.state,
                    password: hash
            
                })
    
                customerUser.save(function(err){
                    if(err){
                        console.log(err)
                    }else{
                        res.render("customer")
                    }   
                })

            }else{
                console.log("Customer DB Err")
            }
            if(selector === "Seller"){
                const sellerUser = new Seller({
                    selector: req.body.selector,
                    username: req.body.username,
                    email: req.body.email,
                    phone: req.body.phone,
                    city: req.body.city,
                    pin: req.body.pin,
                    state: req.body.state,
                    password: hash
            
                })
    
                sellerUser.save(function(err){
                    if(err){
                        console.log(err)
                    }else{
                         res.render("rooms")
                    }   
                })

            }else{
                console.log("Seller DB Err")
            }
            
  
        })
       
    }else{
        res.send("passwords are not matching")
    }

    

})

app.get("/login",function (req, res) { 
    
    res.render('login')
})

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const selector= req.body.selector;
    console.log(selector)
    if (selector === "Seller"){
        Seller.findOne({username:username}&&{selector:selector},function(err,foundUser){
            if(err){
                console.log(err)
            }else{
                if(foundUser){
                    bcrypt.compare(password, foundUser.password,function(err,result){
                        if(result === true){
                            if(foundUser.selector ==="seller"){
                                res.render("rooms")
                            }else{
                                res.send("Invalid Seller")
                            }
                        }else{
                            res.send("Invalid Seller's Username or Password")
                            
                        }
                    })
                }
            }
        })

    }else{
        console.log("Seller Account login err")
    }if(selector === "Customer"){
        Customer.findOne({username:username},function(err,foundUser){
            if(err){
                console.log(err)
            }else{
                if(foundUser){
                    bcrypt.compare(password, foundUser.password,function(err,result){
                        if(result === true){
                            if(foundUser.selector ==="Customer"){
                                res.render("customer")
                            }else{
                                res.send("Invalid Customer")
                            }
                        }else{
                            res.send("Invalid Customer's Username or Password")
                            
                        }
                    })
                }
            }
        })
    }else{
        console.log("Customer Account login err")
    }
    
})

app.get("/userDetail",function (req, res) { 
    
    res.render('userDetail')
})

app.get("/logout",function(req,res){
    req.logout()
    res.redirect("/")
})

// _______________________________________________________________________________________________
app.listen(3000,function(){
    console.log(`server started at port ${port}`)   //
})