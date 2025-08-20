const express = require("express");
const router = express.Router();
const { join, basename, resolve } = require("path");
const Content = require(join(__dirname, "..", "model", "contentModel.js"));
const fs = require("fs");

class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

router.get("/:id", async (req, res, next) => {
  
  const { id } = req.params;

  const data = await Content.findById(id).exec();

   const url = resolve(__dirname + "/../public" + data.pdf);
 
  if (!fs.existsSync(url)) {
   
    const notFoundError = new CustomError(404, "PDF dosyası bulunamadı\n" + url);
    return next(notFoundError);
  }
  return res.download(url, "A4.pdf", (err) => {
    if (err) {
      const downloadError = new CustomError(
        500,
        "Hata: Pdf dosyası indirilemiyor"
      );
      return next(downloadError);
    }
  });
  

});

router.delete("/:id", async (req, res) => {
  try {
    if (!res.locals.user) {
      return res.json({
        case: false,
        message: "Yetkisiz erişim",
      });
    }

    let { id } = req.params;
    const data = await Content.findById(id).exec();
    let fileName = data.path;
    let pathName = join(__dirname, "..", "public", fileName);

    Content.findByIdAndDelete(id)
      .then(() => {
        fs.unlink(pathName, (err) => {
          if (err != null) {
            return res.json({
              case: false,
              message: "dosya silme işleminde bir hata oluştu",
            });
          }
          return res.json({
            case: true,
            message: "dosya silme işlemi başarılıdır",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          case: false,
          message: "bir hata oluştu",
        });
      });
  } catch (error) {
    console.log(error);
    return res.redirect("/error");
  }
});

module.exports = router;
