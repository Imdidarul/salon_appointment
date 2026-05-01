

function redirect(){
    const serviceCards = document.querySelectorAll(".service")
    serviceCards.forEach(card=>{
        card.addEventListener("click",()=>{
            const redirectURL = card.getAttribute("redirect")

            if(redirectURL){
                window.location.href = redirectURL
            }else{
                console.log("URL is missing")
            }
        })
        card.style.cursor = 'pointer'
    })
}

document.addEventListener("DOMContentLoaded",redirect())