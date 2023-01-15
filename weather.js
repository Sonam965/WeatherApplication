const express = require('express');
const https = require('https');
const app = express();
const bodyparser = require ("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("the server has started at port 3000");
})

app.get("/",function(request,response){
    response.sendFile(__dirname + "/index.html");
});
app.post("/",function(request,response){
    var cityName = request.body.cityname;
    const apikey = "828507c4a2e779ac8f6ce51245e98104";

    const url = "https://api.openweathermap.org/data/2.5/weather?q= "+cityName+"&appid=" +apikey+"&units=metric";

    https.get(url,function(res){
        res.on("data",function(data){
           
 
 
             var weatherinfo = JSON.parse(data);
             var weather = weatherinfo.weather[0].main;
             var temperature = weatherinfo.main.temp;
             var place = weatherinfo.name;
             var icon = weatherinfo.weather[0].icon;
             var imgURL = "https://openweathermap.org/img/wn/"+icon +"@2x.png";
             response.write("<h1>"+  "The weather in "+ place   +" is " + weather +"</h1> <br>");
             response.write("the tempreture in "+ cityName+" is " + temperature + " degree Celcius");
              response.write("<img src = " + imgURL +  ">");
             response.send();
 
              
        });

});
  
        
    
    });
    
//})