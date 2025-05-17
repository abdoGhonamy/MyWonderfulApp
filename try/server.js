const { urlencoded } = require("body-parser")
const express = require("express")
const app = express()
//db start 
const db = require("better-sqlite3")("OurApp.db")
db.pragma("journal_mode = WAL")

//create
const creatTable = db.transaction(()=>{
    db.prepare(" CREATE TABLE IF NOT EXISTS users( id INTEGER PRIMARY KEY AUTOINCREMENT,username STRING NOT NULL UNIQUE,password STRING NOT NULL )").run()

})

creatTable()

//db end 
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

app.use(function(req,res,next){
    res.locals.errors=[]
    next()
})

app.get("/",(req,res)=>{


res.render("homepage.ejs")

})

app.post("/regisster",(req,res)=>{

    const errors = []

    if(typeof req.body.username !=="string")req.body.username =''
    if(typeof req.body.password !=="string")req.body.password =''
    
    req.body.username = req.body.username.trim()

    if(!req.body.username)errors.push("you must provide a username .")
    else if(req.body.username&& req.body.username.length<+12)errors.push("your username cannot be less than +12 chars .")
    else if(req.body.username&& req.body.username.length>70)errors.push("your username mustn't be greater than 70 chars .")
    else if(req.body.username&& !req.body.username.match(/^[a-zA-Z0-9]+$/))errors.push("your username must have only letters or numbers  .")

    if(errors.length){
       return res.render("homepage.ejs",{errors})

    }

    res.send("thx for filling out the form .")
})
app.get("/login",(req,res)=>{




})


app.listen(5000)