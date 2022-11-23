const FolderModel = require('../model/folserModel');

const deleteFolder = async (req,res)=>{
    const parentId = req.params.id.split('&')[0];
    const parentOFparent = req.params.id.split('&')[1];

    const queue = []
    queue.push(parentId);
    try{
        const pop = await FolderModel.findOne({_id:parentOFparent})
        const pop_childs = pop.childs.filter(data=> data!== parentId);
        await FolderModel.updateOne({_id:parentOFparent},{$set: {childs:[...pop_childs]}})

        while(queue.length!=0){
            const ID = queue.shift();
            const R = await FolderModel.findOne({_id:ID})
            const Child = R.childs;
            for(let i = 0 ; i<Child.length ; i++){
                queue.push(Child[i]);
            }
            const Res = await FolderModel.findOneAndDelete({_id: ID});
        }
        next()
    }
    catch(er){
        res.status(500).send("Error in folder delete");
    }
}

module.exports = deleteFolder;