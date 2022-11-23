const FolderModel = require('../model/folserModel');

const addRoot = async(_,__,next)=>{
    try{
        const getFolder = await FolderModel.find();
        if(getFolder.length<1){
            const  Folder = new FolderModel({
                folderName: 'Root'
            })
            await Folder.save();
        }
        next();
    }
    catch(er){
       console.log("error create root: ",er.message)
       res.send("error")
    }
}

module.exports = addRoot;