export default function ressourceCarte(){

    //Creation objet icon
    this.iconObj=function(url,longueur,largeur){
        let icon=L.icon({
            iconUrl:url, 
            iconSize: [longueur,largeur],
        })
    return icon;
    }

    this.markerFormatage=function(dataMarker){

        const latMarkerRegex=/marker\(\n( )*\[(\d*.\d*)/gm;
        const lonMarkerRegex=/marker\(\n( )*\[(\d*.\d*\,\d*.\d*)/gm;
        const imgMarkerRegex=/"iconUrl":(.*).png/gm;
        const antislashRegex=/\\/gm;
        const sizeRegex=/"iconSize":"(.*).."/gm;
        const bulleRegex=/unescape\('(.*)'\)/gm;
        const titleRegex=/"title":"(.*?),"/gm;

            let markerObj={};
        
            //Latitude
        
            let latMarker=dataMarker.match(latMarkerRegex);
            latMarker=latMarker[0].split('[')[1]; 
            markerObj["latitude"]=latMarker;
        
            //Longitude
            
            let lonMarker=dataMarker.match(lonMarkerRegex);
            lonMarker=lonMarker[0].split(',')[1]; 
            markerObj["longitude"]=lonMarker;
        
            //Title
        
            let classMarker=dataMarker.match(titleRegex);
            classMarker=classMarker[0].split(':')[1]; 
            classMarker=classMarker.split('"')[1]; 
            markerObj["class"]=classMarker;
        
            //URL icon
           
            let imgMarker=dataMarker.match(imgMarkerRegex);
            imgMarker=imgMarker[0].split(':"')[1];
            imgMarker=imgMarker.replace(antislashRegex,"")
        
            //Size icon
        
            let sizeMarker=dataMarker.match(sizeRegex);
            sizeMarker=sizeMarker[0].split(':"')[1];
        
            let longueur=sizeMarker.split(',')[0];
            let largeur=sizeMarker.split(',')[1];
            largeur=largeur.split('"')[0];
        
            markerObj["img"]=this.iconObj(imgMarker,longueur,largeur);
        
            //Bulle icon
        
            let bulle=dataMarker.match(bulleRegex);
            bulle=bulle[0].split('\'')[1];
            markerObj["bulle"]=bulle;

            return markerObj;       
        
    }
}