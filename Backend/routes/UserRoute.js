const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const Router = require("express");
const crypto = require("node:crypto");
const UserRoute = Router();
const Document = require("../models/DocumentSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Documents')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

//User signup
UserRoute.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;
    const hash = crypto.pbkdf2Sync(password,"SECRETSALT",60,64,"sha256").toString("hex");
    const user = new User({name,email,hash});
    user.save().then(()=>{
        res.send({message:"User created successfully"});
    });
})

//Getting single user
UserRoute.get("/singleuser/:id", async(req,res)=>{
    const singleuser = await User.find({"_id":req.params.id});
    res.send(singleuser);
})

//User login
UserRoute.post("/signin",async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    const hash = crypto.pbkdf2Sync(password,"SECRETSALT",60,64,"sha256").toString("hex");
    if(hash !== user?.hash)
    {
        return res.send({message:"invalid cresentials"});
    }
    const token = jwt.sign({name:user?.name},'SECRET1234',{expiresIn: "30min"},);
    res.send({message: 'Logged in',token,user});
});

//documents of the user
UserRoute.post("/:userid/docs", upload.single("doc"),async(req,res)=>{
    const {userid} = req.params;
    const {name} = req.body;
    const doc = req.file.originalname;
    const docu = new Document({
        name,
        doc,
        userid,
    })
    await docu.save();
    return res.send("success");
});
//send user docs 
UserRoute.get("/:userid/getdocs",async(req,res)=>{
    const {userid} = req.params;
    const docs = await Document.find({userid});
    return res.send(docs);
})

//searching docs
UserRoute.get("/doc/search", async (req, res) => {
    const { name } = req.query;
    const doc = await Document.find({ $text: { $search: name } });
    res.status(200).send(doc);
});

// //delete doc
UserRoute.delete("/delete/:id", async(req,res)=>{
    const data = await Document.deleteOne({ _id: req.params.id });
    return res.status(200).send({message: "doc deleted Succsessfully"});
})

module.exports=UserRoute;