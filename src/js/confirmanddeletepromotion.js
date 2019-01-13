import getPromotion from './GetPromotion.js'

// I need to state again the var my select because lets remember when we set a value = promotion.id  to each option of the select into the promotionget function because we would need the value to make some operation later. Now here we are.
var mySelect = document.querySelector('.listpromotion'); 

// Now I m create a function that is going to ask to confirm the removal and call the function delete if that approuved
 function confirmdeletePromotion(event){

  if (confirm("Supprimer la promotion : " + mySelect.value + " ?")) {
     
      deletePromotion(mySelect.value);
  // so the value of my select now is related to the promotion.id of the promotion, id whose function deletepromotion ask in parameters to delete the right promotion selected
  }

}

// this function ask as parameters the promotionid to set the id into the url 

function deletePromotion(promotionid) 
{
        fetch("http://api-students.popschool-lens.fr" + promotionid, {
            method: "DELETE"
        })
            .then(function (response) {    
                // we call back the function getpromo to refresh our list            
                getPromotion();
                console.log (response)
            });
}

export default confirmdeletePromotion
