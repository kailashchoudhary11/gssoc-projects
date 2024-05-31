import './App.css'
import GitHubLogin from './components/GitHubLogin'
import Projects from './components/Projects'

function App() {

  return (
    <div className='flex p-5 gap-5 flex-col'>
      <div>
        <GitHubLogin />
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
