import confirmdeletestudent from './confirmanddeletestudent.js'
import confirmalterstudent from './confirmandalterstudents.js';

var promotionlist;
var mySelect = document.querySelector('.listpromotion');
var studentcontent = document.querySelector('#studentcontent');
var load = document.querySelector("#load");
var studentlist
var btnstudentscreen = document.querySelector('.Btnstudentscreen')
var selectaddstudent = document.querySelector('#addstudentselect')
var inputaddstudentfirstname = document.querySelector('.addstudentfirstname')
var inputaddstudentlastname = document.querySelector('.addstudentlastname')
var inputaddstudentbd = document.querySelector('.addstudentbd')
var btnaddstudent = document.querySelector('.btnaddstudent')

btnstudentscreen.addEventListener("click", studentscreen)
btnaddstudent.addEventListener('click', addstudent)

// this function getback the promotionlist and screen them in html
function getPromotion() {
    // i EMPTY THE MYSELECT IN ORDER TO REFRESH THE LISTPROMOTIONDATEOPTION INTO THE OPTION TO AVOID THE DOUBLE
    mySelect.innerHTML = ""
    selectaddstudent.innerHTML = ""
    var option = document.createElement('option')
    mySelect.appendChild(option)
    option.innerHTML = "choississez la promotion"
    // I retreive the list promotion by a fetch method

    fetch("http://api-students.popschool-lens.fr/api/promotions")
        // we get back the responson within json format
        .then(response => response.json())
        // I name the response promotionresponse
        .then(promotionresponse => {
            promotionlist = promotionresponse['hydra:member'];
            load.innerHTML = '';
            promotionlist.forEach(promotion => {
                var card = document.createElement('div')
                card.className = 'card'
                load.appendChild(card)
                var cardbody = document.createElement('div')
                cardbody.className = 'card-body'
                card.appendChild(cardbody)
                var h5 = document.createElement('h5')
                h5.className = "card-title"
                h5.innerHTML = promotion.id + " " + promotion.name
                cardbody.appendChild(h5)
                var startdate = document.createElement('h5')
                var enddate = document.createElement('h5')
                card.appendChild(startdate)
                card.appendChild(enddate)
                startdate.innerHTML = 'Date de début:' + (promotion.startDate) + "<br>"
                enddate.innerHTML = 'date de fin:' + promotion.endDate

                var myOption = document.createElement('option')
                myOption.innerHTML = promotion.name;
                // now I state a value = promotion['@id'] in order to select the right idpromotion into the select to carry out some opération 
                myOption.value = promotion["@id"]
                var myOption2 = document.createElement('option')
                mySelect.appendChild(myOption);
                myOption2.innerHTML = promotion.name;
                myOption2.value = promotion["@id"]
                selectaddstudent.appendChild(myOption2)

                console.log(btnaddstudent.id)

            })
            console.log(promotionresponse['hydra:member'])
            console.log(promotionlist)
        })
}

// THIS FUNCTION JUST GET BACK THE STUDENT LIST BY FECTCH AND STORE IT IN THE STUDENTLISTVARIABLE
function getstudents() {

    fetch("http://api-students.popschool-lens.fr/api/students")
        // we get back the responson within json format
        .then(response => response.json())
        // I name the response promotionresponse
        .then(studentsresponse => {
            var studentinfos = studentsresponse['hydra:member']
            studentlist = studentinfos;
            console.log(studentsresponse)
            console.log(studentlist)
        })

}

// this function is going to screen the student related to the promotion selected
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


export default getPromotion;
export {
    getstudents
}