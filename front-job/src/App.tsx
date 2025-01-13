import React, { useEffect, useState } from 'react';
import api from './api';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

const App: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setJobs(data.data);
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <JobForm fetchJobs={fetchJobs} editingJob={editingJob} clearEditing={() => setEditingJob(null)} />
      <JobList jobs={jobs} fetchJobs={fetchJobs} setEditingJob={setEditingJob} />
    </div>
  );
};

export default App;
