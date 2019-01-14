import confirmdeletestudent from './confirmanddeletestudent.js'

var promotionlist;
var mySelect = document.querySelector('.listpromotion');
var studentcontent = document.querySelector('#studentcontent');
var load = document.querySelector("#load");
var studentlist
var btnstudentscreen = document.querySelector('.Btnstudentscreen')

btnstudentscreen.addEventListener("click", studentscreen)

// this function getback the promotionlist and screen them in html
function getPromotion() {
// i EMPTY THE MYSELECT IN ORDER TO REFRESH THE LISTPROMOTIONDATEOPTION INTO THE OPTION TO AVOID THE DOUBLE
    mySelect.innerHTML = ""
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
                mySelect.appendChild(myOption);


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
function studentscreen(event) {

    // its always the same i GIVE A ID to my button that is equal to mySelect.value in order to link my event with the nameselected
    // btnstudentscreen.id = mySelect.value
    // var screenstudent = event.target
    studentcontent.innerHTML = ""
    studentlist.forEach(student => {
        if (student.promotion == mySelect.value) {
            console.log(student.firstname)

            var card = document.createElement('div')
            card.className = 'card'
            studentcontent.appendChild(card)
            var cardbody = document.createElement('div')
            cardbody.className = 'card-body'
            card.appendChild(cardbody)
            var h5 = document.createElement('h5')
            h5.className = "card-title"
            h5.innerHTML = student.firstname + student.lastname
            cardbody.appendChild(h5)
            var buttondeletestudent = document.createElement('button')
            // I add an id to each butoon that is equal to the student['@id'] tu use it later by selectin the button id in the addrress fetch
            buttondeletestudent.id = student['@id']
            // I add a class to the utton to select hum in my function confirm andstudentdelet
            buttondeletestudent.class = ('.btn')
            buttondeletestudent.addEventListener("click", confirmdeletestudent)

            cardbody.appendChild(buttondeletestudent)
            buttondeletestudent.className = 'btn btn-primary'
            buttondeletestudent.innerHTML = "Supprimer l'étudiant"
            var buttonalterstudent = document.createElement('button')
            cardbody.appendChild(buttonalterstudent)
            buttonalterstudent.className = 'btn btn-primary'
            buttonalterstudent.innerHTML = "modifier l'étudiant"

        }


    })


}

export default getPromotion;
export {
    getstudents
}