import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

const chai = (prop) => {
    console.log(prop);
    
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, prop.name),
            React.createElement("p", {}, prop.cost)
        ]
    );
};
// This above whole chai is generic components/function which is reusable

const App2 = () => {
    return React.createElement(
        "div",
        {class: "test"},
        [
            React.createElement(
                "h1",
                {},
                "This is React version - 18"
            ),
            React.createElement(chai, {
                name: "Masala chai",
                cost: "200",
            }),
            React.createElement(chai, {
                name: "Chai",
                cost: "25",
            }),
        ]
    );
};

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);
root.render(React.createElement(App2));