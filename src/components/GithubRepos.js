import React, { useState, useEffect } from "react";

const GitHubRepos = ({ username }) => {
  const [publicRepos, setPublicRepos] = useState(null);
  const [total_Stars,setStars] = useState(0);
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
    <div class="flex-container" style={{display:  "flex"}}>
      <div style={{backgroundColor: "blue", width: "300px", borderRadius: "100px", margin: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}}>
      <div style={{
        margin:"20px", width: "100px", height:"100px", borderRadius:"100%", backgroundColor:"white", placeContent:"center", fontSize:"2em", color:"blue", fontWeight: "900"
      }}>
        {publicRepos}
      </div>
      </div>
      <div style={{display: "grid"}}>
      {repoList.length > 0 ? (
        repoList.map((repo) => (
          <div
            // class="flex-items"
            key={repo.id}
            style={{
              // minWidth:"25vw", maxWidth: "25vw",
              width: "25%",
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f5f9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            <div className="flex-container-col">
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
            </div>
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
    </div>
  );
};

export default GitHubRepos;
