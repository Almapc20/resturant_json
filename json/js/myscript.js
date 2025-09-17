//  full size navbar when scroll

window.onscroll=function(){scrollFunction()};

function scrollFunction(){
        if (document.body.scrollTop>80 ,document.documentElement.scrollTop>80){
            document.getElementById("navbar-box").style.background="#f16121";
    
        }
        else{
            document.getElementById("navbar-box").style.background="none"
        }
    }
    


    // change style when hover caption

const captionstyle = document.querySelectorAll(".caption");

captionstyle.forEach(caption => {
    caption.addEventListener("mouseover",() => {
        caption.style.clipPath = " none " ;
        caption.style.textAlign = "center";
        

      
    });

    caption.addEventListener("mouseout", () => {
        caption.style.clipPath = " polygon(0 50%, 100% 0, 100% 100% ,0 100%)";
        caption.style.textAlign = "right";
       
    });
});

// ************************************************************************
