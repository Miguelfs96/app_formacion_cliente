import * as data from '../data/offer.json';
import{headerTable, reprint, printCell, resetTable, generateCell, generateRow, generateHeaderCell, filtros} from './tableUtils.js';
import{generarDetails} from './contenidoDetalleCandidatura.js'

//VARIABLES GLOBALES
const search = {};

const filterArray = ["idInternshipOffer", "dataPresentacion", "horaPresentacion", "companyData", "requestPrimaryTitulation", "endDate"];

const headerContent = {
  idInternshipOffer: "ID OFFerta",                      //variable extraible
  dataPresentacion: "Fecha",
  horaPresentacion: "Hora",
  companyData: "Nombre",
  requestPrimaryTitulation: "Requisito",
  endDate: "Fecha Limite"
};

const dataElements = data.internshipOffer;

/**
 * Genera la tabla ofertas y la pinta por pantlla a partir del json
 * y la fila de busqueda
 */
export const generateTableOffers = () => {
  let container = document.getElementById('container');

  container.innerText = '';

  let tabla = document.createElement('table');
  tabla.setAttribute('id', "tablaPrincipal");
  container.appendChild(tabla);

  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody');
  resetTable(tabla);
  filtros(tabla, filterArray, dataElements, reducidor);
  headerTable(tabla, headerContent, dataElements, reducidor);

  dataElements.reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();

      fila.onclick = (e) => generarDetails(e, dataElements);
      printCell(element, fila);
      tbody.appendChild(fila);
    });
  tabla.appendChild(tbody);

  container.appendChild(tabla);
}

/**
 * Funcion que transforma a un array de objetos clave-valor
 * @param {Array} accum
 * @param {Object} param1
 */
const reducidor = (accum, {idInternshipOffer, dataPresentacion, horaPresentacion, companyData, requestPrimaryTitulation, endDate}) => {
  accum.push({
    idInternshipOffer,
    dataPresentacion,
    horaPresentacion,
    name: `${companyData.company}`,
    requestTitulacion: `${requestPrimaryTitulation.name}`,
    endDate
  });
  return accum;
}
