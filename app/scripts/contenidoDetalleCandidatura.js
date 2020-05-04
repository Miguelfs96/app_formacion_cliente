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

  document.getElementById("container").appendChild(formulario);
}

/**
 * Funcion recursiva que genera el formulario completo
 * @param {object} object
 * @param {node} formulario
 */
const generarImputs = (object, formulario) =>{
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      if (typeof element=== "object") {
        generarImputs(element, formulario);
      }else{
      const labelForm = document.createElement('label');
      const inputForm = document.createElement('input');
      labelForm.setAttribute('for', `${key}Form`);
      labelForm.innerText = `${key}`;
      formulario.appendChild(labelForm);

      inputForm.setAttribute('id', `${key}Form`)
      inputForm.setAttribute('name', `${key}`);
      inputForm.setAttribute('value', `${object[key]}`);
      formulario.appendChild(labelForm);
      formulario.appendChild(inputForm);
    }}
  }
}
