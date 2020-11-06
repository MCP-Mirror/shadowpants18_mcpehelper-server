const express = require('express');
const cors = require('cors');
const StudentVue = require('studentvue.js')
const app = express();
app.use(cors())
const url = 'https://md-mcps-psv.edupoint.com/';

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

app.listen(process.env.PORT || 5000, ()=>{
    console.log(process.env.PORT);
});