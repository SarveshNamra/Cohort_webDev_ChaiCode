function updateClock() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    
    const now = new Date();
    const hours = now.getHours() % 12 || 12;   // By truthy and falsey value
    
    const minutes = now.getMinutes();
    // const minutes = now.getMinutes().toString().padStart(2,"0");
    const min = minutes < 10 ? `0${minutes}` : `${minutes}`;
    
    const seconds = now.getSeconds().toString().padStart(2,"0");
    
    const ampm = now.getHours() >=12 ? "PM" : "AM" ;
    
    timeElement.textContent = `${hours}:${min}:${seconds}:${ampm}`;    

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    dateElement.textContent = now.toLocaleDateString(undefined,options);
    /*  agar aapko default timezone ko reference dayna hai to 'undefined' use karo 
        or aggar aapko timezone patta hai to direct bhi day sakatay hao like "de-DE",etc.*/
}

setInterval(updateClock, 1000);

// The function must get loaded on the time of page loade or reloade
updateClock();
// window.onload(updateClock());