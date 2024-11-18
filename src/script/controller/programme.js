import CMS from '../model/CMS.js';
import filtreProgramme from './filtreProgramme.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 
let filtre= new filtreProgramme;

//CATEGORIE PROGRAMATION ID=14
// Articles programmation de Nation Sounds WP
const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=14&per_page=60"); 
//données formatées
const dataArticle= cms.formateur(articleCMS);
//Template de la page programme
const progTemplate= await fetchRessource("../../view/programme/programmeTemplate.html"); 

//DONNEES DES FILTRES
let progFiltre={
    
    "jour": "tous" ,
    "heure": 14,
    "lieux":"tous", 
    "type":"tous",  
}

//ICONES DES SCENES
let iconeScene={
    "Euphorie":"/src/assets/media/scene/euphorie.png",
    "Fusion":"/src/assets/media/scene/fusion.png",
    "Reverie":"/src/assets/media/scene/fusion.png",
    "Patio":"/src/assets/media/scene/le patio.png",
    "Prisme":"/src/assets/media/scene/prisme.png",
    "Resonance":"/src/assets/media/scene/resonance.png",
}

//Fonction AFFICHAGE
function affichageItem(tab){  
   
    let displayEvent=[];

    tab.forEach((event) => displayEvent.push(cms.replaceTemplate(event,progTemplate)));
   
    document.getElementById('progConteneur').innerHTML=displayEvent.join(' '); 
}

//Affichage ALL
let all=[];

dataArticle.forEach(itemScene =>{
    let sceneName=Object.keys(iconeScene);
    let sceneImg=Object.values(iconeScene);

    for(let j=0;j<sceneName.length;j++){
        if(itemScene.scene==sceneName[j]){
        itemScene["iconScene"]=sceneImg[j];
        } 
    }
    all.push(itemScene);
})
affichageItem(all);
cms.pageInformation("progItem",dataArticle);

//Fonction FILTRAGE 
function filtrageItem(data,progFiltre){
    let progTab=[];
    
    filtre.filtreAll(data,progFiltre,progTab);   
    affichageItem(progTab);
    cms.pageInformation("progItem",data);  
}

//RECUPERER LES DONNEES DES INPUTS
function filtreChange(){

    //JOUR
    progFiltre.jour=document.getElementById("jour").value;

    //HEURE
    progFiltre.heure=document.getElementById("heure").value;

    //LIEU
    progFiltre.lieux=document.getElementById("lieu").value;

    //TYPE
    progFiltre.type=document.getElementById("type").value;

    //FILTRAGE 
    filtrageItem(dataArticle,progFiltre);
}

//ADD EVENT LISTENER SUR LES SELECTS ET INPUTS
function setup(){

    //Recuperation des input
    let onchangeElem= document.getElementById('heure');
    onchangeElem.addEventListener('change',filtreChange);
    
    //Recuperation des select
    let onchangeSelect= document.getElementsByTagName('select');
    Array.from(onchangeSelect).forEach((input) => input.addEventListener('change',filtreChange));
}
setup();

//SLIDER FILTRE POUR LA VERSION MOBILE ET TABLETTE
function showFiltre(){

    const progFiltreConteneur=document.getElementById('filtreTitre');
    const filtre=document.getElementsByClassName('filtreConteneur');
    const imgFleche=document.getElementsByClassName('voirPlus');

    progFiltreConteneur.addEventListener('click', ()=>{

        Array.from(filtre).forEach(displayFiltre =>{
            if(displayFiltre.style.display==="flex"){
                displayFiltre.style.display="none";
                imgFleche[0].style.rotate="82deg";
            }
            else{
                displayFiltre.style.display="flex";
                imgFleche[0].style.rotate="265deg";
            } 
        })
    })       
}
showFiltre();
