import * as data from '../data/offer.json';
import{headerTable, reprint, printCell, resetTable, generateCell, generateRow, generateHeaderCell, filtros} from './tableUtils.js';

//VARIABLES GLOBALES
const search = {};

const filterArray = ["dataPresentacion", "horaPresentacion", "companyData", "requestPrimaryTitulation", "endDate"];

const headerContent = {                       //variable extraible
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
  let tabla = document.getElementById('tablaPrincipal');
  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody');
  resetTable(tabla);
  filtros(tabla, filterArray, dataElements, reducidor);
  headerTable(tabla, headerContent, dataElements, reducidor);

  dataElements.reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();
      printCell(element, fila);
      tbody.appendChild(fila);
    });
  tabla.appendChild(tbody);
}

/**
 * Funcion que transforma a un array de objetos clave-valor
 * @param {Array} accum
 * @param {Object} param1
 */
const reducidor = (accum, {dataPresentacion, horaPresentacion, companyData, requestPrimaryTitulation, endDate}) => {
  accum.push({
    dataPresentacion,
    horaPresentacion,
    name: `${companyData.company}`,
    requestTitulacion: `${requestPrimaryTitulation.name}`,
    endDate
  });
  return accum;
}
