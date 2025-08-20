const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const conn=()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:'nuraliweb'
    }).then(()=>{
        console.log("DB aktif")

    }).catch((err)=>{
        console.log(err)
    })
}


module.exports=conn