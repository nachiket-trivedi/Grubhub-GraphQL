const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./images/");
    },
    filename: function(req, file, cb) {
      cb(null, req.cookies["idGeneric"] + ".jpg");
    }
  });
const upload = multer({ storage: storage });
var uploadImg = multer({ storage: storage }).single("postImage");
imageUploadProfile=(req,res,conn)=>{
    uploadImg(req, res, function(err) {
        console.log("here");
        if (err instanceof multer.MulterError) {
          console.log("e1");
          return res.status(500).json(err);
        } else if (err) {
          console.log("e2");
          return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
      });
    }
    exports.imageUploadProfile=imageUploadProfile;
