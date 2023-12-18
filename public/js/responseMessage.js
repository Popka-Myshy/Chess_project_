//DOM Elements
const closeMessage = document.getElementById('close-message');
const responceMessage = document.getElementById('response-message');

if(window.location.search){
    //window.location.search = '?error=Email%20is%20already%20taken!'
    let search = window.location.search.replace(/%20/g," ");

    let key = search.split("=")[0].substr(1);
    let value = search.split("=")[1];   

    if(key === "error"){
        responceMessage.classList.add("bg-danger");
        
    }else{
        responceMessage.classList.add("bg-success");

    }
    
    responceMessage.classList.remove("hidden");
    responceMessage.querySelector("p").innerText = value;
}

//Listeners

closeMessage.addEventListener('click', () => {
    responceMessage.classList.add("hidden");
});