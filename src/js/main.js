
import getPromotion from './GetPromotion.js'
import createPromotion from './CreatePromotion.js'
import confirmdeletePromotion from './confirmanddeletepromotion.js'
import confirmalterpromotion from './confirmandalterpromotion.js'
import {getstudents} from './GetPromotion.js'

// I build an array to stock my jsondata of promotion

// I state my require variables to create a promotion
var btncreatePromo = document.querySelector('#BtnCreatePromo');
var btnalterPromo = document.querySelector('#BtnAlterPromo');
var btndeletePromo = document.querySelector('#BtndeletePromo');

// I set an event on my buttons
btncreatePromo.addEventListener('click', createPromotion);
btndeletePromo.addEventListener ('click', confirmdeletePromotion) 
btnalterPromo.addEventListener('click', confirmalterpromotion )

// I call the function get promotion
getPromotion();
getstudents()