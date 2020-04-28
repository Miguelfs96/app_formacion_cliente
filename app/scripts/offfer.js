import * as data from '../data/offer.json';

//GENERADORES DE NODOS
const generateHeaderCell = () => document.createElement('th');
const generateRow = () => document.createElement('tr');
const generateCell = () => document.createElement('td');


//VARIABLES GLOBALES
const search = {};

/**
 * Genera la tabla ofertas y la pinta por pantlla a partir del json
 * y la fila de busqueda
 */
export const generateTableOffers = () => {
  let tabla = document.getElementById('tablaPrincipal');
  let tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tableBody');
  resetTable(tabla);
  filtros(tabla);
  headerTable(tabla);

  data.internshipOffer.reduce(reducidor, [])
    .forEach(element => { //CAMBIAR POR FILTER CUANDO SE IMPLEMENTE EL FILTRADO
      let fila = generateRow();
      printCell(element, fila);
      tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);
}

/**
 * Genera una celda y la agrega al nodo fila
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
   * Funcion que transforma a un array de objetos clave-valor
   * @param {Array} accum
   * @param {Object} param1
   */
const reducidor = (accum, {dataPresentacion, horaPresentacion, companyData, requestPrimaryTitulation, endDate}) =>{
  accum.push({dataPresentacion, horaPresentacion, name:`${companyData.company}`, requestTitulacion:`${requestPrimaryTitulation.name}`, endDate});
  return accum;
}


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

/**
 * Genera la fila de filtros en una tabla y la agrega al nodo
 * @param {nodo} table
 */
const filtros = (table) => {
  let fila = generateRow();
  let array = ["dataPresentacion", "horaPresentacion", "companyData","requestPrimaryTitulation", "endDate"]; // QUIZA HAYA QUE CAMBIARLO O GENERARLOS DE OTRA FORMA

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

/**
 * Elastic search para buscar la por una o varias columnas
 * @param {evento} e
 */
const busqueda = (e) => {
  const key = e.target.name; //nombre de la propiedad

  const value = document.getElementById(key).value;

  search[key] = value;

  const result = data.internshipOffer.filter(offer=> {
    let isValid = true;
    Object.keys(search).forEach(key => {
      if (key === "companyData") {
        if (!new RegExp(`${search[key]}`, "i").test(offer[key].company)) {
          isValid = false;
        }
      } else if (key === "requestPrimaryTitulation"){
          if (!new RegExp(`${search[key]}`, "i").test(offer[key].name)) {
            isValid = false;
          }
      }else if (!new RegExp(`${search[key]}`, "i").test(offer[key])) {
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
