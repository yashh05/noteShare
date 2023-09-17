const File=require("../models/fileModel.js");
const User = require("../models/userModel.js");
const { fetchEmailId } = require("./authController.js");

async function createFile(req,res){
    const {userId,fileName}=req.body

const foundFile=await File.findOne({userId,fileName}) 
// (err,foundFile)=>{
//         if(err){
//             console.log(err);
//             res.status(500).json(err)
//             return
//         }
        if(!foundFile){
            // const newFile=new File({
            //     userId,
            //     fileName,
            //     fileText:"",
            //     allowed:[]
            // });
            // newFile.save((err,savedFile)=>{
            //     if(err){
            //         console.log("Error",err);
            //         res.status(500).json({msg:"error in saving the file"})
            //     }
            //     res.status(200).json({msg:"file is saved"});
            // })
            const file= await File.create({userId,fileName,fileData:" ",allowed:[userId]});
            // console.log(file);
            res.status(200).json({id:file._id,userId:file.userId,fileName:file.fileName});

        }
        else{
            res.status(500).json({error:"file already exists"});
        }
}

async  function getFile(req,res){
    const userId=req.body.userId
    const allFiles= await File.find({allowed:userId})
    res.status(200).json(allFiles)
}

async function findOrCreateDocument(userId,docId) {
    if (docId == null) return
  
    const document = await File.findById(docId);
    if (document){
        if(document.allowed.includes(userId)) return document        
    }
    else{
        const file=await File.create({ userId,fileName:"Untitled file", fileData: " ",allowed:[userId] });
        return   file
    } 
     
  }

  async function deleteFile(req,res){
    const {fileId}=req.body;
    try{
        const doc=await File.deleteOne({_id:fileId})
        console.log(doc);
        res.status(200).json({msg:"file is deleted"})
    }catch(e){
        res.status(500).json({msg:"error is there"})
    }
  }

  async function giveAcessFile(req,res){
    const {fileId,accessEmail}=req.body;
    try{
        const user=await User.findOne({email:accessEmail});
        if(!user){
            throw new Error('User does not exist');
        }

        File.findOne({_id:fileId})
        .then((doc)=>{
            if(!doc){
                return
            }
            doc.allowed=[...doc.allowed,user._id.toString()];

            return doc.save();
        })
        .then((updatedDoc)=>{
            if(updatedDoc){
                console.log(updatedDoc);
                res.status(200).json(updatedDoc)
            }
        })
        .catch(e=>{
            res.status(400).json({error:"file not found"})
        })

    }catch(e){
      res.status(400).json({error:e.message})
    }
  }

  async function removeAcessFile(req,res){
    const {fileId,accessEmail}=req.body;
    try{
        const user=await User.findOne({email:accessEmail});
        if(!user){
            throw new Error('User does not exist');
        }

        File.findOne({_id:fileId})
        .then((doc)=>{
            if(!doc){
                throw new Error("File doesn't exist")
            }
            console.log(user._id.toString());
            doc.allowed=doc.allowed.filter((id)=>{
                return id!==user._id.toString()
            })

            if(doc.allowed.length===0) return File.deleteOne({_id:fileId})

            return doc.save();
        })
        .then((updatedDoc)=>{
            if(updatedDoc){
                console.log(updatedDoc);
                res.status(200).json(updatedDoc)
            }
        })
        .catch(e=>{
            res.status(400).json({error:e.message})
        })

    }catch(e){
      res.status(400).json({error:e.message})
    }
  }
  
//   async function editAcessFile(req,res){
//     const {fileId,giveAccess,removeAccess}=req.body;
//     try{
//         const doc= await File.findById(fileId);
//         const AccessId= await fetchEmailId(giveAccess)
//         const removeId = await fetchEmailId(removeAccess)

//         console.log(AccessId, removeId);
//         // const newDoc={
//         //     allowed : doc.allowed.filter(element => element !== removeAccess).push(giveAccess),
//         //     ...doc
//         // }
//         // const file=File.findByIdAndUpdate(fileId,newDoc)
//         res.status(200).json(doc)
//     }catch(e){
//       res.status(500).json({msg:e.message})
//     }
//   }

module.exports={createFile,findOrCreateDocument,getFile,deleteFile,removeAcessFile,giveAcessFile}