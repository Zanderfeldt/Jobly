import React from 'react';
import './CompanyCard.css';

function CompanyCard({name, description, logo}) {
  return (
    <div className='CompanyCard'>
      <div className='company-name'>{name}</div>
      {/* <img src={logo}></img> */}
      <p><small>{description}</small></p>
    </div>
  )
}

export default CompanyCard;
