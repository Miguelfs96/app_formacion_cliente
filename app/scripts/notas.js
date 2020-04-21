const contEsq = document.getElementById("content-left");

const generateDiv = () => {
  return document.createElement('div')
};
const generateButton = () => {
  return document.createElement("button")
};


window.onload = () => {
  let container = generateDiv();
  let button = generateButton();
  let textInput = document.createElement('textarea');
  
  container.classList.add("editor");
  textInput.setAttribute("id", "newNote")
  button.setAttribute("id", "addNote");
  button.innerHTML = "Crear nota";


  button.addEventListener("click", (event) => addNote(textInput.value));

  container.appendChild(textInput);
  container.appendChild(button);
  contEsq.appendChild(container);
}


const addNote = (txt) => {
  let newNote = generateDiv();
  let button = generateButton();
  let text = document.createElement('p');

  button.hasAttribute("id", "btnDel");  
  button.innerHTML = "borrar";
  newNote.classList.add("note");
  text.setAttribute("id", "text");
  text.innerHTML = txt;

  button.addEventListener("click", (event) => removeNote(newNote));

  newNote.appendChild(text);
  contEsq.appendChild(newNote)
    .appendChild(button);
}


const removeNote = (element) => {
  let padre = element.parentNode;
  padre.removeChild(element);

}
