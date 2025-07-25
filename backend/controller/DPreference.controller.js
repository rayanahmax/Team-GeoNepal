const  DPreference = require('../models/DPreference.models')

exports.createDPreference = async (req, res)=>{
    const {interests, image} = req.body

    try {
        const existingDPreference = await DPreference.findOne({interests})

        if(existingDPreference){
            return res.status(400).json({message:'Interest Already exists'})
        }
        const newinterests = await DPreference.create({
            interests,
            image
        })

        res.json(newinterests)
    } catch (error) {
     res.status(500).json({ message: "Server error", error: error.message });

    }
}


exports.getAllPreference = async (req, res) => {
    try {
        const data = await DPreference.find()

        res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
       
    }
}