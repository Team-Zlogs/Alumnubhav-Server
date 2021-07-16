const multer = require('multer'); // not

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb){
        cb(null, 'app/public/assets/blogPost') //public -> uploads
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

const store = multer({ storage : storage })
module.exports = store