import { createCategories } from './helpers.js';
const $spinner = document.getElementById('spinner');
let $tablets = document.getElementById("tablets");
let dateReference = "";
let capacity = [];
let arrayCat = [];
let rev = [];
let per = [];
let porce = "";
let pesos = "";

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
    let bigger =  find_big(event);
    let mayAtt = bigger.map(may => may.name)
    let mayAtt2 = mayAtt.join('<br>');
    let small = find_small(event);
    let maySma = small.map(sma => sma.name)
    let maySma2 = maySma.join('<br>');
    let capacity = find_larger(event);
    let mayCap = capacity.map(cap => cap.name);
    let mayCap2 = mayCap.join('<br>');
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
        <td style="background-color:#C0C0C0"><b><i>Events with the higest percentage of attendance</i></b></td>
        <td style="background-color:#C0C0C0"><b><i>Events with the lowest percentage of attendance</i></b></td>
        <td style="background-color:#C0C0C0"><b><i>Events with larger capacity</i></b></td>
      </tr>
      <tr>
        <td>${mayAtt2}</td>
        <td>${maySma2}</td>
        <td>${mayCap2}</td>
      </tr>
    </tbody>
    `
    container.appendChild(tab)
}

function imprimirTable2(event,container) {
    event = event.filter(b => b.date > dateReference);
    rev = revenues(event);
    per = percentage(event);
    porce = "porce";
    pesos = "pesos";
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
            <td style="background-color:#C0C0C0"><b><i>Categories</td>
            <td style="background-color:#C0C0C0"><b><i>Revenues</td>
            <td style="background-color:#C0C0C0"><b><i>Percentage of attendance</td>
        </tr>
    </tbody>
    ${createTable(arrayCat)}`
    container.appendChild(tab);
}

function imprimirTable3(event,container) {
    event = event.filter(b => b.date < dateReference);
    rev = revenues(event);
    per = percentage(event);
    porce = "porce";
    pesos = "pesos";
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
            <td style="background-color:#C0C0C0"><b><i>Categories</td>
            <td style="background-color:#C0C0C0"><b><i>Revenues</td>
            <td style="background-color:#C0C0C0"><b><i>Percentage of attendance</td>
        </tr>
    </tbody>
    ${createTable(arrayCat)}`
    container.appendChild(tab);
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
        }
    }
    for (let a of array){
        if (a.date > dateReference) {
            aux = a.estimate;
        } else {
            aux = a.assistance;
        }
        porc = aux * 100 / a.capacity;
        if (porc == max) {
            arrayMax.push(a);       
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
        }
    }
    for (let a of array){
        if (a.date > dateReference) {
            aux = a.estimate;
        } else {
            aux = a.assistance;
        }
        porc = aux * 100 / a.capacity;
        if (porc == min) {
            arrayMin.push(a);       
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
        }
    }
    for (let a of array){
        if (a.capacity == larg) {
            larger.push(a);    
        }
    }
    return(larger);
}

let createTable = function(event){
	let fila = "";
    let j = 0;
	for(let e of event){
		fila += "<tr> <td>";
		fila += arrayCat[j];
		fila += "</td>";

		fila += "<td class = " + pesos + ">";
		fila += rev[j];
		fila += "</td>";

		fila += "<td class = " + porce + ">";
		fila += per[j];
		fila += "</td>";
        j++;
	}
	fila += "</tbody>";
    return(fila);
}

function revenues(event) {
    let aux = 0;
    let revenues = [];
    let i = arrayCat.length;
    for (let index = 0; index < i; index++) {
        let ac = 0;
        let count = 0;
        for (let a of event) {
            if (arrayCat[index] == a.category) {
                if (a.date > dateReference) {
                    aux = a.estimate;
                } else {
                    aux = a.assistance;
                }
                ac = ac + (a.price * aux);
            }
        }
        revenues.push(ac);       
    }
        return(revenues);
}

function percentage(event) {
    let aux = 0;
    let percentage = [];
    let i = arrayCat.length;
    for (let index = 0; index < i; index++) {
        let perc = 0;
        for (let a of event) {
            if (arrayCat[index] == a.category) {
                if (a.date > dateReference) {
                    aux = a.estimate;
                } else {
                    aux = a.assistance;
                }
                perc = aux * 100 / a.capacity;
            }
        }
        perc = perc.toFixed(2);
        percentage.push(perc);       
    }
        return(percentage);
}