import { useEffect } from 'react';
import axios from 'axios';

const GitHubLogin = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log("The code is", code)

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const initiateGitHubOAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/github/login');
      const { url } = response.data;
      // Open the GitHub OAuth consent screen in a new window or tab
      window.open(url);
    } catch (error) {
      console.error('Error initiating GitHub OAuth:', error);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.get(`http://localhost:8000/github/callback?code=${code}`);
      // Handle the response from the backend (access token or user information)
      const { token, user } = response.data;
      // Store the token or user information in the state or local storage
      // Redirect the user or update the UI accordingly
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  return (
    <div>
      <button onClick={initiateGitHubOAuth}>Login with GitHub</button>
    </div>
  );
};

export default GitHubLogin;
