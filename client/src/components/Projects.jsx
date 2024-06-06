import { useEffect, useState, useCallback } from "react";
import Select from 'react-select'
import { BASE_URL } from "../constants/baseUrl";
import { badgeStyles } from "../constants/badgeStyles";

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortAscDscOption, setSortAscDscOption] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/projects/all`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const fetchedData = await response.json();
      fetchedData.sort((a, b) => new Date(b.LastPRMergedAt) - new Date(a.LastPRMergedAt));
      console.log("Sorted Data: ", fetchedData);
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
  const sortOnTheBasisOfPRCount = (a, b) => {
    return (b.OpenPRCount - a.OpenPRCount);
  }
  const sortOnTheBasisOfIssueCount = (a, b) => {
    return (b.OpenIssueCount - a.OpenIssueCount);
  }
  const lastPRMergedTime = (a, b) => {
    return (new Date(b.LastPRMergedAt) - new Date(a.LastPRMergedAt));
  }
  const options = [
    { value: 'sortOnTheBasisOfPRCount', label: 'PR Count' },
    { value: 'sortOnTheBasisOfIssueCount', label: 'Issue Count' },
    { value: 'lastPRMergedTime', label: 'Last PR Merged' }
  ];
  const options2 = [
    { value: 'descending', label: 'Sort' }
  ]
  const handleAscDsc = (sortAscDscOption) => {
    setSortAscDscOption(sortAscDscOption);
    let sortedData;
    if (sortAscDscOption.value === 'ascending') {
      sortedData = data.sort()
    }
    else if (sortAscDscOption.value === 'descending') {
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
    else if (selectedOption.value === 'lastPRMergedTime') {
      sortedData = data.sort(lastPRMergedTime);
    }

    setData(sortedData);
  };
  return (
    <div className="flex flex-col justify-center">
      {
        data && data.length > 0 && <div className="p-4 bg-blue-200 dark:bg-blue-800 dark:text-blue-200 text-blue-900 rounded-md shadow-md text-lg text-center">
          Data was last updated at {(new Date(data[0].UpdatedAt)).toLocaleString()}.
          Login with GitHub to get the latest updated data.
        </div>
      }
      <div className="flex space-x-4 py-5 w-[50%] dark:bg-gray-900 rounded-lg dark:text-gray-900">
        <Select
          options={options}
          defaultValue={selectedOption}
          onChange={handleSort}
          className="w-1/2 p-2 border border-gray-200 rounded"
        />
        <Select
          options={options2}
          defaultValue={sortAscDscOption}
          onChange={handleAscDsc}
          className="w-1/2 p-2 border border-gray-200 rounded"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data.map((project) => (
            <a href={project.project_link} target="_blank">
              <div key={project.ID} className="border border-amber-600 p-4 rounded-lg shadow-lg h-fit overflow-auto ">
                <h1 className="text-xl font-semibold mb-2">{project.project_name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <span className="font-bold">Latest PR Merged At:</span> {new Date(project.LastPRMergedAt).toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <span className="font-bold">Open Issues:</span> {project.OpenIssueCount - project.OpenPRCount}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <span className="font-bold">Open PRs:</span> {project.OpenPRCount < 100 ? project.OpenPRCount : "> 100"}
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
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

