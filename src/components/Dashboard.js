import React from 'react';
import Topics from './topics/Topics';
import Navigation from './Navigation'


  const Dashboard = () => {
    return (
      <div id="page-container">
        <Navigation />
        <Topics />
      </div>
    )
  }

  export default Dashboard;

