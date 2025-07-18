import express from "express";
import  Thread  from "../models/thread.js";
import getOpenAIResponse from "../utils/openai.js"

const router = express.Router();

//testing  routes
router.post("/test" , async(req , res)=>{
    try{
const thread = new Thread({
    threadId:"abc",
    title:"testing new thread2",
});

const response = await thread.save();
res.send(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "failed to save in DB"});
    }
})


//get all thread
router.get("/thread" , async(req , res)=>{
    try{
      const threads = await Thread.find({}).sort({updatedAt:-1});
      //we want thread in descending orser of updatedAt
      res.json(threads);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "failed to ftech threads"});
    }
})

//get the thread by id
router.get("/thread/:threadId" , async(req , res)=>{
    const {threadId} = req.params;
    try{
      const thread = await Thread.findOne({threadId});
      if(!thread){
         res.status(404).json({error :"thread not found!"});
      }
      res.json(thread.messages);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "failed to ftech threads"});
    }
})


//delete the thread
router.delete("/thread/:threadId" , async(req , res)=>{
    const {threadId} = req.params;
    try{
       const deleteThread= await Thread.findOneAndDelete({threadId});
    
       if(!deleteThread){
      res.status(404).json({error :"thread not found!"});
       }
       res.status(200).json({success :"Thread deleted successfully"});
    
    }
     catch(err){
        console.log(err);
        res.status(500).json({error: "failed to delete threads"});
    }
})


//chat route
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    // Validate required fields
    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            // Create a new thread in the database
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            // Add the user's message to the existing thread
            thread.messages.push({ role: "user", content: message });
        }

        // Get the assistant's reply
        const assistantReply = await getOpenAIResponse(message);

        // Check if the assistant reply is valid
        if (assistantReply) {
            thread.messages.push({ role: "assistant", content: assistantReply });
        } else {
            return res.status(500).json({ error: "Failed to get a response from the assistant" });
        }

        // Update the updatedAt timestamp
        thread.updatedAt = new Date();

        // Save the thread
        await thread.save();
        res.json({ reply: assistantReply });
    } catch (err) {
        console.error("Error while processing chat:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default router;
