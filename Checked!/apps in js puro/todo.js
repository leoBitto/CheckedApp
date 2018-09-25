//dichiarazione dell'oggetto con controllo se esiste gia un elemento nel local storage
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: [],
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

//renderTodoList();
// richiamo alla funzione di rendering degli item nel local storage, se presenti

//event listener per bottone aggiungi
// se c'è il testo nel campo input allora inserisci il testo ricevuto nella todolist
function addnew(){
  var value = document.getElementById('input').value;
  if(value){
    addItem(value);
  }else{
    alert("Inserisci un'attività");
  }
}

//funzione che gestisce l'informazione inserita dall'utente
function addItem (value){
  newElement(value, false);
  data.todo.push(value);
  dataObjectUpdated();
  document.getElementById("input").value = "";
}

//funzione di rendering
function renderTodoList() {
  // il metodo length ritorna falso se l'array è vuoto, lo facciamo cambiare da falso a vero con ! e se sono vuoti entrambi gli array ferma la funzione
  if(!data.todo.length && !data.completed.length) return;
  //cicli che servono a passare in rassegna gli elementi che sono nel local storage
  for (var i = 0; i < data.todo.length; i++){
    var value = data.todo[i];
    newElement(value, false);
  }
  for (var j = 0; j < data.completed.length; j++){
    var value = data.completed[j];
    newElement(value, true);
  }
}
//conversione in stringa con JSON e inserimento dell'oggetto data con nome todolist
function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}
// funzione che permette di eliminare un elemento dalla lista
function removeItem(){
  var item = this.parentNode.parentNode; //variabile che si riferisce al li
  var list = item.parentNode; //variabile che si riferisce alla lista ul
  var id = list.id; //variabile che si riferisce all'id della lista
  var value = item.innerText;// variabile che indica il testo del list item su cui viene clicccato elimina

  if( id === 'todolist'){
  // dall'array todo rimuovi un elemento con indice dell'elemento da eliminare
   data.todo.splice(data.todo.indexOf(value), 1);
   }else{
    // dall'array completed rimuovi un elemento con indice dell'elemento da eliminare
   data.completed.splice(data.completed.indexOf(value), 1);
 }
 //aggiorna l'oggetto
  dataObjectUpdated();
  //rimuovi dalla lista renderizzata il list item
  list.removeChild(item);
}
//funzione che gestisce il pulsante di completamento
function completeItem(){
 var item = this.parentNode.parentNode; //variabile che si riferisce al li
 var list = item.parentNode; //variabile che si riferisce alla lista ul
 var id = list.id; //variabile che si riferisce all'id della lista
 var value = item.innerText; //variabile che rappresenta il testo nel li
 //gestione dell'oggetto data
 if( id === 'todolist'){
  // dall'array todo rimuovi un elemento con indice dell'elemento da spostare
  data.todo.splice(data.todo.indexOf(value), 1);
  // inserisci l'elemento rimosso dall'array todo nell'array completed
  data.completed.push(value);
 }else{// sennò fai il contrario
  // dall'array completed rimuovi un elemento con indice dell'elemento da spostare
  data.completed.splice(data.completed.indexOf(value), 1);
  // inserisci l'elemento rimosso dall'array completed nell'array todo
  data.todo.push(value);
  }
 //aggiorna l'oggetto
  dataObjectUpdated();
 // controlla se il list item deve essere inserito in completed o in todo
 var target = (id === 'todolist') ? document.getElementById('donelist'):document.getElementById('todolist');

  list.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

}
// Function that Create a new list item when clicking on the Add button
function newElement(text, completed) {
  //if decisionale su dove mettere il list item
   var list = (completed) ? document.getElementById('donelist'):document.getElementById('todolist');

  //create a new list item
  var item = document.createElement('li');
  item.innerText = text;

  //creazione del div che contiene i bottoni
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //bottone di rimozione
  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;
  //event click to remove item
  remove.addEventListener('click', removeItem);

  //bottone di completamento
  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;
  //event click to complete item
  complete.addEventListener('click', completeItem);

  //"montaggio" del list item
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  //inserisci il nuovo elemento in cima alla lista delle cose da fare
  list.insertBefore(item, list.childNodes[0]);

}
