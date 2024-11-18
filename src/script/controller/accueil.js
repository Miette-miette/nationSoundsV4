import CMS from '../model/CMS.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

//RESSOURCES
//const hostArticle="https://127.0.0.1:8000/index.php/api/concerts";
const hostConcert="https://127.0.0.1:8000/api/concerts";
// Articles programmation de Nation Sounds WP 
let concertCMS= await cms.dataCMS(hostConcert);
//Articles actu
//let articleCMS= await cms.dataCMS(hostArticle);

//FORMATAGE 
//données formatées
let dataConcert= cms.formateur(concertCMS);
//let dataArticle= cms.formateur(articleCMS);

//TEMPLATES
//Template du carousel artiste
const artisteTemplate= await fetchRessource("/src/view/generals/carouselCard.html"); 
//Template des articles d'actualités
const articleTemplate= await fetchRessource("/src/view/generals/articleCard.html"); 

//FONCTION POUR LE TEMPLATING HTML
function affichageCarousel(tab,template,idConteneur){ 

  let displayArticles=[];

  tab.forEach((article) => displayArticles.push(cms.replaceTemplate(article,template)));

  //Convertion des objets "article" en template HTML   
  document.getElementById(idConteneur).innerHTML=displayArticles.join(' '); 
}

//AFFICHAGE CAROUSEL ARTISTES
let concert=[];

dataConcert.forEach((displayConcert)=>concert.push(displayConcert))
affichageCarousel(dataConcert.slice(-7),artisteTemplate,'conteneurCarousel');

//AFFICHAGE ARTICLES FESTIVAL

let article=[];

dataArticle.forEach((displayArticle)=>article.push(displayArticle))
affichageCarousel(dataArticle,articleTemplate,'articleConteneur');

//RECUPERATION DES DONNEES POUR GENERER LA PAGE INFORMATION

function pageInfo(classItem,data){
    let cardItem=document.getElementsByClassName(classItem);

    //Conversion du HTML Collection en un array
    Array.from(cardItem).forEach((card) => card.addEventListener('click',()=>{
    
      //Récuperation des données du click pour afficher la page information avec les données choisies
      localStorage.setItem('infoItem', JSON.stringify(cms.progItemFromTitle(data,card.id)))
      window.open('../src/view/information/information.html','_self');
      }));
  }

pageInfo("carouselCard",concert);
pageInfo("articleCard",article);