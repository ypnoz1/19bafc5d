import ReactDOM from "react-dom";
import Header from "./components/header/Header.jsx";
import Calls from "./components/call-history/calls/Calls.jsx";
import ContextualizeMenu from "./context/menu/ContextualizeMenu.jsx";
import "./App.css";

const App = () => {
  return (
    <ContextualizeMenu>
      <div className="container">
        <Header />
        <div className="container-view">
          <Calls />
        </div>
      </div>
    </ContextualizeMenu>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
