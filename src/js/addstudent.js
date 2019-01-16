import {getstudents} from './studentscreen.js'

var selectaddstudent = document.querySelector('#addstudentselect')
var inputaddstudentfirstname = document.querySelector('.addstudentfirstname')
var inputaddstudentlastname = document.querySelector('.addstudentlastname')
var inputaddstudentbd = document.querySelector('.addstudentbd')
var btnaddstudent = document.querySelector('.btnaddstudent')

// this function allows us to add students with by sleecting the right promotion
function addstudent(event) {
    // the the same i add an id to the btnaddstudent to select him using the event and to push the date to the jsonobject promotionitems
    btnaddstudent.id = selectaddstudent.value

    var btn = event.target
    fetch('http://api-students.popschool-lens.fr/api/students', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",

            body: JSON.stringify({
                firstname: inputaddstudentfirstname.value,
                lastname: inputaddstudentlastname.value,
                sex: 0,
                birthdate: inputaddstudentbd.value,
                promotion: btn.id,
            })
        })
        .then(response => response.json())
        .then(studentresponse => {
            console.log(studentresponse)
            //  I call back the function get student to refresh the student data
            getstudents()
        })

}

export default addstudent