require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri ='mongodb+srv://Gaurpal:1234@cluster0.0ii7tbv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})

client.connect((err,db)=>{
    if(!err){
        console.log('MongoDb connected')
    }
    else{
        console.log("DB Error:",err);
        process.exit(1);
    }
})

module.MongoClient= client;