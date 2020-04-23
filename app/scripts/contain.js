import * as data from '../data/candidatures.json';

const generateTable = () => {
  let table = document.createElement('table');
  table.classList.add("tablePrincipal");
  return table;
}
const generateRow = () => document.createElement('tr');
const generateCell = () => document.createElement('td');

const container = document.getElementById('container');

export const generateTableCandidates = () => {

  let tabla = generateTable();

  data.candidatures.map(element =>  firstMap(element))
    .forEach(element => { //CAMBIAR POR FILTER CUANDO SE IMPLEMENTE EL FILTRADO
      let fila = generateRow();
      console.log(element);
      getProperties(element, fila);
      tabla.appendChild(fila);
    });

  container.appendChild(tabla);
}

const getProperties = (element, fila) => {
  for (const prop in element) {
    let cell = generateCell();
    cell.innerHTML = element[prop];
    fila.appendChild(cell)
  }
}

//Mapeos

const firstMap = (element) => {
  return {
    idCandidature: element.idCandidature,
    idCandidate: element.idCandidate,
    dataPresentacion: element.dataPresentacion,
    horaPresentacion: element.horaPresentacion,
    name: element.name,
    surname: element.surname,
    surname2: element.surname2,
    dni: element.dni,
    birthDate: element.birthDate,
    telf: element.telf,
    email: element.email,
    titulacion: element.titulacionPracticas.name
  }
}
