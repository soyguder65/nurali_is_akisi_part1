const express=require('express')
const {engine}=require('express-handlebars')
const expressSession=require('express-session')
const fileUpload=require('express-fileupload')
const dotenv=require('dotenv')
const path=require('path')
const dbs=require(path.join(__dirname,'dbs.js'))
const crypto=require('crypto')

// console.log(crypto.randomBytes(64).toString('hex'))


//veri tabanına bağlantı sağladık bu fonksiyon dbs.js den alıyor
dbs()

//baslangıc ayarları
dotenv.config()
const app=express()

//degiskenler
const time=1000*60*30
const SECRET_VALUE=process.env.SECRET_VALUE || 'nuraliWeb'
const PORT=process.env.PORT || 5000
const API_URL=process.env.API_URL || 'http://127.0.0.1:5000'




//sablon motorumuz handlebars paketi yani...

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views',path.join(__dirname,'views'))

//ara yazılım yani middleware

app.use(express.json())
app.use(fileUpload())
app.use(expressSession({
    secret:SECRET_VALUE,
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,secure:false,maxAge:time}
}))

app.use(express.static(path.join(__dirname,'public')))

//router tanımlama
const indexPage=require(path.join(__dirname,'router','indexPage.js'))
const addPage=require(path.join(__dirname,'router','addPage.js'))
const registerPage=require(path.join(__dirname,'router','registerPage.js'))
const afrikaPage=require(path.join(__dirname,'router','afrikaPage.js'))
const dernekPage=require(path.join(__dirname,'router','dernekPage.js'))
const errorPage=require(path.join(__dirname,'router','errorPage.js'))
const loginPage=require(path.join(__dirname,'router','loginPage.js'))
const muhasebePage=require(path.join(__dirname,'router','muhasebePage.js'))
const napGlobalPage=require(path.join(__dirname,'router','napGlobalPage.js'))
const logoutPage=require(path.join(__dirname,'router','logoutPage.js'))
const singlePage = require(path.join(__dirname, "router", "singlePage.js"));
const pdfindirPage = require(path.join(__dirname, "router", "pdfindirPage.js"));
const addmuhasebePage = require(path.join(__dirname,"router", "addmuhasebePage.js" ));
const yonetimPage = require(path.join(__dirname,"router", "yonetimPage.js" ));

app.use('/',(req,res,next)=>{
    const {userID}=req.session
    // req.session.userID='689c5ea5977e691779ca15c6'
    if(userID){
        res.locals.user=true
    }
    else{
        res.locals.user=false
    }
    next()
})



//router kullanım
app.use('/',indexPage)
app.use('/add',addPage)
app.use('/register',registerPage)
app.use('/afrika',afrikaPage)
app.use('/dernek',dernekPage)
app.use('/error',errorPage)
app.use('/login',loginPage)
app.use('/muhasebe',muhasebePage)
app.use('/napGlobal',napGlobalPage)
app.use('/logout',logoutPage)
app.use("/single", singlePage)
app.use("/pdfindir", pdfindirPage)
app.use("/addmuhasebe", addmuhasebePage)
app.use("/yonetim", yonetimPage)





app.use('/',(req,res,next)=>{
    res.render('site/error')
})



//portumuzu dinleyelim

app.listen(PORT,()=>{
    console.log(`server çalışıyor ${API_URL}`)
})



