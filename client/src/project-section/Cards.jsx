import { useEffect, useState,useCallback } from "react";
import Select from 'react-select'

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortAscDscOption,setSortAscDscOption] = useState(null);
  
  const badgeStyles = [
    { name: 'ReactJs', style: 'bg-blue-400 text-blue-800' },
    { name: 'WebGL', style: 'bg-green-400 text-green-800' },
    { name: 'Threejs', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'Unity', style: 'bg-red-400 text-red-800' },
    { name: 'AR/VR', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'DeepLearning', style: 'bg-blue-400 text-blue-800' },
    { name: 'NeuralNetworks', style: 'bg-green-400 text-green-800' },
    { name: 'ImageProcessing', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'NaturalLanguageProcessing', style: 'bg-red-400 text-red-800' },
    { name: 'Tensorflow', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'OpenCV', style: 'bg-purple-400 text-purple-800' },
    { name: 'Javascript', style: 'bg-blue-400 text-blue-800' },
    { name: 'Python', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'Java', style: 'bg-red-400 text-red-800' },
    { name: 'Data-science', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'flutter', style: 'bg-purple-400 text-purple-800' },
    { name: 'HTML', style: 'bg-blue-400 text-blue-800' },
    { name: 'CSS', style: 'bg-green-400 text-green-800' },
    { name: 'Bootstrap', style: 'bg-red-400 text-red-800' },
    { name: 'WebSocket', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'jQuery', style: 'bg-purple-400 text-purple-800' },
    { name: 'PHP', style: 'bg-blue-400 text-blue-800' },
    { name: 'MySQL', style: 'bg-green-400 text-green-800' },
    { name: 'Pythonframeworrk', style: 'bg-blue-400 text-blue-800' },
    { name: 'Typescript', style: 'bg-green-400 text-green-800' },
    { name: 'Tailwind', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'Kotlin', style: 'bg-red-400 text-red-800' },
    { name: 'JetpackCompose', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'Tkinter', style: 'bg-purple-400 text-purple-800' },
    { name: 'MongoDB', style: 'bg-blue-400 text-blue-800' },
    { name: 'SQL', style: 'bg-green-400 text-green-800' },
    { name: 'Flask', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'Django', style: 'bg-red-400 text-red-800' },
    { name: 'SCSS', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'GitHubAPI', style: 'bg-purple-400 text-purple-800' },
    { name: 'Figma', style: 'bg-blue-400 text-blue-800' },
    { name: 'NextJS14', style: 'bg-green-400 text-green-800' },
    { name: 'TailwindCSS', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'GSAP', style: 'bg-red-400 text-red-800' },
    { name: 'Framer-motion', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'NodeJS', style: 'bg-purple-400 text-purple-800' },
    { name: 'ExpressJS', style: 'bg-blue-400 text-blue-800' },
    { name: 'GenAI', style: 'bg-green-400 text-green-800' },
    { name: 'WebSocket', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'ReactJS', style: 'bg-red-400 text-red-800' },
    { name: 'Redux', style: 'bg-indigo-400 text-indigo-800' },
    { name: 'MaterialUI', style: 'bg-purple-400 text-purple-800' },
    { name: 'MERNSTACK(Mongodb,Express.js,React.js,Node.js)', style: 'bg-blue-400 text-blue-800' },
    { name: 'Postgres', style: 'bg-yellow-400 text-yellow-800' },
    { name: 'Sequelize', style: 'bg-purple-400 text-purple-800' },
    { name: 'Redux', style: 'bg-green-400 text-green-800' },
  ];
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://golang-main-symbiosis-uni-00b7344c.koyeb.app/projects/all');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const fetchedData = await response.json();
      fetchedData.sort((a, b) => new Date(b.LastPRMergedAt) - new Date(a.LastPRMergedAt));
      console.log("Sorted Data: ",fetchedData);
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []); 
  useEffect(() => {
    fetchData();
  }, []);

  // Sorting cards on the basis of pr count issue count
  const sortOnTheBasisOfPRCount=(a,b)=>{
    return (b.OpenPRCount - a.OpenPRCount);
  }
  const sortOnTheBasisOfIssueCount=(a,b)=>{
    return (b.OpenIssueCount - a.OpenIssueCount);
  }
  const lastPRMergedTime=(a,b)=>{
    return (new Date(b.LastPRMergedAt) - new Date(a.LastPRMergedAt));
  }
  const options = [
    { value: 'sortOnTheBasisOfPRCount', label: 'PR Count' },
    { value: 'sortOnTheBasisOfIssueCount', label: 'Issue Count' },
    {value: 'lastPRMergedTime',label: 'Last PR Merged'}
  ];
  const options2 = [
    {value: 'descending',label:'Sort'}
  ]
  const handleAscDsc=(sortAscDscOption)=>{
    setSortAscDscOption(sortAscDscOption);
    let sortedData;
    if(sortAscDscOption.value==='ascending'){
      sortedData = data.sort()
    }
    else if(sortAscDscOption.value==='descending'){
      sortedData = data.sort().reverse();
    }
    setData(sortedData);
  }
  const handleSort = (selectedOption) => {
    setSelectedOption(selectedOption);
    let sortedData;

    if (selectedOption.value === 'sortOnTheBasisOfPRCount') {
        sortedData = data.sort(sortOnTheBasisOfPRCount)
    } else if (selectedOption.value === 'sortOnTheBasisOfIssueCount') {
        sortedData = data.sort(sortOnTheBasisOfIssueCount);
    }
    else if(selectedOption.value==='lastPRMergedTime'){
      sortedData = data.sort(lastPRMergedTime);
    }

    setData(sortedData);
  };
  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex">
      <Select 
        options={options}
        defaultValue={selectedOption}
        onChange={handleSort}
      />
      <Select
        options={options2}
        defaultValue={sortAscDscOption}
        onChange={handleAscDsc}
      />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project) => (
            <div key={project.ID} className="border border-amber-600 p-4 rounded-lg shadow-lg h-fit overflow-auto">
              <h1 className="text-xl font-semibold mb-2">{project.project_name}</h1>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Open Issues:</span> {project.OpenIssueCount}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Last PR Merged At:</span> {new Date(project.LastPRMergedAt).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Open PR Count:</span> {project.OpenPRCount}
              </p>
              <p>
                {badgeStyles.map((badge, index) => {
                    if (project.technology_used.includes(badge.name)) {
                    return (
                        <span
                        key={`${badge.name}-${index}`}
                        className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:text-gray-600 ${badge.style}`}
                        >
                        {badge.name}
                        </span>
                    );
                    }
                    return null;
                })}
              </p>
              <a href={project.project_link}><button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Link to the project</button></a>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
