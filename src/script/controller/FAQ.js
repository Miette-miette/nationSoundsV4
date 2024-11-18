const question= document.getElementsByClassName("question");
const reponse=document.getElementsByClassName("reponse");
const imgFleche=document.getElementsByClassName('voirPlus');

function showQuestion(){

    for(let f=0;f<question.length;f++){
        question[f].addEventListener('click', ()=>{

            if(reponse[f].style.display==="flex"){
                reponse[f].style.display="none";
                imgFleche[f].style.rotate="82deg";
            }
            else{
                reponse[f].style.display="flex";
                imgFleche[f].style.rotate="265deg";  
            } 
        })    
    }   
}