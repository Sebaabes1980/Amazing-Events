import { createCategories } from './helpers.js';
const $spinner = document.getElementById('spinner');
let $tablets = document.getElementById("tablets");
let dateReference = "";
let bigger = [];
let small = [];
let capacity = [];
let arrayCat = [];
let rev = 0;

const showSpinner = () => {
    $spinner.classList.add('spinner--active');
};

const hideSpinner = () => {
    $spinner.classList.remove('spinner--active');
};

async function getData() {
    try {
        const apiUrl = "scripts/amazing.json";
        const response = await fetch(apiUrl);
        const json = await response.json();
        let event = json.events;
        dateReference = json.currentDate;
        arrayCat = createCategories(event);
        hideSpinner();
        imprimirTable1(event, $tablets);
        imprimirTable2(event, $tablets);
        imprimirTable3(event, $tablets);
    } catch (error) {
      console.log(error);
    }
}

showSpinner()

getData();

function imprimirTable1(event,container) {
    bigger =  find_big(event);
    small = find_small(event);
    capacity = find_larger(event);
    let tab = document.createElement('table')
    tab.className = "table"
    tab.innerHTML = `
    <thead>
      <tr>
        <th colspan="3">Events Stadistics</th>
      </tr>   
    </thead>
    <tbody>
      <tr>  
        <td><b><i>Events with the higest percentage of attendance</i></b></td>
        <td><b><i>Events with the lowest percentage of attendance</i></b></td>
        <td><b><i>Events with larger capacity</i></b></td>
      </tr>
      <tr>
        <td><b>${bigger.name}</b></td>
        <td><b>${small.name}</b></td>
        <td><b>${capacity.name}</b></td>
      </tr>
    </tbody>
    `
    container.appendChild(tab)
}

function imprimirTable2(event,container) {
    bigger =  find_big(event);
    small = find_small(event);
    capacity = find_larger(event);
    let tab = document.createElement('table')
    tab.className = "table"
    tab.innerHTML = `
    <thead>
        <tr>
        <th colspan="3">Upcoming Events stadistics by category</th>
        </tr>   
    </thead>
    <tbody>
        <tr>  
            <td><b><i>Categories</td>
            <td><b><i>Revenues</td>
            <td><b><i>Percentage of attendance</td>
        </tr>
    `
    console.log(createTable(event));
    tab.innerHTML = `${createTable(event)}`
    container.appendChild(tab)
}

function imprimirTable3(event,container) {
    bigger =  find_big(event);
    small = find_small(event);
    capacity = find_larger(event);
    let tab = document.createElement('table')
    tab.className = "table"
    tab.innerHTML = `
    <thead>
        <tr>
        <th colspan="3">Past Events stadistics by category</th>
        </tr>   
    </thead>
    <tbody>
        <tr>  
            <td><b><i>Categories</td>
            <td><b><i>Revenues</td>
            <td><b><i>Percentage of attendance</td>
        </tr>
    </tbody>
    `
    container.appendChild(tab)
}

function find_big(array) {
    let aux = 0;    
    let max = 0;
    let arrayMax =[];
    let porc = 0;
    for (let a of array){
        if (a.date > dateReference) {
            aux = a.estimate;
        } else {
            aux = a.assistance;
        }
        porc = aux * 100 / a.capacity;
        if (porc > max) {
            max = porc;
            arrayMax = a;         
        }
    }
    return(arrayMax);
}

function find_small(array) {
    let aux = 0;    
    let min = 1000000;
    let arrayMin =[];
    let porc = 0;
    for (let a of array){
        if (a.date > dateReference) {
            aux = a.estimate;
        } else {
            aux = a.assistance;
        }
        porc = aux * 100 / a.capacity;
        if (porc < min) {
            min = porc;
            arrayMin = a;         
        }
    }
    return(arrayMin);
}

function find_larger(array) {
    let larger =[];
    let larg = 0;
    for (let a of array){
        if (a.capacity > larg) {
            larg = a.capacity;
            larger = a;         
        }
    }
    return(larger);
}

function revenues(array) {
    let ac = 0;
    let aux = 0;
    for (let a of array){
        if (a.date > dateReference) {
            aux = a.estimate;
        } else {
            aux = a.assistance;
        }
        rev = 0
        ac = ac + (a.price * aux);
    }
    return(ac);
}

let createTable = function(event){
	let fila = "";
	for(let e of event){
		fila += "<tr> <td>";
		fila += "${event.category}";
		fila += "</td>";

		fila += "<td>";
		fila += "loco2";
		fila += "</td>";

		fila += "<td>";
		fila += "loco3";
		fila += "</td>";
	}
	fila += "</tbody>";
    return(fila);
}