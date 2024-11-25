import Guide from "../Models/GuideModel.js";
import likeModel from "../Models/likeModel.js";


export const createGuide = async (req, res) => {
    const { title, category, content, media } = req.body;

  
    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }
 0
    try {
     
        const guide = await Guide.create({
            userId: req.user._id, 
            title,
            category,
            content,
            media,
        });

        res.status(201).json({
            success: true,
            message: "Guide created successfully.",
            guide: {
                id: guide._id,
                title: guide.title,
                category: guide.category,
            },
        });
    } catch (error) {
   
        res.status(500).json({
            success: false,
            message: "Failed to create guide.",
            error: error.message,
        });
    }
};


export const getAllguides = async (req,res)=>{

    try {
        const allGuides = await Guide.find();
        if(allGuides){
            res.status(200).json(allGuides);
        }else{
            res.status(200).json({success:false,message:"failed to load guides"});
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const updateGuide = async (req,res) =>{
    
    const {id} = req.params;
    const guide = req.body;

    if(!guide.title || !guide.content || !guide.category){
        res.status(203).json({success:false, message:"Required fields are empty"});
    }
    try {
        const updatedGuide = await Guide.findByIdAndUpdate(id,guide);
        if(updateGuide){
            res.status(200).json({success:true, message:"Guide updated successfuly",Guide:updatedGuide})
        }else{
            res.status(203).json({success:false, message:"Failed to update guide"})
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const deleteGuide = async (req,res) =>{

    const {id} = req.params;
    
    if(!id){
        res.status(203).json({success:false, message:"INVALID USER ID"});
    }
    try {
        const deletedGuide = await Guide.findByIdandDelete(id);
        if(deletedGuide){
            res.status(200).json({success:true,message:"Guide deleted ", Guide:deleteGuide});
            //TODO: what happens after the guide is deleted by the expert or author? Do we delete it completely or we create a new collection to save the deleted in?
        }else{
            res.status(203).json({success:false, message:"Failed to delete guide"})
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}

export const likeGuide = async (req, res) => {
    const { id } = req.params;

    try {
   
        const existingLike = await likeModel.findOne({ user_id: req.user._id, guide_id: id });

        if (existingLike) {
            return res.status(400).json({ message: "Guide already liked" });
        }

        const newLike = await likeModel.create({
            user_id: req.user._id,
            guide_id: id,
        });

        res.status(200).json({ message: "Guide liked", like: newLike });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unlikeGuide = async (req, res) => {

    const { id } = req.params;

    try {
       
        const existingLike = await likeModel.findOne({ user_id: req.user._id, guide_id: id });

        if (!existingLike) {
            return res.status(400).json({ message: "Guide not liked yet" });
        }

        await likeModel.deleteOne({ user_id: req.user._id, guide_id: id });

        res.status(200).json({ message: "Guide unliked successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//TODO: the likes/dislikes and comments for every guides by login in users.
//TODO: Establish the relationships between all the collections.
//TODO: Top rated guides
//TODO: list of latest guides
