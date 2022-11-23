const FolderModel = require('../model/folserModel');

const addFolder = async(req,res,next)=>{
    const id = req.params.id;
    try{
        console.log("Add SECTION: ",req.body)
        const  Folder = new FolderModel({
            folderName: req.body.name
        })
        const rcv = await Folder.save();
        const getParent = await FolderModel.findOne({_id:id});
        const getChildArr = [...getParent.childs];
        getChildArr.push(Folder._id)

        await FolderModel.findOneAndUpdate({_id:id},{$set:{childs:[...getChildArr]}})
        next();
    }
    catch(er){
        res.send(er.message);
    }
}
module.exports = addFolder;