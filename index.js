const express = require('express');
const cors = require('cors');
const StudentVue = require('studentvue.js')
const app = express();
const port = process.env.PORT || 5000
app.use(cors())
const url = 'https://md-mcps-psv.edupoint.com/';

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('main')
})

app.get('/done', (req, res)=>{
    res.send('Done')
})

app.post('/done', async (req, res)=>{

    StudentVue.login(url, req.body.name.toString(), req.body.password.toString()).then(client =>{
        client.getGradebook([3]).then(grades => {
            let parsed = JSON.parse(grades)
            if(parsed.RT_ERROR){
                res.json({
                    message:"Invalid username or password"
                })
            }else{ 
                let marks = parsed.Gradebook.Courses.Course[0].Marks.Mark
                if(Array.isArray(marks)){
                    for(let course of parsed.Gradebook.Courses.Course){
                        course.Marks.Mark = course.Marks.Mark[0]
                    }
                }
                res.json(parsed.Gradebook.Courses.Course)
            }

        })
    })
        
    
})

app.listen(port, ()=>{
    console.log(port);
});