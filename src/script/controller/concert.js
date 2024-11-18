import CMS from '../model/CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

let filtre= new filtreProgramme;

//CATEGORIE CONCERT ID=19

// Articles Categorie Concert de Nation Sounds WP
const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=19&per_page=60"); 
//données formatées
let dataArticle= cms.formateur(articleCMS);
//Template de la page concert
const concertTemplate= await fetchRessource("../../view/concert/concertTemplate.html"); 

//Tableau des differentes scènes
const tabScenes=["Euphorie","Fusion","Reverie","Resonance","Prisme"];

//Objet jour avec ID 
let jour=[
    {
        date:"Vendredi 26 juillet",
        idJour:"vendredi"
    },
    {
        date:"Samedi 27 juillet",
        idJour:"samedi"
    },
    {
        date:"Dimanche 28 juillet",
        idJour:"dimanche"
    },
    ];

//Fonction d'affichage par scenes
function affichageScenes(tabJour){ 

    tabScenes.forEach(itemScene => {
        let scene=[];
        filtre.filtreScene(tabJour,itemScene,scene);
        for(let i=0;i<scene.length;i++){
            scene[i]= cms.replaceTemplate(scene[i],concertTemplate);
        }
        document.getElementById(itemScene.toLowerCase()).innerHTML=scene.join(' ');
    })
}

//Fonction filtrage par jour
function concertJour(jour){
    let tabJour=[];
    filtre.filtreJour(dataArticle,jour,tabJour);
    affichageScenes(tabJour);
}

//AddEventListener sur les inputs jour
jour.forEach(dataJour => {
    let inputJour=document.getElementById(dataJour.idJour);
    inputJour.addEventListener('click', ()=> concertJour(dataJour.date));
})
concertJour(jour[0].date);