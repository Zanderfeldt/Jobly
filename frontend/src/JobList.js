import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';
import './JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {

    async function getJobs() {
      try {
        let jobRes = await JoblyApi.getJobs();
        setJobs(jobRes);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getJobs();
    return () => {
      setShowAlert(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let res = await JoblyApi.getJobs(formData);
    if (res.length === 0) {
      setShowAlert(true);
      return
    } else {
      setJobs(res);
      setFormData('');
      setShowAlert(false);
    }
    
  };

  const handleChange = e => {
    setFormData(e.target.value);
  };

  return (
    <div className='JobList'>
      <form onSubmit={handleSubmit}>
        <input
          id='term'
          name='term'
          placeholder='Enter Search Term'
          value={formData}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      {showAlert && <div style={{color: 'red'}}>No Results Found</div>}
      <div className='JobListItems'>
        {jobs.map(j => (
            <JobCard
              key={j.id}
              id={j.id} 
              title={j.title} 
              company={j.companyName}
              salary={j.salary}
              equity={j.equity}
              />                   
        ))}
      </div>
    </div>
  )
}

export default JobList;