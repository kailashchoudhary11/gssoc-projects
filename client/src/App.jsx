import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch("http://localhost:8000/projects")
      const data = await res.json()
      setProjects(data)
    }
    fetchProjects()
  }, [])

  return (
    <div>
      {
        projects.map(({ ID, project_link, project_name, technology_used }) => {
          return (
            <div key={ID} style={{ marginBottom: "10px" }}>
              <div>Name: {project_name}</div>
              <div>Link: {project_link}</div>
              <div>
                Technologies Used: {technology_used.split(",").map((tech, ind) => (<span style={{ marginRight: "10px" }} key={ind}>{tech},</span>))}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
