const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('node:https');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "9eeb2b7ac8dd93401de35b696db124f5-us21",
  server: "us21",
});


//allow to use all css file and image from public folder. when we add public folder it will already know that we are currently in public folder look at html file to more detail
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
    
    const listId = "c61b50b88f";
    const subscribingUser = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email
      };
      
      async function run() {
        //help prevent error if there is arny error it will go to catch area
        try{
            const response = await client.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
            });
        
            console.log(response.id);
            res.sendFile(__dirname + "/success.html");
       } catch(err){
        console.log(err.status);
        res.sendFile(__dirname +"/failure.html")
       }
    }
      
      run();
    
    
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

    // const url = "https://us21.admin.mailchimp.com/lists/c61b50b88f";
    // const options = {
    //     method: "POST",
    //     auth: "QuiNgo11: 9eeb2b7ac8dd93401de35b696db124f5-us21"

    // }
    // var data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: "subscribe",
    //             merge_fields: {
    //                  FNAME: firstName,
    //                  LNAME: lastName
    //             }
    //         }
    //     ]
    // };
    // var jsonData = JSON.stringify(data);

    // const request = https.request(url, options, function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })
    // })
    // request.write(jsonData);
    // request.end();
     
    

app.listen(process.env.PORT || 3000, function(){
    console.log("Port 3000 is running");
})

// Mailchimp API key : 9eeb2b7ac8dd93401de35b696db124f5-us21
// audience ID: c61b50b88f