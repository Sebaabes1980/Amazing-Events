import data from './data.js'
let detailContainer = document.getElementById("contenedor-cards")
const datos = data.events
const queryString = location.search
const params = new URLSearchParams(queryString)
const eventID = params.get('_id')
const ev = datos.find( dato => dato.id == eventID )

console.log(event)

function createDetails(event, container) {
    let div = document.createElement('div')
    div.className = "card-details"
    div.innerHTML = `
    <h1 class="card-title">${event.name}</h1>
    <img  class="card-img-top" src="${event.image}" alt="${event.name}">
    <div class="card-body"> 
        <h4 class="card-text fst-italic">${event.category}</h4>
        <h4 class="card-text text-center"><strong>Description: </strong>${event.description}</h4>
        <h4 class="card-text"><strong>IBU: </strong>${event.date}</h4>
        <h4 class="card-text"><strong>ABV: </strong>${event.place}</h4>
        <h4 class="card-text"><strong>SRM: </strong>${event.capacity}</h4>
        <h4 class="card-text"><strong>${event.price}</strong></h4>
    </div>
    `
    container.appendChild(div)
}

createDetails(ev, detailContainer)