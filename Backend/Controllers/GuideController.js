import Guide from "../Models/GuideModel.js";


export const createGuide = async (req,res)=>{

    const {title,category,content,media} = req.body;

    if(!title || !content){
        res.status(400).json({success:false, message:"Please fil all the fileds."})
    }

    try {
         await Guide.create({
            title,
            category,
            content,
            media,
        });
        res.status(200).json({success:true,message:"Guide created",title:(await Guide.title),category:(await Guide.category) })
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }

}

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
        const updatedGuide = await Guide.findByIdandUpdate(id,guide);
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



