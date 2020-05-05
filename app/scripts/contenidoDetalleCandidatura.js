const resetMainContain = () => {
  document.getElementById("container").innerText = '';
}

const botonesCandiatures = ["Informacion Personal", "Titulaciones", "Direcciones"];
const botonesOfertas = ["Informacion Oferta", "Company", "Primary Titulations", "Localizacion"];


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

  if (elemento.idCandidate != undefined){                                 //DISCUTIBLE
    generateNavegation(botonesCandiatures, elemento, formulario);
  }else{
    generateNavegation(botonesOfertas, elemento, formulario);
  }
  document.getElementById("container").appendChild(formulario);
}


const generateNavegation = (botones, data, formulario) =>{

  let navBarB = document.createElement('nav');
  navBarB.setAttribute('id', 'navBarB');
  let listNavB = document.createElement('ul')
  listNavB.setAttribute('id', 'navForm');
  botones.forEach(element => {
    let elementNavB = document.createElement('li');
    let buttonNav = document.createElement('button');

    switch (element){
      case 'Informacion Personal':
        buttonNav.onclick = () => generarImputs(data, formulario);
        break;
      case 'Titulaciones':
        buttonNav.onclick = () => generarImputs(data.titulacionPracticas, formulario);
        break;
      case 'Direcciones':
        buttonNav.onclick = () => generarImputs(data.primaryAddress, formulario);
        break;
      case 'Informacion Oferta':
        buttonNav.onclick = () => generarImputs(data, formulario);
        break;
      case 'Company':
        buttonNav.onclick = () => generarImputs(data.companyData, formulario);
        break;
      case 'Primary Titulations':
        buttonNav.onclick = () => generarImputs(data.requestPrimaryTitulation, formulario);
        break;
      case 'Localizacion':
        buttonNav.onclick = () => generarImputs(data.internshipLocation, formulario);
        break;
    }
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
  formulario.innerText = '';
  console.log(object)
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
