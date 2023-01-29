var express = require("express")
var app = express()
var cors = require('cors')
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
// let projectCollection;
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/projects',projectRoutes)

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
      res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
  })
  
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    setInterval(()=>{
      socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
  
  });
  
//mongodb connection
// const MongoClient = require('mongodb').MongoClient;
// const uri ='mongodb+srv://Gaurpal:1234@cluster0.0ii7tbv.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {useNewUrlParser: true})

// const createCollection = (collectionName)  =>{
//     client.connect((err,db)=>{
//         projectCollection = client.db().collection(collectionName);
//         if(!err){
//             console.log('MongoDb connected')
//         }
//         else{
//             console.log("DB Error:",err);
//             process.exit(1);
//         }
//     })
// }
//insert project
// const insertProjects =(project,callback) =>{
//     projectCollection.insert(project,callback);
// }

// //post api
// app.post('/api/projects',(req,res) => {
//     console.log("New Project added", req.body)
//     var newProjects = req.body;
//     insertProjects(newProjects,(err,result) =>{
//         if(ree){
//             res.json({statusCode: 400,message: err})
//         }
//         else{
//             res.json({statusCode: 200, message:"Project added sucessfully", data: result})
//         }
//     })
// })


// //get project
// const getProjects = (callback) =>{
//     projectCollection.find({}).toArray(callback)
// }

// app.get('/api/projects',(req,res) => {
//     getProjects((err,result) => {
//         if(err){
//             res.json({statusCode: 400, message: err})
//         }
//         else{
//             res.json({statusCode: 200, message:"Success", data: result})
//         }
//     })
// })
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
http.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
    //createCollection('images')
})