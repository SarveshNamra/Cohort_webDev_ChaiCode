import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

const chai = () => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, "This chai's h1 tag in array"),
            React.createElement("p", {}, "This chai's p tag in array")
        ]
    );
};

const App = () => {
    return React.createElement(
        "div",
        {class: "test"},
        [
            React.createElement(
                "h1",
                {},
                "This is React version - 18"
            ),
            React.createElement(chai),
            React.createElement(chai),
        ]
    );
};

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));