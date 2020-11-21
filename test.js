const StudentVue = require('studentvue.js')
const url = 'https://md-mcps-psv.edupoint.com/';

StudentVue.login(url, "156483", "Dhwq1010").then(client =>{
    client.getGradebook([3]).then(grades => {
            let parsed = JSON.parse(grades)
            if(parsed.RT_ERROR){
                console.log({
                    message:"Invalid username or password"
                })
            }else{ 
                let marks = parsed.Gradebook.Courses.Course[0].Marks.Mark
                if(Array.isArray(marks)){
                    for(let course of parsed.Gradebook.Courses.Course){
                        course.Marks.Mark = course.Marks.Mark[0]
                    }
                }
                console.log(parsed.Gradebook.Courses.Course)
            }
        })
})