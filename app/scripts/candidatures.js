import * as data from '../data/candidatures.json';
import{headerTable, reprint, printCell, resetTable, generateCell, generateRow, generateHeaderCell, filtros} from './tableUtils.js';

//VARIABLES GLOBALES
const search = {};

const headerContent = {           //variable extraible
  dataPresentacion: "Fecha",
  name: "Nombre",
  dni: "DNI",
  telf: "Tel",
  email: "Email",
  titulacionPracticas: "Titulo"
};

let filterArray = ["dataPresentacion", "name", "dni", "telf", "email", "titulacionPracticas"]; // QUIZA HAYA QUE CAMBIARLO O GENERARLOS DE OTRA FORMA

const dataElements = data.candidatures;

/**
 * Genera la tabla candidatos y la pinta por pantalla a partir del json
 * y una fila de busqueda
 */
export const generateTableCandidates = () => {
  let tabla = document.getElementById("tablaPrincipal");
  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody')
  resetTable(tabla);
  filtros(tabla, filterArray, dataElements, reducidor);
  headerTable(tabla, headerContent, dataElements, reducidor);

  dataElements
    .reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();
      printCell(element, fila);
      tbody.appendChild(fila);
    });
  tabla.appendChild(tbody);
}

/**
 * Funcion que transforma un objeto a un headerContent de objetos clave-valor
 * @param  headerContent} accum
 * @param {Object} param1
 */
const reducidor = (accum, {dataPresentacion, name, surname, dni, telf, email, titulacionPracticas}) => {
  accum.push({
    dataPresentacion,
    name: `${name} ${surname}`,
    dni,
    telf,
    email,
    titulacion: `${titulacionPracticas.name}`
  });
  return accum;
}
