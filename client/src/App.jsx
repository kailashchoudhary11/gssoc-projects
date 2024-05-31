import './App.css'
import GitHubLogin from './components/GitHubLogin'
import Projects from './components/Projects'

function App() {

  return (
    <div className='flex p-5 flex-col'>
      <div>
        <GitHubLogin />
      </div>
      <Projects />
    </div>
  )
}

export default App
