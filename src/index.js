import ReactDOM from "react-dom";
import "./css/main.css";
import App from "./App.jsx";

ReactDOM.render(
  <Provider store={store}>
    <Router basename={"/"}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
