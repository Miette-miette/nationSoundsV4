import CMS from '../model/CMS.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

//CATEGORIE PARTENAIRE ID=12
// Articles partenaires de Nation Sounds WP 
const articleCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=12&per_page=60");
//données formatées
const dataPartenaire= cms.formateur(articleCMS);
//Template de la page programme
const partenaireTemplate= await fetchRessource("../../view/partenaire/partenaireTemplate.html"); 

// TEMPLATING HTML DES ARTICLES PARTENAIRES 
function affichageItem(tab,conteneur){ 

    let partenaires=[]
    
    tab.forEach((elem)=> elem = partenaires.push(cms.replaceTemplate(elem,partenaireTemplate)));  
    document.getElementById(conteneur).innerHTML=partenaires.join(' '); 
}

//TRI PAR CATEGORIES
let institution=[];
let entreprise=[];

dataPartenaire.forEach(partenaire => {
    if(partenaire.type=="institution"){
        institution.push(partenaire);
    }
    if(partenaire.type=="entreprise"){
        entreprise.push(partenaire);
    }
})

//AFFICHAGE
affichageItem(institution,"institutionConteneur");
affichageItem(entreprise,"entrepriseConteneur");