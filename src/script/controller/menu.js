const menuBtn= document.getElementById("menuBtn");
const menuCollapse=document.getElementById("menuInfo");
const menuImg=document.getElementById("iconMenu");

function showMenu(){

    menuBtn.addEventListener('click', ()=>{

        if(menuCollapse.style.display==="flex"){
            menuCollapse.style.display="none";
            menuImg.src="/src/assets/media/icon/list.svg";     
        }
        else{
            menuCollapse.style.display="flex";
            menuImg.src="/src/assets/media/icon/x.svg"  
        }
    })
    
}