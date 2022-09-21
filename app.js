const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(express.static("PUBLIC"));
const https=require('https');
var description="";
var temperature="";
var feelslike="";
var humid="";
var pressure="";
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get('/',function (req,res) {
    var today=new Date();
    var day=today.getDay();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    }
    var x=today.toLocaleDateString("en-US",options);
 
    res.render('weather',{t:temperature,des:description,feel:feelslike,humidity:humid,press:pressure,date:x});
})
app.post("/",function(request,response){
    var query=request.body.city;
    console.log(query);
   // const key="e7368b94865b6529214e1b989cce9187";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e7368b94865b6529214e1b989cce9187&units=metric";
    https.get(url,function(r){
        console.log(r.statusCode);
        r.on("data",function(data){
            const weatherdata=JSON.parse(data);
            temperature="Temperature: "+weatherdata.main.temp+" celcius";
            description=" Description: "+weatherdata.weather[0].description;
            feelslike="Feelslike: "+weatherdata.main.feels_like +" celcius";
            humid="Humidity: "+weatherdata.main.humidity+"%";
            pressure="Pressure: "+weatherdata.main.pressure+" mBar"
            
             //console.log(y);
             response.redirect("/");
             
        })
    })

     
    
    
    
})




















app.listen(process.env.PORT || 3000,function(){
    console.log("server started");
})

function newFunction() {
    return require('express');
}
