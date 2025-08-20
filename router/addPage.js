const express = require("express");
const router = express.Router();
const { join } = require("path");
const Content = require(join(__dirname, "..", "model", "contentModel.js"));

const newTime=()=>{
  const date=new Date();
  const day=date.getDate();
  const month=date.getMonth();
  const year=date.getFullYear();
  const allName=`${day}.${month+1}.${year}`
  return allName

}
router.get("/", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("/error");
  }
  
  return res.render("site/add");
});

//..............................................................................

router.post("/", (req, res) => {
  try {
    if (!res.locals.user) {
      return res.json({
        case: false,
        message: "Yetkisiz Erişim",
      });
    }

    const { adSoyad, date,siparisCinsi,siparisMiktari } = req.body;
    
    
    if (!adSoyad || !date || !siparisCinsi || !siparisMiktari) {
      return res.json({
        case: false,
        message: "Veri iletilemedi"
      });
    }



//  return res.json({
//         case: true,
//         message: "işlem devam ediyor"
//       });

      const db=new Content({
        adSoyad,
        date,
        siparisCinsi,
        siparisMiktari,
        kimden:"yonetim"
        
      })

      db.save().then(()=>{
        return res.json({
          case:true,
          message:'veri başarılı şekilde eklendi'
        })

      }).catch(err=>{
        return res.json({
          case:false,
          message:'Bir hata Oluştu'
        })
      })

  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: "Beklenilmeyen bir Hata oluştu"
    });
  }
});

module.exports = router;
