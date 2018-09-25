
//dichiarazione dell'oggetto con controllo se esiste gia un elemento nel local storage
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: [],
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

//when the document is ready...
$(document).ready(function(){
  renderToDoList();//render list items
});
//when you click on add button or enter key
$('#button').click(addNew);
$(document).keypress(verifyKey);

function verifyKey(e){
  if(e.which == 13){
    addNew();
  }
}

function addNew(){
  var $value = $('#input').val();
  if ($value){
    buildElement($value, false);
    data.todo.push($value);
    dataObjectUpdated();
    console.log(data);
    $('#input').val("");
  }else{
    alert("inserisci un'attività!");
  }
}

function buildElement(text, completed){

  var list = (completed) ? $('#donelist'):$('#todolist');

  var $item = $('<li></li>');
  $item.text(text);

  var $buttons = $('<div></div>');
  $buttons.addClass('buttons');

  var $remove = $('<button></button>');
  $remove.html(removeSVG);
  $remove.addClass('remove');
  $remove.click(removeItem);

  var $complete = $('<button></button>');
  $complete.html(completeSVG);
  $complete.addClass('complete');
  $complete.click(completeItem);

  $($buttons).append($remove);
  $($buttons).append($complete);
  $($item).append($buttons);

  $(list).prepend($item);

}

function removeItem(){
  var $item = $(this).parents('li');
  var $list = $item.parent();
  var $id = $list.attr('id');
  var $value = $item.text();
  if ($id === 'todolist'){
    data.todo.splice(data.todo.indexOf[$value], 1);
  }else{
    data.completed.splice(data.completed.indexOf[$value], 1);
  }
  dataObjectUpdated();
  $item.remove();
  console.log(data);
}

function completeItem(){
  var $item = $(this).parents('li');
  var $list = $item.parent();
  var $id = $list.attr('id');
  var $value = $item.text();
  if ($id === 'todolist'){
    data.todo.splice(data.todo.indexOf[$value], 1);
    data.completed.push($value);
  }else{
    data.completed.splice(data.completed.indexOf[$value], 1);
    data.todo.push($value);
  }
  dataObjectUpdated();
  var target = ($id === 'todolist') ? $('#donelist'): $('#todolist');
  $item.detach();
  target.prepend($item);
  console.log(data);
}

function dataObjectUpdated(){
  localStorage.setItem("todoList", JSON.stringify(data));
}

function renderToDoList(){
 if (!data.todo.length && !data.completed.length) return;

 for (var i = 0; i < data.todo.length; i++){
   var value = data.todo[i];
   buildElement(value, false);
 }
 for (var j = 0; j < data.completed.length; j++){
   var value = data.completed[j];
   buildElement(value, true);
 }
}
