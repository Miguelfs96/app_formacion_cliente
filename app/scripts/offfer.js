import * as data from '../data/offer.json';

//GENERADORES DE NODOS 
const generateHeaderCell = () => document.createElement('th');
const generateRow = () => document.createElement('tr');
const generateCell = () => document.createElement('td');

//FUNCION PRINCIPAL
export const generateTableOffers = () => {
  let tabla = document.getElementById('tablaPrincipal');
  resetTable(tabla);
  headerTable(tabla);

  data.internshipOffer.map(element => firstMap(element))
    .forEach(element => { //CAMBIAR POR FILTER CUANDO SE IMPLEMENTE EL FILTRADO
      let fila = generateRow();
      printCell(element, fila);
      tabla.appendChild(fila);
    });
}

//FUNCIONES AUXILIARES
const printCell = (element, fila) => {
  for (const prop in element) {
    let cell = generateCell();
    cell.innerHTML = element[prop];
    fila.appendChild(cell)
  }
}

const resetTable = (table) => {
    table.textContent = '';
  }

//MAPEOS

const headerTable = (table) => {
  let fila = generateRow();
  let array = ["Fecha", "Hora", "Nombre", "Requisito", "Fecha Limite"];
  array.forEach(element => {
    let elementoCabecera = generateHeaderCell();
    elementoCabecera.innerHTML = element;
    fila.appendChild(elementoCabecera);
  })
  table.appendChild(fila);
}

const firstMap = (element) => {
  return {

    dataPresentacion: element.dataPresentacion,
    horaPresentacion: element.horaPresentacion,
    name: element.companyData.company,
    requestPrimaryTitulation: element.requestPrimaryTitulation.name,
    fechaLimite: element.endDate
  }
}
