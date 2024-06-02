import './App.css'
import GitHubLogin from './components/GitHubLogin'
import Projects from './components/Projects'
import {VITE_GH_TOKEN,VITE_REPO_OWNER,VITE_REPO_NAME} from './constants/baseUrl'
import { Octokit } from "@octokit/core";
import {  useState } from "react";
import { IoStarSharp } from "react-icons/io5";

function App() {
  const [stars,setStars] = useState(0);
  const octokit = new Octokit({
    auth: VITE_GH_TOKEN
  })
  const getStars = async()=>{
    const repoStars = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
      owner: VITE_REPO_OWNER,
      repo: VITE_REPO_NAME,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log("Stars: ", repoStars.data.length);
    setStars(repoStars.data.length);
  }
  getStars();
  return (
    <div className='flex p-5 gap-5 flex-col'>
      <div className='flex'>
        <GitHubLogin />
        <button type="button" className="flex justify-center items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> <IoStarSharp/> {" "} {stars}</button>
      </div>
      <Projects />
      <footer className="p-4 bg-blue-200 text-blue-900 rounded-md shadow-md text-lg">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Projects data is copied from the official GSSoC site.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
