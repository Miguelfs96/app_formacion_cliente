import {editor} from './notas.js';
import {initialPage} from './principalContent.js';
import {generateTableCandidates} from './candidatures.js';
import {generateTableOffers} from './offfer.js'

window.onload = () =>{
    editor();
    initialPage();
    navigationBar();
}

const navigationBar = () => {
    let navBar = document.getElementById('navbar');
    let lista = document.createElement('ul');

    newLink(lista, generateTableCandidates, "CANDIDATURAS");
    newLink(lista, generateTableOffers, "OFERTAS");

    //GENERAR LOS SIGUIENTES BOTONES

    navBar.appendChild(lista);
}

const newLink = (lista, evento, nombre) => {
    let listElement = document.createElement('li');
    let linkElement = document.createElement('button');


    linkElement.innerText = nombre;
    linkElement.addEventListener("click", evento, false);

    listElement.appendChild(linkElement);
    lista.appendChild(listElement);
}
