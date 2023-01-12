var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//mongodb connection
const MongoClient = require('mongodb').MongoClient;
const uri ='mongodb+srv://Gaurpal:1234@cluster0.0ii7tbv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

const createCollection = (collectionName)  =>{
    client.connect((err,db)=>{
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDb connected')
        }
        else{
            console.log("DB Error:",err);
            process.exit(1);
        }
    })
}
//insert project
const insertProjects =(project,callback) =>{
    projectCollection.insert(project,callback);
}

//post api
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProjects = req.body;
    insertProjects(newProjects,(err,result) =>{
        if(ree){
            res.json({statusCode: 400,message: err})
        }
        else{
            res.json({statusCode: 200, message:"Project added sucessfully", data: result})
        }
    })
})

// const cardList = [
//     {
//         title: "pic2",
//         image: "images/2.png",
//         link: "About pic3",
//         desciption: "Demo desciption about pic 2"
//     },
//     {
//         title: "pic3",
//         image: "images/3.jpg",
//         link: "About pic 3",
//         desciption: "Demo desciption about pic 3"
//     }
// ]

//get project
const getProjects = (callback) =>{
    projectCollection.find({}).toArray(callback)
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err){
            res.json({statusCode: 400, message: err})
        }
        else{
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})
// const cardList = [
//     {
//         title: "pic2",
//         image: "images/pic2.png",
//         link: "About pic 2",
//         desciption: "Demo desciption about pic 2"
//     },
//     {
//         title: "pic 3",
//         image: "images/pic3.jpg",
//         link: "About pic 3",
//         desciption: "Demo desciption about pic 3"
//     }
// ]

// app.get('/api/projects',(req,res) => {
//     res.json({statusCode: 200, data: cardList, message:"Success"})
// })


var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
    createCollection('images')
})