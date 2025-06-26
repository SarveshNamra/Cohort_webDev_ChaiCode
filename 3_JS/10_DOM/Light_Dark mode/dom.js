function changeColor(Color){
    document.body.style.backgroundColor = Color;
}
// The 'color' parameter here is an input to the function — it doesn't tell you what the current color already is on the page.

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

/*
Step 1: Read the current background color

currentColor = document.body.style.backgroundColor;

You are checking:

Is the current color 'white'?
Or is there no color set yet?
🔍 This is the decision point.

Step 2: Use if-else to decide the next color

IF currentColor is 'white' OR empty:
    ➡️ changeColor('black')
    ➡️ Set button text to "Light Mode"

ELSE:
    ➡️ changeColor('white')
    ➡️ Set button text to "Dark Mode"
✅ So here, you're making a choice: “Based on what it is now, what should I change it to?”

Step 3: The changeColor(color) function

function changeColor(color) {
    document.body.style.backgroundColor = color;
}

This function does one job:

It applies the color you chose in Step 2.

It doesn't decide what color to use — that logic stays outside the function, in the if-else block.
*/