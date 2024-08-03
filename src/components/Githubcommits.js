import React, { useState, useEffect } from 'react';

const GitHubCommits = ({ username, repo }) => {
  const [commitCount, setCommitCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);
      setError(null);

      try {
        let commits = [];
        let page = 1;
        let response;

        do {
          response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=100&page=${page}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          commits = commits.concat(data);
          page += 1;
        } while (response.length > 0);

        setCommitCount(commits.length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username, repo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ backgroundColor: 'red', color: 'white' }}>Error: {error.message}</div>;
  }

  return (
    <div>
      <p>
        The repository {username}/{repo} has {commitCount} commits.
      </p>
    </div>
  );
};

export default GitHubCommits;
