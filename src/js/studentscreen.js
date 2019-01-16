
import confirmdeletestudent from  './confirmanddeletestudent.js'
import confirmalterstudent from  './confirmandalterstudents.js'

var mySelect = document.querySelector('.listpromotion');
var studentcontent = document.querySelector('#studentcontent');
 var studentlist;
var btnstudentscreen = document.querySelector('.Btnstudentscreen')
// this function is going to screen the student related to the promotion selected


// THIS FUNCTION JUST GET BACK THE STUDENT LIST BY FECTCH AND STORE IT IN THE STUDENTLISTVARIABLE
function getstudents() {
    
    fetch("http://api-students.popschool-lens.fr/api/students")
        // we get back the responson within json format
        .then(response => response.json())
        // I name the response promotionresponse
        .then(studentsresponse => {
           var studentinfo= studentsresponse['hydra:member']
           studentlist = studentinfo;
            console.log(studentsresponse)
            console.log(studentlist)
        })

}


function studentscreen() {

    // its always the same i GIVE A ID to my button that is equal to mySelect.value in order to link my event with the nameselected
    btnstudentscreen.id = mySelect.value
    // var screenstudent = event.target
    studentcontent.innerHTML = ""
    studentlist.forEach(student => {
        if (student.promotion == mySelect.value) {
            console.log(student.firstname)
            var card = document.createElement('div')
            card.className = 'card'
            card.id = student.id
            studentcontent.appendChild(card)
            var cardbody = document.createElement('div')
            cardbody.className = 'card-body'
            card.appendChild(cardbody)
            var h5 = document.createElement('h5')
            h5.className = "card-title"
            h5.innerHTML = `${student.firstname}  ${student.lastname}`
            cardbody.appendChild(h5)
            var alterfirstnamestudent = document.createElement('input');
            alterfirstnamestudent.id = 'alterfirstname' + student.id;
            alterfirstnamestudent.setAttribute('data-id', student.id);
            // alterfirstnamestudent.dataset.id = student.id

            var altersurnamestudent = document.createElement('input');
            altersurnamestudent.id = 'altersurname' + student.id;
            altersurnamestudent.setAttribute('data-id', student.id);
            // altersurnamestudent.dataset.id =student.id

            alterfirstnamestudent.placeholder = 'nouveau prénom de l étudiant'
            altersurnamestudent.placeholder = 'nouveau nom de l étudiant'
            card.appendChild(alterfirstnamestudent)
            card.appendChild(altersurnamestudent)
            var buttondeletestudent = document.createElement('button')
            // I add an id to each butoon that is equal to the student['@id'] tu use it later by selectin the button id in the addrress fetch
            buttondeletestudent.id = student['@id']
            // I add a class to the utton to select hum in my function confirm andstudentdelet

            buttondeletestudent.addEventListener("click", confirmdeletestudent)

            cardbody.appendChild(buttondeletestudent)
            buttondeletestudent.className = 'btn btn-primary'
            buttondeletestudent.innerHTML = "Supprimer l'étudiant"
            var buttonalterstudent = document.createElement('button')
            cardbody.appendChild(buttonalterstudent)
            buttonalterstudent.className = 'btn btn-primary btnalterstudent'
            buttonalterstudent.innerHTML = "modifier l'étudiant"
            buttonalterstudent.addEventListener('click', confirmalterstudent)
            buttonalterstudent.id = student.id

        }
    })


}

export default studentscreen

export {getstudents}