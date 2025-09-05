let string = "";
const buttons = document.getElementsByClassName('btn');
const toShow = document.getElementById('show');
//const toInput = document.getElementsByClassName('to-input');

Array.from(buttons).forEach((e1) => {
    e1.addEventListener('click', (e2) => {
        if(e2.target.innerHTML == '='){
            string = eval(string);
            toShow.value = string;
        }
        else if(e2.target.innerHTML == 'AC'){
            string = '';
            toShow.value = string;
        }
        else if(e2.target.innerHTML == 'BC'){
            string = string.slice(0,-1);
            toShow.value = string;
        }

        else{
            console.log(e2.target.textContent);
            string += e2.target.textContent;
            toShow.value = string;
        }
    });
});