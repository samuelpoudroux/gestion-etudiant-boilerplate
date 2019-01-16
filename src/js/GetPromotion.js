import studentscreen from './studentscreen.js';
import addstudent from './addstudent.js';

var promotionlist;
var mySelect = document.querySelector('.listpromotion');
var load = document.querySelector("#load");
var btnstudentscreen = document.querySelector('.Btnstudentscreen')
var selectaddstudent = document.querySelector('#addstudentselect')
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








export default getPromotion;