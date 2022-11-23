const express = require('express');
const addFolder = require('../controller/addFolder');
const addRoot = require('../controller/addRoot');
const deleteFolder = require('../controller/deleteFolder');
const getFolder = require('../controller/getFolder');


const folderRoute = express.Router();

folderRoute.get('/getFolder/',addRoot,getFolder)
folderRoute.post('/addFolder/:id',addFolder,getFolder)
folderRoute.delete('/deleteFolder/:id',deleteFolder)


module.exports = folderRoute;