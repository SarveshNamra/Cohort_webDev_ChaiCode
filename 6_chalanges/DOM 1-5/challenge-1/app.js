/**
 * Write your challenge solution here
 */
const toDoToggling = document.getElementById('toggleButton');
const changStatus = document.getElementById('status');
const seeStatus = document.getElementById('bulb');

toDoToggling.addEventListener('click', () =>{
  if(seeStatus.classList.contains('off')){
    document.body.classList.add('dark-mode');
    changStatus.innerHTML = 'Status: On';
    seeStatus.classList.remove('off');
    seeStatus.classList.add('on');
  }
  else{
    document.body.classList.remove('dark-mode');
    seeStatus.classList.remove('on');
    seeStatus.classList.add('off');
    changStatus.innerHTML = 'Status: Off';

  }
});