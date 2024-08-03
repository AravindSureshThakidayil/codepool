// import logo from './logo.svg';
// import { Octokit } from '@octokit/rest';
import React from 'react';
// import octokit from './token';
import './App.css';
import GitHubRepos from './components/GithubRepos';
import GitHubCommits from './components/Githubcommits';


// await octokit.request('GET /user', {
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })

const username = "AravindSureshThakidayil";

function App() {
  // var publicRepos = fetchRepoCount(username);
  
  // console.log(publicRepos);
  return (
    <>
      <div className="App">
        <nav>
          <h1> Github Profile </h1>
          <h3> {username} </h3>
        </nav>
        
        <GitHubRepos username={username}></GitHubRepos>
        <GitHubCommits username={username} repo="DotsAndBoxes"></GitHubCommits>
      </div>
    </>
  );
}

export default App;
