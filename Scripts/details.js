import data from './data.js'
let detailContainer = document.getElementById("contenedor-cards")
const datos = data.events
const queryString = location.search
const params = new URLSearchParams(queryString)
const eventID = params.get('id')
const ev = datos.find( dato => dato._id == eventID )
let dateReference = data.currentDate


function createDetails(event, container) {
    container.innerHTML=""
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

createDetails(ev, detailContainer)