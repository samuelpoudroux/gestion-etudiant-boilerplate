import {getstudents} from './studentscreen.js'

// Now I m create a function that is going to ask to confirm the removal and call the function delete if that approuved
function confirmdeletestudent(event){
    var buttondelete = event.target
    console.log('aaaaa')
    if (confirm("Supprimer l'étudiant : " + buttondelete.id + " ?")) {
       
        deleteStudent(buttondelete.id);
    // so the value of my select now is related to the promotion.id of the promotion, id whose function deletepromotion ask in parameters to delete the right promotion selected
    }
  
  }
  
  // this function ask as parameters the promotionid to set the id into the url 
  
  function deleteStudent(studentid) 
  { 
          fetch("http://api-students.popschool-lens.fr" + studentid, {
              method: "DELETE"
          })
              .then(function (response) {    
                 
                  console.log (response)
                  getstudents()
              });
  }
  
  export default confirmdeletestudent
  