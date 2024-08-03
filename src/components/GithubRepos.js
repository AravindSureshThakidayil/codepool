import React, { useState, useEffect } from "react";

const GitHubRepos = ({ username }) => {
  const [publicRepos, setPublicRepos] = useState(null);
  const [repoList, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url_repo_count = `https://api.github.com/users/${username}`;
    const url_repo_list = `https://api.github.com/users/${username}/repos`;

    const fetchRepoData = async () => {
      try {
        const repoListResponse = await fetch(url_repo_list);
        if (!repoListResponse.ok) {
          throw new Error("Failed to fetch repository list");
        }
        const repoListData = await repoListResponse.json();
        setRepos(repoListData);

        const repoCountResponse = await fetch(url_repo_count);
        if (!repoCountResponse.ok) {
          throw new Error("Failed to fetch repository count");
        }
        const repoCountData = await repoCountResponse.json();
        setPublicRepos(repoCountData.public_repos);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <p>
        {username} has {publicRepos} public repositories.
      </p>
      {repoList.length > 0 ? (
        repoList.map((repo) => (
          <div
            key={repo.id}
            style={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            <h5
              style={{
                marginBottom: "8px",
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              {repo.name}
            </h5>
            <p style={{ fontSize: "1rem", color: "#374151" }}>
              {repo.description}
            </p>
            <a
              href={repo.html_url}
              style={{ color: "#3b82f6", textDecoration: "underline" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
            </a>
          </div>
        ))
      ) : (
        <p>No public repositories found.</p>
      )}
    </div>
  );
};

export default GitHubRepos;
