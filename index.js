const express = require('express');
const cors = require('cors');
const StudentVue = require('studentvue.js')
const app = express();
const port = process.env.PORT || 5000
app.use(cors())
const url = 'https://md-mcps-psv.edupoint.com/';
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.options('*', cors())
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('main')
})

app.get('/done', (req, res)=>{
    res.send('Done')
})

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

app.listen(port, ()=>{
    console.log(port);
});