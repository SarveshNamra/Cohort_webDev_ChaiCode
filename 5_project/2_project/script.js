const toCreate = document.querySelector('.to-create');
const addBtn = document.getElementById('addBtnContainer');
const colorOption = document.querySelectorAll('.color-option');
const colorInput = document.querySelector('.toget-input');

// When user clicks a color from the dropdown, set the input's value
colorOption.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();  // prevent anchor navigation
    const selectedColor = option.getAttribute('data-color');
    colorInput.value = selectedColor;
  });
});

// When user clicks 'Create', generate a new button
toCreate.addEventListener('click',() => {
  const color = colorInput.value.toLowerCase().trim();

  if(!color || !['red','green','blue'].includes(color)){
    alert("Are you sure you want to add new color");
  }

  const newBtn = document.createElement('button');
  newBtn.innerText =  color.charAt(0).toUpperCase() + color.slice(1);
  newBtn.style.backgroundColor = color;
  newBtn.style.cursor = 'pointer';
  newBtn.style.padding = '10px';
  newBtn.style.margin = '10px';
  newBtn.style.color = 'white';
  newBtn.style.borederRadius = '5px 5px';
  
  // On click, change background color of page
  newBtn.addEventListener('click',() => {
    document.body.style.backgroundColor = color;
  })

  addBtn.appendChild(newBtn);
})

// Using closer function.

/*function createBtn() {
  const color = colorInput.value.toLowerCase().trim();

  if (!color || !['red', 'green', 'blue'].includes(color)) {
    alert('Please select a valid color');
    return;
  }

  const newBtn = document.createElement('button');
  newBtn.innerText = color.charAt(0).toUpperCase() + color.slice(1);
  newBtn.style.backgroundColor = color;
  newBtn.style.color = 'white';
  newBtn.style.margin = '5px';
  newBtn.style.padding = '10px';
  newBtn.style.border = 'none';
  newBtn.style.borderRadius = '5px';
  newBtn.style.cursor = 'pointer';

  // Closure: create a function that captures `color`
  function createColorChanger(capturedColor) {
    return function() {
      document.body.style.backgroundColor = capturedColor;
    };
  }

  // Apply closure to event handler
  newBtn.addEventListener('click', createColorChanger(color));

  addBtn.appendChild(newBtn);
}
*/