import { HashRouter, Routes, Route } from "react-router-dom";

import ShowCase from "pages/ShowCase";
import Page404 from "pages/Page404";

import logo from "./logo.svg";
import "./App.css";

function Home(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dinoin say HI!</p>
        <a
          className="App-link"
          href="/#/ShowCase"
          // target="_blank"
          rel="go th the show"
        >
          Go to the show!
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ShowCase" element={<ShowCase />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
