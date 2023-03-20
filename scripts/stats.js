import { createCategories } from './helpers.js';
const $spinner = document.getElementById('spinner');
let $table1 = document.getElementById("table1");
let bigger = [];
let small = [];
let capacity = [];
let dateReference = "";

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
        hideSpinner();
        imprimirTable1(event, $table1);
        imprimirTable2(event, $table1);
        imprimirTable3(event, $table1);
        console.log(createCategories(event));
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
        <td>Events with the higest percentage of attendance</td>
        <td>Events with the lowest percentage of attendance</td>
        <td>Events with larger capacity</td>
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
    let i = event.length;
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
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
        </tr>
        <tr>
            <td><b>${i}</b></td>
            <td><b>${small.name}</b></td>
            <td><b>${capacity.name}</b></td>
        </tr>
    </tbody>
    `
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
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
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



// function genera_tabla() {
//     // Obtener la referencia del elemento body
//     var body = document.getElementsByTagName("body")[0];
  
//     // Crea un elemento <table> y un elemento <tbody>
//     var tabla   = document.createElement("table");
//     var tblBody = document.createElement("tbody");
  
//     // Crea las celdas
//     for (var i = 0; i < 2; i++) {
//       // Crea las hileras de la tabla
//       var hilera = document.createElement("tr");
  
//       for (var j = 0; j < 2; j++) {
//         // Crea un elemento <td> y un nodo de texto, haz que el nodo de
//         // texto sea el contenido de <td>, ubica el elemento <td> al final
//         // de la hilera de la tabla
//         var celda = document.createElement("td");
//         var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
//         celda.appendChild(textoCelda);
//         hilera.appendChild(celda);
//       }
  
//       // agrega la hilera al final de la tabla (al final del elemento tblbody)
//       tblBody.appendChild(hilera);
//     }
  
//     // posiciona el <tbody> debajo del elemento <table>
//     tabla.appendChild(tblBody);
//     // appends <table> into <body>
//     body.appendChild(tabla);
//     // modifica el atributo "border" de la tabla y lo fija a "2";
//     tabla.setAttribute("border", "2");

// <table>
//     <thead>
//       <tr>
//         <th colspan="3">Upcoming Events stadistics by category</th>
//       </tr>   
//     </thead>
//     <tbody>
//       <tr>  
//         <td>Categories</td>
//         <td>Revenues</td>
//         <td>Percentage of attendance</td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//     </tbody>
//     <thead>
//       <tr>
//         <th colspan="3">Past Events stadistics by category</th>
//       </tr>   
//     </thead>
//     <tbody>
//       <tr>  
//         <td>Categories</td>
//         <td>Revenues</td>
//         <td>Percentage of attendance</td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//       <tr>
//         <td></td>
//         <td></td>
//         <td></td>
//       </tr>
//     </tbody>
//   </table>