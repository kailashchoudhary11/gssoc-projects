import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';

export default function GitHubLogin() {
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
      const response = await axios.get(`${BASE_URL}/github/login`);
      const { url } = response.data;
      window.open(url);
    } catch (error) {
      console.error('Error initiating GitHub OAuth:', error);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      axios.get(`${BASE_URL}/github/callback?code=${code}`);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  return (
    <div>
      <button onClick={initiateGitHubOAuth} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Login with GitHub
        </span>
      </button>
    </div>
  );
};

