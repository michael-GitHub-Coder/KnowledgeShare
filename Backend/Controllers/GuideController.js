import Guide from "../Models/GuideModel.js";
import likeModel from "../Models/likeModel.js";
import commentModel from "../Models/Comments.js";
import Comment from "../Models/Comments.js";

export const createGuide = async (req, res) => {
    const { title, category, content, media,userId } = req.body;

  const UDID = userId;
    if (!title || !content || !category || !media) {
        return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }
 
    try {
     
        const guide = await Guide.create({
            userId: UDID || req.user?._id, 
            // userId:UDID || req.user?._id,
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
        const deletedGuide = await Guide.findByIdAndDelete(id);
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

export const commentGuide = async (req, res) => {

    const { id } = req.params;
    const { comment_text } = req.body; 

    try {
      
        if (!comment_text || comment_text.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }
       
        const newComment = await commentModel.create({
            guide_id: id,
            user_id: req.user._id,
            comment_text, 
        });

        res.status(200).json({ message: "Comment added successfully", comment_text: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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

// export const latestGuides = async (req, res) => {

//     let sortedByLatestDate = [];

//     try {
       
//         const latestGuides = await Guide.find();
        
//         if (latestGuides) {
//             sortedByLatestDate = [...latestGuides].sort(
//                 (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//             );
//         }

//         res.status(200).json({message:"latest guides", sortedByLatestDate });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// Fetch latest guides and populate userID with username
export const latestGuides = async (req, res) => {
    try {
        // Fetch guides and populate the user details
        const guides = await Guide.find().populate("userId", "username email");

        // Sort guides by createdAt in descending order
        const sortedByLatestDate = guides.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json({
            message: "Latest guides retrieved successfully",
            sortedByLatestDate,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const topRatedGuide = async (req, res) => {
    try {
       
        const topLikedGuide = await likeModel.aggregate([
            { $group: { _id: "$guide_id", totalLikes: { $sum: 1 } } }, 
            { $sort: { totalLikes: -1 } }, 
            { $limit: 1 } 
        ]);

        if (!topLikedGuide.length) {
            return res.status(404).json({ message: "No likes found for any guides." });
        }

        const guide = await Guide.findById(topLikedGuide[0]._id);

        if (!guide) {
            return res.status(404).json({ message: "Guide not found." });
        }

        res.status(200).json({ guide, totalLikes: topLikedGuide[0].totalLikes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const totGuideLikes = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const guide = await Guide.findById(id).populate("comments.user_id", "name"); 

        if (!guide) {
            return res.status(404).json({ message: "Guide not found." });
        }

        const likeCount = await likeModel.countDocuments({ guide_id: id });

        res.status(200).json({
            guide,
            totalLikes: likeCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGuideDetails = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const guide = await Guide.findById(id)
            .populate("userId", "name email") 
            .populate("comments.user_id", "name") 
            .exec();

        if (!guide) {
            return res.status(404).json({ message: "Guide not found." });
        }

        
        const likeCount = await likeModel.countDocuments({ guide_id: id });

        
        const comments = await Comment.find({ guide_id: id })
            .populate("user_id", "name") 
            .populate("replies.user_id", "name") 
            .exec();

        
        res.status(200).json({
            guide,
            totalLikes: likeCount,
            comments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getGuideDetailsWithAllUsers = async (req, res) => {
    const { id } = req.params; 

    try {
       
        const guide = await Guide.findById(id)
            .populate("userId", "name email") 
            .exec();

        if (!guide) {
            return res.status(404).json({ message: "Guide not found." });
        }

 
        const comments = await Comment.find({ guide_id: id })
            .populate("user_id", "name email") 
            .populate("replies.user_id", "name email") 
            .exec();

        const likes = await likeModel.find({ guide_id: id })
            .populate("user_id", "name email")
            .exec();

   
        const usersFromComments = comments.map((comment) => comment.user_id);
        const usersFromLikes = likes.map((like) => like.user_id);

        const allUsers = [...new Map([...usersFromComments, ...usersFromLikes].map(user => [user._id, user])).values()];

    
        res.status(200).json({
            guide,
            comments,
            likes,
            allUsers 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Endpoint to get all guides with the username appended
export const guideandNames = async (req, res) => {
    try {
        const guides = await Guide.find()
            .populate({
                path: 'userId', // Populate the userId field in the guide schema
                select: 'username' // Only retrieve the username field
            });

        // Send the guides with the populated username
        res.json(guides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching guides' });
    }
};





export const getGuideInfo = async (req, res) => {
    try {
      const guides = await Guide.aggregate([
        {
          // Join the 'User' collection to get the username
          $lookup: {
            from: 'users', // Make sure the collection name matches 'User' in MongoDB
            localField: 'userId',
            foreignField: '_id',
            as: 'user_info'
          }
        },
        {
          // Flatten the 'user_info' array
          $unwind: {
            path: '$user_info',
            preserveNullAndEmptyArrays: true // In case there's no user info
          }
        },
        {
          // Add additional information to count comments and include content
          $addFields: {
            comment_count: { $size: '$comments' }, // Count number of comments
            content: 1 // Include the content field
          }
        },
        {
          // Group by the guide title and get the first matching username
          $group: {
            _id: '$title', // Group by title
            username: { $first: '$user_info.username' }, // Get the first matching username
            title_count: { $sum: 1 }, // Count the number of titles per guide
            comment_count: { $first: '$comment_count' }, // Get the comment count
            content: { $first: '$content' } // Get the content
          }
        },
        {
          // Project the result to return the fields as you want them
          $project: {
            _id: 0, // Remove _id
            title: '$_id',
            username: 1,
            title_count: 1,
            comment_count: 1, // Include comment count
            content: 1 // Include content
          }
        }
      ]);
  
      if (guides.length === 0) {
        return res.status(404).json({ message: "No guide information found" });
      }
  
      // Return the result as a response
      res.status(200).json(guides);
    } catch (error) {
      console.error('Error getting guide info:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getGuidesWithDetails = async () => {
    try {
      const guides = await Guide.find()
        .populate({
          path: "likes", // Populate likes
          populate: {
            path: "user_id", // Nested populate user in likes
            select: "username email", // Adjust fields as necessary
          },
        })
        .populate({
          path: "comments", // Populate comments
          populate: {
            path: "user_id", // Populate user for comments
            select: "username email",
          },
        })
        .populate({
          path: "comments", // Populate comments again for nested replies
          populate: {
            path: "replies.user_id", // Nested populate user in replies
            select: "username email",
          },
        });
      return guides;
    } catch (error) {
      console.error("Error fetching guides with details:", error.message);
      throw error;
    }
  };
  