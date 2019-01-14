var promotionlist;
var mySelect = document.querySelector('.listpromotion');
var studentcontent = document.querySelector('#studentcontent');
var load = document.querySelector("#load");
var studentlist
var btnstudentscreen = document.querySelector('.Btnstudentscreen')

btnstudentscreen.addEventListener("click", studentscreen)

// this function getback the promotionlist and screen them in html
function getPromotion() {
    // I retreive the list promotion by a fetch method

    fetch("http://api-students.popschool-lens.fr/api/promotions")
        // we get back the responson within json format
        .then(response => response.json())
        // I name the response promotionresponse
        .then(promotionresponse => {
            promotionlist = promotionresponse['hydra:member'];
            load.innerHTML = '';
            promotionlist.forEach(promotion => {
                load.innerHTML += promotion.id + ". " + promotion.name + "<br>";
                // Now lets go to add this list into the selectlist     
                var myOption = document.createElement('option');
                myOption.innerHTML = promotion.name;
                // now I state a value = promotion['@id'] in order to select the right idpromotion into the select to carry out some opération 
                myOption.value = promotion["@id"]
                mySelect.appendChild(myOption);
            })

            console.log(promotionresponse['hydra:member'])

            console.log(promotionlist)
        })
}

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
    btnstudentscreen.id = mySelect.value
    var screenstudent = event.target

    studentlist.forEach(student => {
        if (student.promotion == screenstudent.id) {
            console.log(student.firstname)
       
        var card = document.createElement('div')
        card.className = 'card w-50' 
        studentcontent.appendChild(card)  
        var cardbody = document.createElement('div')
        cardbody.className = 'card-body'
        card.appendChild(cardbody)
        var h5 = document.createElement('h5')
        h5.className = "card-title"
        h5.innerHTML = student.firstname + student.lastname
        cardbody.appendChild(h5)
        var birthdate = document.createElement('h5')
        card.appendChild(birthdate)
        var buttondeletestudent = document.createElement('button')
        cardbody.appendChild(buttondeletestudent)
        buttondeletestudent.className= 'btn btn-primary'
        buttondeletestudent.innerHTML = "Supprimer l'étudiant"
        var buttonalterstudent = document.createElement('button')
        cardbody.appendChild(buttonalterstudent)
        buttonalterstudent.className= 'btn btn-primary'
        buttonalterstudent.innerHTML = "modifier l'étudiant"
       
        }

       
    })


}

export default getPromotion;
export {getstudents
}