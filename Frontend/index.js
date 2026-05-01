


async function verification(){
    const token = localStorage.getItem("token")
    if (!token){
        window.location.href = "login.html"
    }
    try {
        await axios.get(`http://localhost:3000/user/verifyUser`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        console.log("User is valid")   
    } catch (error) {       
        console.log(error)
        localStorage.removeItem("token")
        window.location.href = "login.html"
    }
}

async function loadServices(){
    try {
        const response = await axios.get(`http://localhost:3000/services/getAllServices`)

    const services = response.data.services
    const container = document.querySelector(".serviceCards")
    services.forEach(service=>{
        const serviceDiv = document.createElement("div")
        serviceDiv.className = "service"
        serviceDiv.dataset.redirect = `services/${service.category.toLowerCase().replace(" ", "")}.html`
        serviceDiv.dataset.serviceId = service.id

        serviceDiv.innerHTML = `
                <h2>${service.category}</h2>
                <img src="../assets/${service.category}.jpg" alt="${service.category}">
                <p>${service.description}</p>
                <p>Price:- INR ${service.price}/-</p>
                <button>Book</button>
            `;
        container.appendChild(serviceDiv)
        redirect()
    })
        
    } catch (error) {
        console.log("Error lodaing services")
        console.log(error)
    }
    

}

function redirect(){
    const serviceCards = document.querySelectorAll(".service")
    serviceCards.forEach(card=>{
        card.addEventListener("click",()=>{
            const redirectURL = card.getAttribute("data-redirect")

            if(redirectURL){
                window.location.href = redirectURL
            }else{
                console.log("URL is missing")
            }
        })
        card.style.cursor = 'pointer'
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    // verification();
    redirect();
})