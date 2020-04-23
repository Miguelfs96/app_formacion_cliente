import {editor} from './notas.js';
import {generateTableCandidates} from './contain';

window.onload = () =>{
    editor();
    generateTableCandidates();
}

console.log('\'Allo \'Allo!');

