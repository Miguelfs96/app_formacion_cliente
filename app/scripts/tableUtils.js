
export const generateHeaderCell = () => document.createElement('th');
export const generateRow = () => document.createElement('tr');
export const generateCell = () => document.createElement('td');

//VARIABLES GLOBALES
let search = {};



/**
 * Genera el encabezado de la tabla y no agrega al nodo
 * @param {Node} table
 */
export const headerTable = (table, headerContent, dataElements, reducidor) => {
  let fila = generateRow();
  search = {};

  for (const key in headerContent) {
    if  (headerContent.hasOwnProperty(key)) {

      let elementoCabecera = generateHeaderCell();
      elementoCabecera.innerText = headerContent[key];
      let botonSort = document.createElement('button');
      botonSort.innerText = "sort";
      botonSort.setAttribute('name', `${key}`)
      botonSort.onclick = (e) => sortTable(e, dataElements, reducidor);

      elementoCabecera.appendChild(botonSort);

      fila.appendChild(elementoCabecera);
    }
  }

  table.appendChild(fila);
}

/**
 * Repinta el cuerpo de la tabla a partir de un headerContent de objetos
 * @param  {Array} resultados
 */
export const reprint = (resultados, reducidor) => {
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
export const printCell = (element, fila) => {
  for (const prop in element) {
    let cell = generateCell();
    cell.innerText = element[prop];
    fila.appendChild(cell)
  }
}

/**
 * Ordena la tabla por columna
 * @param {event} e
 */
const sortTable = (e, dataElements, reducidor) => {
  const key = e.target.name;

  let dataSorted = dataElements.sort( (a, b) =>{
     if (a[key] > b[key]) return 1;
     if (a[key] < b[key]) return -1;

     //EXTRAIBLE??
     if (key === "titulacionPracticas"){
      if (a[key].name > b[key].name) return 1;
      if (a[key].name < b[key].name) return -1;
     }
     //EXTRAIBLE??
     if (key === "companyData"){
       if (a[key].company > b[key].company) return 1;
       if (a[key].company < b[key].company) return -1;
     }

     //EXTRABLE??
     if (key === "requestPrimaryTitulation"){
       if (a[key].name > b[key].name) return 1;
       if (a[key].name < b[key].name) return -1
     }
     return 0;
  })
  console.log(dataSorted)
  reprint(dataSorted, reducidor);
}

/**
 * Resetea la tabla por completo
 * @param {Node} table
 */
export const resetTable = (table) => {
  table.textContent = '';
}

/**
 * Genera la fila de filtros en una tabla y la agrega al nodo
 * @param {nodo} table
 */
export const filtros = (table, filterArray, dataElements, reducidor) => {
  let fila = generateRow();
  // let array = ["dataPresentacion", "horaPresentacion", "companyData", "requestPrimaryTitulation", "endDate"]; // QUIZA HAYA QUE CAMBIARLO O GENERARLOS DE OTRA FORMA

  const generateInput = () => document.createElement('input')

  filterArray.forEach(element => {
    let elementBusqueda = generateCell();
    let elementInput = generateInput()
    elementInput.setAttribute('name', `${element}`);
    elementInput.setAttribute('id', `${element}`);
    elementInput.onkeyup = (e) => busqueda(e, dataElements, reducidor);


    elementBusqueda.appendChild(elementInput);
    fila.appendChild(elementBusqueda)
  })

  table.appendChild(fila);
}
/**
 * Elastic search para buscar la por una o varias columnas
 * @param {evento} e
 */
const busqueda = (e, dataElements, reducidor) => {
  const key = e.target.name; //nombre de la propiedad

  const value = document.getElementById(key).value;

  search[key] = value;

  const result = dataElements.filter(element => {
    let isValid = true;
    Object.keys(search).forEach(key => {
        if (key === "companyData") {     //EXTRAIBLE??
          if (!new RegExp(`${search[key]}`, "i").test(element[key].company)) {
            isValid = false;
          }
        } else
        if (key === "requestPrimaryTitulation") {   //ESTRAIBLE??
          if (!new RegExp(`${search[key]}`, "i").test(element[key].name)) {
            isValid = false;
          }
        }else
        if (key === "titulacionPracticas"){   //EXTRAIBLE??
          console.log("im in")
         if (!new RegExp(`${search[key]}`, "i").test(element[key].name)) {
          isValid = false;
        }
      }else
       if (!new RegExp(`${search[key]}`, "i").test(element[key])) {
        isValid = false;
      }
    });
    return isValid;

  });
  reprint(result,reducidor);
};
