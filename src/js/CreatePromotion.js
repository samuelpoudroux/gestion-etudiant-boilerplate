import getPromotion from './GetPromotion.js'

var newPromotion = document.querySelector('#NewPromo');
var startdate = document.querySelector('#StartDate');
var enddate = document.querySelector('#EndDate');

function createPromotion() {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            // on transforme la valeur du champs input newPromo en chaine Json via stringify
            body: JSON.stringify({
                name: newPromotion.value,
                startDate: startdate.value,
                endDate: enddate.value,
                students: []
            })
        })
        .then(response => response.json())
        .then(promotionresponse => {
            // I call back the function get promo to refresh my list
            getPromotion();
        //  Now I screen promotionresponse.name in console log to check if the resposnse and my method has been done corretly
            console.log(promotionresponse.name + " créé")
        })
}

export default createPromotion