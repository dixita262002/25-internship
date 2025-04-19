const multer = require("multer");
const uploadWorkModel = require("../models/UploadWorkModel")
const cloudinaryUtil = require("../utils/CloudinaryUtil");

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle file upload
const uploadWork = async (req, res) => {
  try {
    // Upload file to Cloudinary
    const file = req.file;
    const result = await cloudinary.uploader.upload(file.buffer, {
      folder: 'project-management-system', // Optional: Organize files in Cloudinary
    });

    // Create UploadWork record
    const newUploadWork = new uploadWorkModel({
      userId: req.body.userId,
      taskId: req.body.taskId,
      fileUrl: result.secure_url, // The file URL from Cloudinary
    });

    await newUploadWork.save();
    res.status(200).json({ message: 'Work uploaded successfully', data: newUploadWork });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading work', error });
  }
};

// Middleware to handle file upload
const uploadFile = upload.single('file');

const uploadWorkWithFile = async(req, res) =>{
  upload(req,res,async(err)=>{
      if(err){
          console.log(err)
          res.status(500).json({
              message:err.message
          })
      }
      else{
  // cloudinary
  const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
  console.log(cloudinaryResponse);
       console.log(req.body)
       console.log(req.file)

//store data in databadse
req.body.fileUrl = cloudinaryResponse.secure_url;
const savedProject = await uploadWorkModel.create(req.body)


       res.status(200).json({
          message:"uploadedwork  saved successfully",
          data:savedProject
       });
      }
  });
  };


module.exports = { uploadWork, uploadFile,uploadWorkWithFile };