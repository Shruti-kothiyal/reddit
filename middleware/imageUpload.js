const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination:(req,file,cb)=>{
    if(file.fieldname==='avatar') cb(null,'images/avatar')
    else if(file.fieldname==='coverphoto') cb(null,'images/coverphoto')
    else if(file.fieldname==='image') cb(null,'images')
    else if(file.fieldname==='post') cb(null,'images/post')
  },
  filename: (req, file, cb) => {
    if(file.fieldname==='avatar'){
      cb(null, file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname))
    }
    else if(file.fieldname==='coverphoto'){
      cb(null, file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname))
    }else if(file.fieldname==='image'){
      cb(null, file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname))
    }
    else if(file.fieldname==='post'){
      cb(null, file.fieldname + '_' + Date.now() 
          + path.extname(file.originalname))
    }
  }
})

const imageupload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000000000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
})

module.exports = {
    imageupload,
};  