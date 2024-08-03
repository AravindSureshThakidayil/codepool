// import logo from './logo.svg';
// import { Octokit } from '@octokit/rest';
import octokit from './token';
import './App.css';


await octokit.request('GET /user', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

const username = "AravindSureshThakidayil";

function fetchRepoCount(username) {
  const url = `https://api.github.com/users/${username}`;  
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    return data.public_repos;
  })
  .catch(error => {
    // error = <em>There was a problem with the fetch operation: {error}</em>;
    console.error(error);
  });
}

function App() {
  var publicRepos = fetchRepoCount(username);
  
  // console.log(publicRepos);
  return (
    <>
    <div className="App">
      <nav>
        <h1> Github Profile </h1>
        <h3> {username} ({publicRepos} repositories) </h3>
      </nav>
    </div>
    {/* {error} */}
    <h3 id="contact">Contact</h3>
    </>
  );
}

export default App;
