const reportModel = require("../models/ReportsModel")

const addReport = async(req, res)=>{
    try{
    const savedRport = await reportModel.create(req.body)
    res.status(201).json({
      message:"report created",
      data:savedRport,
    });
}catch(err){
    res.status(500).json({
        message:err.message
    })
}
    };
    
  
const getAllReports = async (req, res) => {
        try{
               const reports = await reportModel.find().populate('userId').populate('taskId').populate('projectId');
            res.status(200).json({
                message:"All reports fetched successfully",
                data: reports
            })
    
        }catch(err){
            res.status(500).json({
                message:err.message
            })
    
        }
    };
const getReportsByUserId = async (req, res) => {
        const { userId } = req.params;
        try {
          const reports = await reportModel.find({ userId }); // Adjust field if it's named differently
          res.status(200).json(reports);
        } catch (error) {
          res.status(500).json({ message: 'Failed to fetch reports', error });
        }
      };


    module.exports ={
        addReport,
        getAllReports,
        getReportsByUserId
    }

