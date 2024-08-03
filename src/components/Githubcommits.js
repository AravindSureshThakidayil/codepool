import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import octokit from '../token';

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
          response = await octokit.rest.repos.listCommits({
            owner: username,
            repo,
            per_page: 100,
            page,
          });

          commits = commits.concat(response.data);
          page += 1;
        } while (response.data.length > 0);

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