var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "pic2",
        image: "images/pic2.png",
        link: "About pic 2",
        desciption: "Demo desciption about pic 2"
    },
    {
        title: "pic 3",
        image: "images/pic3.jpg",
        link: "About pic 3",
        desciption: "Demo desciption about pic 3"
    }
]

app.get('/api/projects',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})


var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
})