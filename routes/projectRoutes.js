var express = require("express")
var router = express.Router();
// let client = require("../dbConnect")
let controller = require("../controller")

// setTimeout(() => {
//     projectCollection = client.mongoClient.db().collection("Projects");
// }, 2000)

// const insertProjects =(project,callback) =>{
//     projectCollection.insert(project,callback);
// }

//post api
router.post('/',(req,res) => {
    controller.projectController.createProjects(req, res)
    // console.log("New Project added", req.body)
    // var newProjects = req.body;
    // insertProjects(newProjects,(err,result) =>{
    //     if(ree){
    //         res.json({statusCode: 400,message: err})
    //     }
    //     else{
    //         res.json({statusCode: 200, message:"Project added sucessfully", data: result})
    //     }
    // })
})


//get project
// const getProjects = (callback) =>{
//     projectCollection.find({}).toArray(callback)
// }

router.get('/',(req,res) => {
    controller.projectController.retrieveProjects(req, res)
    // getProjects((err,result) => {
    //     if(err){
    //         res.json({statusCode: 400, message: err})
    //     }
    //     else{
    //         res.json({statusCode: 200, message:"Success", data: result})
    //     }
    // })
})

module.exports =router;