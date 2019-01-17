import {getstudents} from './studentscreen.js'
var btnalterstudent = document.querySelector(('.btnalterstudent'))

// this function will ask to confirm if we want to alter the promotion and if there would be ok Call the function alterpromotion taht is goig to modiy the promotion
function confirmalterstudent(event) {
    // I GIVE THE VALUE TO MY VARIABLE btnalterstudent AS Event.TARGET BECAUSE I GAVE HIM AN ID IN GETSTUDENT FUNCTION
    btnalterstudent = event.target
    if (confirm("modifier l'étudiant : " + btnalterstudent.id + " ?")) {
        alterstudent(event)
        // alterpromotion(promotion);
        // so the value of my select now is related to the promotion.id of the promotion, id whose function deletepromotion ask in parameters to delete the right promotion selected
    }

}

function alterstudent(event) {

    // now I state my variables and to put a value to student id thait is equal to my btnalterstudent.data.set.id because i m goint to need this value to retreive my suitable input call by the event, as well as the event0.target to get back the end point student @id to put in the right address
    btnalterstudent = event.target
    var studentid = btnalterstudent.dataset.id;
    var altersurnamestudent = document.querySelector("#altersurname"+ studentid);
    var alterfirstnamestudent = document.querySelector("#alterfirstname" + studentid);


    fetch("http://api-students.popschool-lens.fr" + btnalterstudent.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            
            body: JSON.stringify({
                firstname: alterfirstnamestudent.value,
                lastname: altersurnamestudent.value,
               
            })
        })
        .then(response => response.json())
        .then(studentresponse => {
            console.log(studentresponse + " modifié")
        
            //  Now I screen promotionresponse.name in console log to check if the resposnse and my method has been done corretly
            getstudents()
        })

        
}

export default confirmalterstudent