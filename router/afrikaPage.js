const express = require("express");
const router = express.Router();
const { join } = require("path");
const Content = require(join(__dirname, "..", "model", "contentModel.js"));





router.get("/", async (req, res) => {
  try {
    const content = await Content.find({ kimden: "muhasebe" }).exec();

    return res.render("site/afrika", {
      allData: content.map((item) => item.toJSON()),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/error");
  }
});




module.exports = router;




