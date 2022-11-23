const FolderModel = require('../model/folserModel')

const getFolder = async(_,res) =>{
    try{
        const folder = await FolderModel.find();
        let queue = []
        queue.push(folder[0]);
        let track_root = 0;

        const Dir_data = {};
            while(queue.length !=0 ){
                const getting_child = [];
                const p = queue.shift();
                for(let i = 0 ; i<p.childs.length ; i++){
                    const D = await FolderModel.findOne({_id:p.childs[i]})
                    queue.push(D)
                    getting_child.push(D)
                }
                if(track_root===0){
                    Dir_data['root'] = {child:getting_child,parent:p._id}
                    track_root = 2;
                }
                else{
                    Dir_data[p._id] = {child:getting_child,parent:p._id}
                }
            }
            return res.status(200).send(Dir_data);
    }
    catch(er){
        res.send(`Something porblem to get data: ${er.message}`);
    }
}
module.exports = getFolder