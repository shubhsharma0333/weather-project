const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("http");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/" , function(req, res){
  res.sendFile(__dirname +"/index.html")
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const url ="http://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=0fc2b3d9476d58794bfe3b8bae077d23";
    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const weatherIcons = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" +weatherIcons+ "@2x.png"

          console.log(weatherDescription);
          res.write("<html>")
          res.write("<h1>The current temprature is: " +temp+ " degree Celcius</h1>");
          res.write("<p>The current weather is "+weatherDescription+"</p>");
          res.write("<img src=" +imageURL+ ">")
          res.write("</html>")
          res.send()
        });
    });
})



app.listen(3000, function(){
  console.log("server is running on port 3000");
});
