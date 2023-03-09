import data from "./data.js";
let $container = document.getElementById("contenedor-cards");
let $checks = document.getElementById("contenedor-check");
const $search = document.querySelector('input[placeholder="Search"]');
const fragment = document.createDocumentFragment();
let dateReference = data.currentDate
function imprimirCards(array, contenedor){
    contenedor.innerHTML=""
    for(let event of array){
        if (event.date > dateReference) {
            let div = document.createElement('div');
            div.className = "card"
            div.innerHTML += `
            <h5 class="card-title">${event.category}</h5>
            <img class="card-img-top"  src="${event.image}"/>
            <div class="card-body">          
            <p class="card-text">${event.description}</p>          
            </div>
            <a href="details.html?id=${event._id}" class="btn btn-primary">${event.name}</a>
                    ` 
            fragment.appendChild(div) 
        }       
    }     
    contenedor.appendChild(fragment)
}

imprimirCards(data.events, $container)

const createCategories = (array) =>{
  let categories = array.map(cat=> cat.category)

  categories = categories.reduce((acumulador, elemento)=>{
      if(!acumulador.includes(elemento)){
          acumulador.push(elemento);
      }
      return acumulador
  }, [])
  return categories 
}

let categories = createCategories(data.events)

const createChecks = (array, container) => {
    array.forEach( category=>{
        let div = document.createElement('div')
        div.className = `form-check ${category.toLowerCase()}`
        div.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${category.toLowerCase()}" id="${category.toLowerCase()}">
        <label class="form-check-label" for="${category.toLowerCase()}">
          ${category}
        </label>
        `
        container.appendChild(div)
    })
}

createChecks(categories, $checks)

const filterSearch = (array, value) => {
    let filteredArray = array.filter(element=> element.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filteredArray
}

const filterChecks = (array) => {
    let checked = document.querySelectorAll(`input[type="checkbox"]:checked`);
    let checkMapeado = Array.from(checked).map(elemento=> elemento.value)
    console.log(checkMapeado)
    let filteredArray = array.filter(element => checkMapeado.includes(element.category.toLowerCase()))
    console.log(filteredArray.length)
    if (filteredArray.length < 1) {
        return array
    }
    return filteredArray
}

const filterAndPrint =  (array) =>{
    let arrayFiltered = filterChecks(array)
    arrayFiltered = filterSearch(arrayFiltered, $search.value)
    return arrayFiltered
}

$search.addEventListener('keyup', (e) =>{
    let dataFilter = filterAndPrint(data.events)
    imprimirCards(dataFilter, $container)
})

$checks.addEventListener('change', ()=>{
    let dataFilter = filterAndPrint(data.events)
    imprimirCards(dataFilter, $container)
}) 