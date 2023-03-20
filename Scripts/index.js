import { imprimirCards, createCategories, createChecks, filterSearch, filterChecks } from './helpers.js';

let $container = document.getElementById("contenedor-cards");
let $checks = document.getElementById("contenedor-check");
const $search = document.querySelector('input[placeholder="Search"]');
const $reset = document.getElementById('reset');
const $spinner = document.getElementById('spinner');
let event = [];
let categories = "";

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
        event = json.events;   
        hideSpinner();
        imprimirCards(event, $container);
        categories = createCategories(event);
        createChecks(categories, $checks);
    } catch (error) {
      console.log(error);
    }
}

showSpinner()

getData();

const filterAndPrint = () => {
    let dataFiltered = filterChecks(event);
    dataFiltered = filterSearch(dataFiltered, $search.value);
    if (dataFiltered.length === 0) {
        const $noResults = document.getElementById('no-results');
        $noResults.style.display = 'block';
    } else {
        const $noResults = document.getElementById('no-results');
        $noResults.style.display = 'none';
    }
    imprimirCards(dataFiltered, $container);
  };

$checks.addEventListener('change', () => {
    filterAndPrint();
  });
  
$search.addEventListener('keyup', () => {
    filterAndPrint();
});
  
 $reset.addEventListener('click', () => {
     document.querySelectorAll('input[type="checks"]:checked').forEach(check => {
       check.checked = false;
     });
     filterAndPrint();
 });