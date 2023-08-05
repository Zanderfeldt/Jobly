import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {

    async function getCompanies() {
      try {
        let comps = await JoblyApi.getCompanies();
        setCompanies(comps);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getCompanies();
    return () => {
      setShowAlert(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let res = await JoblyApi.getCompanies(formData);
    if (res.length === 0) {
      setShowAlert(true);
      return
    } else {
      setCompanies(res);
      setFormData('');
      setShowAlert(false);
    }  
  };

  const handleChange = e => {
    setFormData(e.target.value);
  };

  return (
    <div className='CompanyList'>
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
      <div className='CompanyListItems'>
        {companies.map(c => (
          <Link to={`/companies/${c.handle}`} key={c.handle}>
            <CompanyCard 
              name={c.name} 
              description={c.description}
              logo={c.logoUrl}
              />
          </Link>          
        ))}
      </div>
    </div>
  )
}

export default CompanyList;