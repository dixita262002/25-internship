const statusModel = require('../models/StatusModel')

const addStatus = async(req, res) => {
    try{
        const savedStatus = await statusModel.create(req.body)
        res.status(201).json({
            message:("status added successfully"),
            data:savedStatus
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
};

const getAllStatus = async(req, res) =>{
    try{
     const status = await statusModel.find(res.body);
     res.status(201).json({
        message:"status fetched successfully",
        data:status
     })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports = {
    addStatus,
    getAllStatus
}