var promotionlist = [];
var mySelect = document.querySelector('#listpromotion');
var load = document.querySelector("#load");

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
                // now I state a value = promotion.id in order to select the right idpromotion into the select to carry out some opération 
                myOption.value = promotion.id
                mySelect.appendChild(myOption);
            })
        })

}

export default getPromotion