const $spinner = document.getElementById('spinner');  
let dateReference = "";
let ev = [];


const showSpinner = () => {
    $spinner.classList.add('spinner--active');
};

const hideSpinner = () => {
    $spinner.classList.remove('spinner--active');
};

async function getData() {
    try {
        let detailContainer = document.getElementById("contenedor-cards")
        const apiUrl = "scripts/amazing.json";
        const response = await fetch(apiUrl);
        const json = await response.json();
        const queryString = location.search;
        const params = new URLSearchParams(queryString);
        const eventID = params.get('id');
        let event = json.events;   
        dateReference = json.currentDate;
        ev = event.find( dato => dato._id == eventID );
        createDetails(ev, detailContainer)
        hideSpinner();

    } catch (error) {
      console.log(error);
    }
}

showSpinner();
console.log(ev);
getData();

function createDetails(event, container) {
    let aux = event.assistance
    if (event.date > dateReference) {
        aux = event.estimate
    }
    let div = document.createElement('div')
    div.className = "card-details"
    div.innerHTML = `
    <h1 class="card-title">${event.name}</h1>
    <img  class="card-img-top" src="${event.image}" alt="${event.name}">
    <h1 class="card-title">${event.category}</h1>
    <div class="card-body"> 
        <h4 class="card-text"><strong>Description: </strong>${event.description}</h4>
        <h4 class="card-text"><strong>Event date: </strong>${event.date}</h4>
        <h4 class="card-text"><strong>Place: </strong>${event.place}</h4>
        <h4 class="card-text"><strong>Capacity: </strong>${event.capacity}</h4>
        <h4 class="card-text"><strong>Assistance / estimate: </strong>${aux}</h4>
        <h4 class="card-text"><strong>Price: $ </strong>${event.price}</h4>
    </div>
    `
    container.appendChild(div)
}
