const express = require('express');
const cors = require('cors');
const StudentVue = require('studentvue.js')
const app = express();

const url = 'https://md-mcps-psv.edupoint.com/';

let allowedOrigins = allowedOrigins = ['http://localhost:5501','https://mcpsvuehelper.vercel.app/']

app.enable('trust proxy');



app.options('*', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });
app.use(cors())
app.options('*', cors())

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(express.json());

app.post('/done', async (req, res)=>{

    StudentVue.login(url, req.body.name.toString(), req.body.password.toString()).then(client =>{
        client.getGradebook().then(grades => {
            let parsed = JSON.parse(grades)
            if(parsed.RT_ERROR){
                res.json({
                    message:"Invalid username or password"
                })
            }else{ 
                res.json(parsed.Gradebook.Courses.Course)
            }

        })
    })
        
    
})

app.listen(5000, ()=>{
    console.log('listening on http://localhost:5000');
});