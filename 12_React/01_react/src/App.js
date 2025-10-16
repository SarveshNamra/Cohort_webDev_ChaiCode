// This is classic React

const App = () => {
    return React.createElement(
        "div",
        {class: "test"},
        //[] // This can be array or This can be another element like below code React.createElement()
        React.createElement(
            "h1",
            {},
            "This is React version - 18"
        )
    );
};

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

// ReactDOM.render(React.createElement(App), container);