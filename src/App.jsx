import Map from "./Map";

function App() {
  return (
    <div className="m-5">
      <nav className ="navbar navbar-expand-lg navbar-light bg-light mb-5" >
        <div className="container d-flex justify-content-between align-items-center">
        <h1 className="display-1">mappa di uccelli</h1>
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item">
            <a className="nav-link" href="#">Chi siamo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contatti</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Servizi</a>
          </li>
        </ul>
        </div>
      </nav>
      <Map />
    </div>
  );
}

export default App;

