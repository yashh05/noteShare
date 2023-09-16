const mongoose=require('mongoose');

const fileSchema= mongoose.Schema({
    userId:{
        type:String,
        required:[true],
    },
    fileName:{
        type:String,
        required:true
    },
    fileData:{
        type:Object,
        required:true
    },
    allowed:{
        type:Array,
        required:true
    }    
})

const File= mongoose.model("file",fileSchema);

module.exports=File;