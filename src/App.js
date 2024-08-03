// import logo from './logo.svg';
import { Octokit } from '@octokit/rest';
import './App.css';


octokit.request("GET /");

function App() {
  return (
    <>
    <div className="App">
      <navbar> <h1> Github Profile </h1> 
      <div>
        <div className="link">Contact us
          <div className="dropdown">
            <p><a href="#contact">Sourav S K</a></p>
            <p>Aravind Suresh</p>
          </div>
        </div>
        <div className="link">About us
          <div className="dropdown">
            <p>Sourav S K</p>
            <p>Aravind Suresh</p>
          </div>
        </div>
      </div>
      </navbar>
    </div>
    <h3 id="contact">Contact</h3>
    </>
  );
}

export default App;
