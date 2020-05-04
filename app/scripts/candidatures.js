import * as data from '../data/candidatures.json';
import{headerTable, reprint, printCell, resetTable, generateCell, generateRow, generateHeaderCell, filtros} from './tableUtils.js';
import{generarDetails} from './contenidoDetalleCandidatura.js'


//VARIABLES GLOBALES
const search = {};

const headerContent = {           //variable extraible
  idCandidate: "ID",
  dataPresentacion: "Fecha",
  name: "Nombre",
  dni: "DNI",
  telf: "Tel",
  email: "Email",
  titulacionPracticas: "Titulo"
};

let filterArray = ["idCandidate", "dataPresentacion", "name", "dni", "telf", "email", "titulacionPracticas"]; // QUIZA HAYA QUE CAMBIARLO O GENERARLOS DE OTRA FORMA

const dataElements = data.candidatures;

/**
 * Genera la tabla candidatos y la pinta por pantalla a partir del json
 * y una fila de busqueda
 */
export const generateTableCandidates = () => {
  //let tabla = document.getElementById("tablaPrincipal");
  let container = document.getElementById('container');

  container.innerText = '';

  let tabla = document.createElement('table');
  tabla.setAttribute('id', "tablaPrincipal");
  container.appendChild(tabla);

  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody')
  resetTable(tabla);
  filtros(tabla, filterArray, dataElements, reducidor);
  headerTable(tabla, headerContent, dataElements, reducidor);

  dataElements
    .reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();
      // console.log(element);
      // fila.setAttribute("id", `${element.}`)
      fila.onclick = (e) => generarDetails(e, dataElements);
      printCell(element, fila);
      tbody.appendChild(fila);
    });
  tabla.appendChild(tbody);

  container.appendChild(tabla);
}

/**
 * Funcion que transforma un objeto a un headerContent de objetos clave-valor
 * @param  headerContent} accum
 * @param {Object} param1
 */
const reducidor = (accum, {idCandidate, dataPresentacion, name, surname, dni, telf, email, titulacionPracticas}) => {
  accum.push({
    idCandidate,
    dataPresentacion,
    name: `${name} ${surname}`,
    dni,
    telf,
    email,
    titulacion: `${titulacionPracticas.name}`
  });
  return accum;
}
