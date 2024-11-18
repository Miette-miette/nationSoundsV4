import CMS from '../model/CMS.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 
//Template pour la programmation
const infoTemplate= await fetchRessource("./template/informationTemplate.html"); 
//Template pour les articles
const articleTemplate= await fetchRessource("./template/articleTemplate.html"); 

let data=JSON.parse(localStorage.getItem('infoItem'));

if(!data.chapeau){
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,infoTemplate);
}
else{
    document.getElementById('information').innerHTML=cms.replaceTemplate(data,articleTemplate);
}
