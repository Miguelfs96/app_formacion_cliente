import {generateTableCandidates} from './candidatures';

//GENERADORES DE NODOS 
const generateTable = () => {
    let tabla = document.createElement('table')
    tabla.setAttribute('id','tablaPrincipal');
    return tabla;
}

//ELEMENTO BASE SOBRE QUE QUE COLOCAR 
const container = document.getElementById('container');

export const initialPage = () => {
    let tabla = generateTable();
    container.appendChild(tabla);
    generateTableCandidates();

}; 
