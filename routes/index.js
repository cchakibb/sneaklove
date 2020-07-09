const express = require("express");
const router = express.Router();
const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");
const userModel = require("./../models/User");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`);

router.get("/", (req, res) => {
   res.render("index");
});

/* router.get("/sneakers/collection", (req, res) => {
  res.render
}); */

router.get("/sneakers/:cat", (req, res, next) => {
   const cat = req.params.cat;

   // je ne sais pas comment l'écrire correctement, mais du coup il faudrait mettre un filtre dans la Promise.all ! au lieu d'écrire juste find() 
   // FIXME: 
   // const womenSneakers = sneakerModel.find("category": `${cat}`)

   Promise.all([sneakerModel.find().populate("label"), tagModel.find()])
      .then((dbRes) => res.render("products", { sneakers : dbRes[0], tags: dbRes[1] }))
      .catch(next);
});

router.get("/one-product/:id", (req, res) => {
   res.send("baz");
});

router.get("/signup", (req, res) => {
   res.render("signup");
});

router.get("/signin", (req, res) => {
   res.render("signin");
});

module.exports = router;
