const bodyParser = require('body-parser');
const express=require('express');
const { redirect } = require('statuses');

let items=["Get up by 5 a.m.","Meditation For atleast 20 minute","Atleast 3 DSA questions"];
let workIems=[];

const app=express();

// We have to set view engine to the ejs module in order to work on the web page.......
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

// We can't use the css or html files directly by server, so we have to move them to a folder and 
//... tell the server file to look into the folder set by us for static css html files........
app.use(express.static("public"))



// For HomePage of Website.......
app.get("/",function(req,res){
    var today=new Date();
    var option= {
        weekday: "long",
        day:"numeric",
        month:"long"
    }

    var day=today.toLocaleDateString("en-US",option);

    res.render('index',{listTitle:day,newlistItems:items});
    
});


// For about page of WebPage.......
app.get("/about",function(req,res){
    res.render("about");
});

// For Work ToDo List Page......
app.get("/work",function(req,res){
    res.render("index",{listTitle:"Work List",newlistItems:workIems});
});



// Getting data from ToDo List Page.....
app.post("/",function(req,res){
  var item= req.body.addItem;


  // In (req.body.list) here comes the 'value' attribute of the tag in which we have attribut name='list'
  if(req.body.list === 'Work List')
  {
    workIems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
  
});


// Getting data from Work List Page.....
app.post("/work",function(req,res){
    var item= req.body.addItem;
    workIems.push(item);
  
    res.redirect("/work");
  });




app.listen(8000,function(){
    console.log("Listening at 8000 port");
});