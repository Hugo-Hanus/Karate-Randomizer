import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { makeStyles } from "@fluentui/react-components";
import Catalog from "./Catalog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
function App() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <HashRouter basename="/">
        <Routes>
          <Route index={true} path="/Home" Component={Home} />
          <Route path="/Catalog" Component={Catalog} />
          <Route path="/Attack/:idAttack" />
          <Route path="/Defense/:idDefense" />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
