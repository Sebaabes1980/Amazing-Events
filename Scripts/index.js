import { imprimirCards, createCategories, createChecks, filterSearch, filterChecks } from './helpers.js';

let $container = document.getElementById("contenedor-cards");
let $checks = document.getElementById("contenedor-check");
const $search = document.querySelector('input[placeholder="Search"]');
const $reset = document.getElementById('reset');
const $spinner = document.getElementById('spinner');
let data = [];
let categories = "";

const showSpinner = () => {
    $spinner.classList.add('spinner--active');
};

const hideSpinner = () => {
    $spinner.classList.remove('spinner--active');
};

createCategories(data.events)

imprimirCards(data.events, $container)


createChecks(categories, $checks)


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