import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';
import './JobList.css';

function Company () {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {

    async function getCompanyJobs() {
      try {
        let jobRes = await JoblyApi.getCompany(id);       
        setJobs(jobRes);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getCompanyJobs();
    
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <div className='JobList'>
      <h4>{jobs.name}</h4>
      <p>{jobs.description}</p>
      <div className='JobListItems'>
        {jobs.jobs.map(j => (
            <JobCard
              key={j.id} 
              title={j.title} 
              salary={j.salary}
              equity={j.equity}
              />                   
        ))}
      </div>
    </div>
  )
}

export default Company;