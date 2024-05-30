import { useEffect, useState } from 'react'
import './App.css'
import GitHubLogin from './GitHubLogin';
import Cards from './project-section/Cards';

function App() {

  return (
    <div>
      <GitHubLogin />
      <Cards />
    </div>
  )
}

export default App
