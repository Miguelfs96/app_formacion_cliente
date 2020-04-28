import * as data from '../data/candidatures.json';

//GENERADORES DE NODOS
const generateHeaderCell = () => document.createElement('th');
const generateRow = () => document.createElement('tr');
const generateCell = () => document.createElement('td');

//VARIABLES GLOBALES
const search = {};

/**
 * Genera la tabla candidatos y la pinta por pantalla a partir del json
 * y una fila de busqueda
 */
export const generateTableCandidates = () => {
  let tabla = document.getElementById("tablaPrincipal");
  let tbody = document.createElement('tbody');
  tbody.setAttribute('id','tableBody')
  resetTable(tabla);
  filtros(tabla);
  headerTable(tabla);

  data.candidatures
    .reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();
      printCell(element, fila);
      tbody.appendChild(fila);
    });
  tabla.appendChild(tbody);
}

/**
 * Elastic search para buscar la por una o varias columnas
 * @param {evento} e
 */
const busqueda = (e) => {
  const key = e.target.name; //nombre de la propiedad

  const value = document.getElementById(key).value;

  search[key] = value;

  const result = data.candidatures.filter(candidate => {
    let isValid = true;
    Object.keys(search).forEach(key => {
      if (key === "titulacionPracticas") {
        if (!new RegExp(`${search[key]}`, "i").test(candidate[key].name)) {
          isValid = false;
        }
      }else if (!new RegExp(`${search[key]}`, "i").test(candidate[key])) {
        isValid = false;
      }
    });
    return isValid;

  });
  reprint(result);
};

/**
 * Repinta el cuerpo de la tabla a partir de un array de objetos
 * @param {Array} resultados
 */
const reprint = (resultados) => {
  let tbody = document.getElementById('tableBody');
  tbody.innerText = '';

   resultados.reduce(reducidor, [])
    .forEach(element => {
      let fila = generateRow();
      printCell(element, fila);
      tbody.appendChild(fila);
    });

}


/**
 * Genera una celda y la agrrega al nodo fila
 * @param {Object} element
 * @param {Node} fila
 */
const printCell = (element, fila) => {
  for (const prop in element) {
    let cell = generateCell();
    cell.innerHTML = element[prop];
    fila.appendChild(cell)
  }
}

/**
 * Resetea la tabla por completo
 * @param {Node} table
 */
const resetTable = (table) => {
  table.textContent = '';
}

/**
 * Funcion que transforma un objeto a un array de objetos clave-valor
 * @param {Array} accum
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

/**
 * Genera el encabezado de la tabla y no agrega al nodo
 * @param {Node} table
 */
const headerTable = (table) => {
  let fila = generateRow();
  let array = ["Fecha", "Nombre", "DNI", "Tel", "Email", "Titulo"];
  array.forEach(element => {
    let elementoCabecera = generateHeaderCell();
    elementoCabecera.innerHTML = element;
    fila.appendChild(elementoCabecera);
  })
  table.appendChild(fila);
}


/**
 * Genera la fila de filtros en una tabla y la agrega al nodo
 * @param {nodo} table
 */
const filtros = (table) => {
  let fila = generateRow();
  let array = ["dataPresentacion", "name", "dni", "telf", "email", "titulacionPracticas"]; // QUIZA HAYA QUE CAMBIARLO O GENERARLOS DE OTRA FORMA

  const generateInput = () => document.createElement('input')

  array.forEach(element => {
    let elementBusqueda = generateCell();
    let elementInput = generateInput()
    elementInput.setAttribute('name', `${element}`);
    elementInput.setAttribute('id', `${element}`);
    elementInput.onkeyup = (e) => busqueda(e);


    elementBusqueda.appendChild(elementInput);
    fila.appendChild(elementBusqueda)
  })

  table.appendChild(fila);
}
