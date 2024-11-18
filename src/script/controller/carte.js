import CMS from '../model/CMS.js';
import ressourceCarte from './ressourcesCarte.js';
import fetchRessource from '../model/fetchArticle.js';

let cms= new CMS(); 

let ressource= new ressourceCarte();

//CATEGORIE CARTE ID=6
// Carte de Nation Sounds WP
const carteCMS= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=6"); 
//Informations des lieux et des scènes
let infoCarte= await cms.dataCMS("https://nation-soundswp-am41helgut.live-website.com/wp-json/wp/v2/posts?categories=10+14&per_page=80");
infoCarte=cms.formateur(infoCarte);

// TEMPLATES
//Affichage des evenements
const infoConcertTemplate= await fetchRessource("../../view/carte/template/carteConcertTemplate.html");
//Affichage des restaurants
const infoFoodTemplate= await fetchRessource("../../view/carte/template/carteFoodTemplate.html");
//Affichage si event=null
const aucunConcertTemplate= await fetchRessource("../../view/carte/template/aucunEvent.html");

//CREATION DES OBJETS MARQUEUR (données géographique, class, icon)
const dataMarkerRegex=/marker((.|\n)+?)<\/script>/gm;
//Données brutes des marqueurs
let dataMarker=carteCMS[0].content.rendered.match(dataMarkerRegex); 

let all=[];
let scene=[];
let food=[];
let wc=[];

function formatageMarker(){
    for(let d=0;d<dataMarker.length;d++){
        let markerObj=ressource.markerFormatage(dataMarker[d]);
        let marker = L.marker([markerObj.latitude,markerObj.longitude],{icon: markerObj.img}).bindPopup(markerObj.bulle);
        switch(markerObj.class){
            case "scene":
                scene.push(marker);
                all.push(marker); 
                continue;
                
            case "food":
                food.push(marker);
                all.push(marker); 
                continue;

            case "wc":
                wc.push(marker);
                all.push(marker); 
                continue;
            default:
                all.push(marker); 
        } 
    }
}
formatageMarker();

let allLayer=L.layerGroup(all);
let sceneLayer=L.layerGroup(scene);
let foodLayer=L.layerGroup(food);
let wcLayer=L.layerGroup(wc);

//RECUPERATION DES DONNEES GEOGRAPHIQUES DE LA MAP
const latitudeRegex=/setView\(\[(\d*.\d*)/gm;
const longitudeRegex=/setView\(\[\d*.\d*\,(\d*.\d*)/gm;

let latitudeMap=carteCMS[0].content.rendered.match(latitudeRegex);
latitudeMap=latitudeMap[0].split('[')[1];

let longitudeMap=carteCMS[0].content.rendered.match(longitudeRegex);
longitudeMap=longitudeMap[0].split(',')[1];

//SETUP DE LA MAP ET AFFICHAGE DES LAYERS
let map = L.map('map',{
    center:[latitudeMap,longitudeMap],
    zoom: 15,
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

allLayer.addTo(map);

let layerControl= L.control.layers().addTo(map);

layerControl.addOverlay(allLayer, "Tous").addTo(map);
layerControl.addOverlay(sceneLayer, "scenes").addTo(map);
layerControl.addOverlay(foodLayer, "restauration").addTo(map);
layerControl.addOverlay(wcLayer, "wc").addTo(map);


//RECUPERATION DES INFORMATIONS SUPPLEMENTAIRES
let markerIdRegex=/06\/(.*).png/gm;
let listMarkerMap= document.getElementsByClassName('leaflet-marker-icon');

function newListMarker(){

    Array.from(listMarkerMap).forEach((marker)=>{
        let nameId=marker.src.match(markerIdRegex);

        nameId=nameId[0].split('/');
        nameId=nameId[1].split('.')[0];
        marker.id=nameId;
        console.log(marker);
        

        marker.addEventListener('click',()=>{
            infoLieu(marker.id);
        })
    })
}
newListMarker();

//FONCTION POUR AFFICHER LES INFOS RELATIVES AUX MARQUEURS
function infoLieu(id){

    const conteneurInfo=document.getElementById('conteneurInformations');

    for(let t=0;t<infoCarte.length;t++){

        let todayDate= new Date();

        //AFFICHAGE DES INFOS SUR LES LIEUX
        if(infoCarte[t].type==id){ 
            let infoItem=cms.replaceTemplate(infoCarte[t],infoFoodTemplate);
            conteneurInfo.innerHTML=infoItem;
            conteneurInfo.style.backgroundColor="beige";
        } 

        //AFFICHAGE DES SPECTACLES EN TEMPS REEL PAR SCENE
        if(infoCarte[t].type=="concert"||infoCarte[t].type=="atelier"||infoCarte[t].type=="performance"){ 
            if(infoCarte[t].scene.toLowerCase()==id){
                
                let infoDate=new Date(infoCarte[t].dateF);

                if(infoDate<=todayDate){
                    let infoItem=cms.replaceTemplate(infoCarte[t],infoConcertTemplate);
                    conteneurInfo.innerHTML=infoItem;
                    conteneurInfo.style.backgroundColor="#8f505e";
                    break;
                }
                else{
                    conteneurInfo.innerHTML=aucunConcertTemplate;
                    conteneurInfo.style.backgroundColor="beige";
                } 
            }
        }               
    } 
}

//ADD EVENT LISTENER POUR LE CHANGEMENT DE LAYER
const btnCheck=document.getElementsByClassName('leaflet-control-layers-selector');

Array.from(btnCheck).forEach(function(btn){
    btn.addEventListener('click',()=>{
        newListMarker();

    })
})

    

