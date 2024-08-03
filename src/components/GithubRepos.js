import React, { useState, useEffect } from 'react';

const GitHubRepos = ({ username }) => {
  const [publicRepos, setPublicRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setPublicRepos(data.public_repos);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{"backgroundColor": "red", "color": "white"}}>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* <h1>{username}'s GitHub Repositories</h1> */}
      <p>{username} has {publicRepos} public repositories.</p>
    </div>
  );
};

export default GitHubRepos;
