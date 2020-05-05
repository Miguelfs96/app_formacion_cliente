const resetMainContain = () => {
  document.getElementById("container").innerText = '';
}

/**
 * Genera los detalles de un objeto
 * @param {event} e
 * @param {array} data
 */
export const generarDetails = (e, data) => {
  resetMainContain();
  const idValue = e.currentTarget.firstChild.textContent;
  let elemento = data.find(element => (element.idCandidate == idValue || element.idInternshipOffer == idValue));
  const formulario = document.createElement('form'); //generacion de formulario
  generarImputs(elemento, formulario);
  generateNavegation(data);
  document.getElementById("container").appendChild(formulario);
}


const generateNavegation = (data) =>{
  const botones = ["Informacion Personal", "Titulaciones", "Direcciones"];
  let navBarB = document.createElement('nav');
  navBarB.setAttribute('id', 'navBarB');
  let listNavB = document.createElement('ul')
  listNavB.setAttribute('id', 'navForm');
  botones.forEach(element => {
    let elementNavB = document.createElement('li');
    let buttonNav = document.createElement('button');

    buttonNav.innerText = element;
    elementNavB.appendChild(buttonNav);
    listNavB.appendChild(elementNavB);
  })
  navBarB.appendChild(listNavB);
  document.getElementById("container").appendChild(navBarB);
}

/**
 * Funcion recursiva que genera el formulario completo
 * @param {object} object
 * @param {node} formulario
 */
const generarImputs = (object, formulario) =>{
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] != "object") {
      const divForm = document.createElement('div');
      const labelForm = document.createElement('label');
      const inputForm = document.createElement('input');
      labelForm.setAttribute('for', `${key}Form`);
      labelForm.innerText = `${key}`;

      inputForm.setAttribute('id', `${key}Form`);
      inputForm.setAttribute('name', `${key}`);
      inputForm.setAttribute('value', `${object[key]}`);
      divForm.appendChild(labelForm);
      divForm.appendChild(inputForm);
      formulario.appendChild(divForm);
    }
  }
  }
}
