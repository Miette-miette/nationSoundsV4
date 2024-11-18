export default function CMS(){
  
//Fonction pour recuperer les données du CMS

this.dataCMS=async function(src=null){
  let promise = fetch(src)
    .then((res) => res.json())
    .catch(error => {
      console.log(error);
      return {};
    })
    .then((res) => res);
return await promise; 
}

//Fonction pour formater les données du CMS en un nouvel objet
  this.formateur=function(articleCMS){
      const captureP= /^<p\s+([a-z]+="[A-z]+")*\s*>(.*)<\/p>$/mg; //Capture des paragraphe des articles
      const captureJPG= /src="(.*\.jpg)"/mg;// Capture de l'image
      const captureDivArticle=/<div\s+(.*=".*")>(.*)\n(<p>(.*\n*)*?)<\/div>/gm;
      let dataGlobale=[];
      
      articleCMS.forEach(itemArticle => {
        let dataConcert={};//Objet contenant les données des articles du CMS
        
        //Récupération des noms de classe pour creer des clés/valeurs 
        let matches=itemArticle.content.rendered.matchAll(captureP);//Capture des differentes parties des articles
        for (const match of matches) { //Récupération des classes de l'article pour creer les objets            
            let contenuConcert=match[2];//2 = contenu de la balise         
            let classeConcert= match[1].split('"');//0 = "class" et 1 = nom de la classe         
            dataConcert[classeConcert[1]]=contenuConcert;
        }

        //Recuperation de l'image
        let img=itemArticle.content.rendered.match(captureJPG);
        img=img[0].split('"')[1];
        dataConcert["src"]=img;

        //Recuperation du titre
        let title=itemArticle.title.rendered;
        dataConcert["title"]=title;

        //Recuperation des tags
        let tag=itemArticle.tags;
        dataConcert["tags"]=tag;

        //Recuperation du corps
        let article=itemArticle.content.rendered.match(captureDivArticle);  
        dataConcert["corps"]=article;
        
        dataGlobale.push(dataConcert);
      })
      return dataGlobale
    }

    //Fonction pour recuperer les données de la carte
    this.carteData=function(articleCMS){

      articleCMS.forEach(itemArticle =>{
        let carteData={};
        let content=itemArticle.content.rendered;
        carteData["content"]=content;
        return carteData;
      })
    }

    //Fonction pour remplir les templates 
    this.replaceTemplate=function(data,template){

      //Pour les évenements
      template=template.replace(`%id%`, data.title)
      template=template.replace(`%lieu%`, data.lieu)
      template=template.replace(`%src%`, data.src);
      template=template.replace(`%title%`, data.title);
      template=template.replace(`%date%`, data.date);
      template=template.replace(`%scene%`, data.scene);
      template=template.replace(`%heure%`, data.heure);
      template=template.replace(`%iconS%`, data.iconScene);

      //Pour les articles d'actu
      template=template.replace(`%chapeau%`, data.chapeau)
      template=template.replace(`%description%`, data.description);
      template=template.replace(`%article%`, data.corps);
      
      return template;
    } 

    //Foction pour recuperer les data à partir du titre 
    this.progItemFromTitle= function(data,title){

      for (let i=0;i<data.length;i++){
          if(title==data[i].title){
            return data[i];
          }
      }     
    } 

    //Fonction pour generer la page information
    this.pageInformation=function(classItem,data){
      let cardItem=document.getElementsByClassName(classItem);
    
        //Conversion du HTML Collection en un array
        Array.from(cardItem).forEach((card) => card.addEventListener('click',()=>{
        
          //Récuperation des données du click pour afficher la page information avec les données choisies
          localStorage.setItem('infoItem', JSON.stringify(this.progItemFromTitle(data,card.id)))
          window.open('../../view/information/information.html','_self');
          }));
    }
}
 


