import './App.css';
import GitHubLogin from './components/GitHubLogin';
import Projects from './components/Projects';
import ThemeButton from './components/ThemeButton';
import { VITE_GH_TOKEN, VITE_REPO_OWNER, VITE_REPO_NAME } from './constants/baseUrl';
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import { ThemeProvider } from './contexts/theme';

function App() {
  const [stars, setStars] = useState(0);
  const [loadingStars, setLoadingStars] = useState(true);
  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    setThemeMode('dark');
  };
  const lightTheme = () => {
    setThemeMode('light');
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.remove('dark', 'light');
      htmlElement.classList.add(themeMode);
    }
  }, [themeMode]);
  

  useEffect(() => {
    const octokit = new Octokit({
      auth: VITE_GH_TOKEN
    });

    const getStars = async () => {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
          owner: VITE_REPO_OWNER,
          repo: VITE_REPO_NAME,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        setStars(response.data.stargazers_count);
      } catch (error) {
        console.error("Error fetching stars: ", error);
      } finally {
        setLoadingStars(false);
      }
    };

    getStars();
  }, []);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className='flex p-5 gap-5 flex-col dark:bg-gray-900 bg-white text-black dark:text-white'>
        <div className='flex justify-between items-center'>
          <GitHubLogin />
          <button type="button" className="flex justify-center items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <IoStarSharp /> {" "} {loadingStars ? 'Loading...' : stars}
          </button>
          <ThemeButton />
        </div>
        <Projects />
        <footer className="p-4 bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200 rounded-md shadow-md text-lg">
          <div className="container mx-auto text-center">
            <p className="text-lg">
              Projects data is copied from the official GSSoC site.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
