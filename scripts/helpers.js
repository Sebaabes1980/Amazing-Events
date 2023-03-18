const fragment = document.createDocumentFragment();
let date = []

export function imprimirCards(array, contenedor){
    contenedor.innerHTML=""
    for(let event of array){
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
    contenedor.appendChild(fragment)
}

export const createCategories = (array) =>{
    let categories = array.map(cat=> cat.category)  
    categories = categories.reduce((acumulador, elemento)=>{
        if(!acumulador.includes(elemento)){
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories 
}

export const createChecks = (array, container) => {
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

export const filterSearch = (array, value) => {
    let filteredArray = array.filter(element=> element.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filteredArray
}

export const filterChecks = (array) => {
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