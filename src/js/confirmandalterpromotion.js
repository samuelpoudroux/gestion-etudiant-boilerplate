import getPromotion from './GetPromotion.js'

// I need to state again the var my select because lets remember when we set a value = promotion.id  to each option of the select into the promotionget function because we would need the value to make some operation later. Now here we are.
var mySelect = document.querySelector('#listpromotion')
var divinputalter = document.querySelector('#inputalter')

// this function will ask to confirm if we want to alter the promotion and if there would be ok Call the function alterpromotion taht is goig to modiy the promotion
function confirmalterpromotion(event) {

    if (confirm("modifier la promotion : " + mySelect.value + " ?")) {
        var alternamepromotion = document.createElement('input');
        alternamepromotion.id = 'altername';
        var alterstartdate = document.createElement('input');
        alterstartdate.id = 'alterstartdate'
        var alterenddate = document.createElement('input');
        alterenddate.id = 'alterenddate'
        var btnalterpromotion = document.createElement('button')
        alternamepromotion.placeholder = 'nouveau nom de la promotion'
        alterstartdate.type = 'date';
        alterenddate.type = 'date';
        // I attribute a value to my button that the event is going to take place in order to link my event with the promotion.id to use it later in the function alterpromotion when i define a varpromotion as event.target
        btnalterpromotion.id = mySelect.value
        divinputalter.appendChild(alternamepromotion);
        divinputalter.appendChild(alterstartdate);
        divinputalter.appendChild(alterenddate);
        divinputalter.appendChild(btnalterpromotion)
        btnalterpromotion.innerHTML = 'valider les modifications'
        btnalterpromotion.addEventListener("click", alterpromotion)

        // alterpromotion(promotion);
        // so the value of my select now is related to the promotion.id of the promotion, id whose function deletepromotion ask in parameters to delete the right promotion selected
    }

}

function alterpromotion(event) {
    var alternamepromotion = document.querySelector('#altername');
    var alterstartdate = document.querySelector('#alterstartdate');
    var alterenddate = document.querySelector('#alterenddate');
    var promotion = event.target


    fetch("http://api-students.popschool-lens.fr/api/promotions/" + promotion.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            // on transforme la valeur du champs input newPromo en chaine Json via stringify
            body: JSON.stringify({
                name: alternamepromotion.value,
                startDate: alterstartdate.value,
                endDate: alterenddate.value,
            })
        })
        .then(response => response.json())
        .then(promotionresponse => {
            console.log(promotionresponse + " modifié")
            // I call back the function get promo to refresh my list
            getPromotion();
            //  Now I screen promotionresponse.name in console log to check if the resposnse and my method has been done corretly
         
        })
}

export default confirmalterpromotion