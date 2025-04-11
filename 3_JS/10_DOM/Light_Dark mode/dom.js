function changeColor(Color){
    document.body.style.backgroundColor = Color;
}

const themeButton = document.getElementById('theme-button');

themeButton.addEventListener('click', () => {
    console.log();

    const currentColor = document.body.style.backgroundColor;

    if(currentColor==='white' || !currentColor){
        changeColor('black');
        themeButton.innerText = 'Light Mode';
    }
    else{
        changeColor('white');
        themeButton.innerText = 'Dark Mode';
    }
});