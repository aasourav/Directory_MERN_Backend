const { default: mongoose } = require("mongoose");
const FolderSchema = new mongoose.Schema({
    folderName:{
        required: true,
        type:String
    },
    childs:{
        type: [String]
    }
})
const FolderModel = mongoose.model('Folder',FolderSchema);
module.exports = FolderModel;