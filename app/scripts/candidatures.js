import * as data from '../data/candidatures.json';

//GENERADORES DE NODOS
const generateHeaderCell = () => document.createElement('th');
const generateRow = () => document.createElement('tr');
const generateCell = () => document.createElement('td');

//FUNCION PRINCIPAL
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

const reducidor = (accum, {
  dataPresentacion,
  name,
  surname,
  dni,
  telf,
  email,
  titulacionPracticas
}) => {
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

const filtros = (table) => {
  let fila = generateRow();
  let array = ["dataPresentacion", "name", "dni", "telf", "email", "titulacionPracticas"]; // QUIZA HAYA QUE CAMBIARLO

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



const search = {};

const busqueda = (e) => {
  const key = e.target.name; //nombre de la propiedad

  const value = document.getElementById(key).value;

  search[key] = value;

  const result = data.candidatures.filter(candidate => {
    let isValid = true;
    Object.keys(search).forEach(key => {
      if (!new RegExp(`${search[key]}`, "i").test(candidate[key])) {
        isValid = false;
      }
    });
    return isValid;

  });
  reprint(result);

};


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

