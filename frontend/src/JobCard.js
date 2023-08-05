import React, { useState, useEffect, useContext } from 'react';
import './JobCard.css';
import UserContext from './auth/UserContext';

function JobCard({title, company, salary, equity, id}) {
  const [applied, setApplied] = useState();
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);


  useEffect(function updateAppliedStatus() {
    setApplied(hasAppliedToJob(id))
  }, [id, hasAppliedToJob]);

  //Apply for a job
  async function handleApply(e) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className='JobCard'>
      <h6 className='JobCard title'>{title}</h6>
      <p>{company}</p>
      <div className='JobCard salary'>
        <small>
          Salary: {salary}
        </small>
      </div>
      <div className='JobCard equity'>
        <small>
          Equity: {equity ? equity : '0'}
        </small>
      </div>
      <button className='JobCard button'
        onClick={handleApply}
        disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  )

}

export default JobCard;