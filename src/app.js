const express=require("express");
const app=express();
const path=require("path");
const User=require("./models/usermessage");
const hbs=require("hbs");
require("./db/conn");
const port=process.env.PORT || 3000;

//setting path
const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jquery',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));

app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.post("/contact",async(req,res)=>{
   try{
     const data=new User(req.body);
     const x=await data.save();
     console.log(x);
  }
  catch(err){
      console.log(err);
      res.send(err);
  }
})

app.listen(port,()=>{
    console.log(`listening to port no ${port}`);
})