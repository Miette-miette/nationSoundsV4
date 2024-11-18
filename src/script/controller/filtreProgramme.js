export default function filtreProgramme(){

    // Filtrage par jour et tri par scene (A-Z)
    this.filtreJour=function(data,jour,tabJour){
        data.forEach(itemData=>{
            if (itemData.date==jour){   
                tabJour.push(itemData);
                tabJour.sort((a,b)=>(a.scene>b.scene)?1:-1)//trier par scene      
            }  
        })
    }

    //Filtrage par scene et tri par heure
    this.filtreScene=function(tabJour,scene,tabScene){
        tabJour.forEach(jour=>{
            if(jour.scene==scene){
                tabScene.push(jour);
                tabScene.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure 
            }
        })
    }

    //Filtrage par type et par heure
    this.filtreType=function(tabData,type,tabType){
        tabData.forEach(itemData=>{
            if(itemData.type==type){
                tabType.push(itemData);
                tabType.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure  
            }
        })
    }

    //Filtrage uniquement par heure
    this.filtreHeure=function(tabData,heure,tabHeure){
        tabData.forEach(itemData=>{
            if(itemData.heureF>=heure ){
                tabHeure.push(itemData);
                tabHeure.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)) //trier par heure 
            }
        })
    }

    //FILTRAGE DYNAMIQUE POUR PAGE PROGRAMATION
    this.filtreAll=function(data,filtre,tab){
        data.forEach(itemData =>{
            let jourRegex=/(^\w+)/gm;
            let jourSelected=itemData.date.match(jourRegex);//Recuperer seulement le jour sur l'element date de data 

            if((jourSelected[0]==filtre.jour|| filtre.jour=="Tous")&&(itemData.heureF>=filtre.heure) ){ //FILTRAGE PAR DONNEES TEMPORELLES

                if((itemData.scene==filtre.lieux || filtre.lieux=="Tous") && (itemData.type==filtre.type || filtre.type=="Tous")){ //FILTRAGE PAR LIEUX ET TYPE
                    tab.push(itemData);
                }
            }
            tab.sort((a,b)=>(a.scene>b.scene)?1:-1);
            tab.sort((a,b)=>(a.heureF>b.heureF ? 1:-1)); 
        })
    }  
}