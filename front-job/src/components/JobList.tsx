import React from 'react';
import api from '../api';

interface JobListProps {
  jobs: any[];
  fetchJobs: () => void;
  setEditingJob: (job: any) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, fetchJobs, setEditingJob }) => {
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="job-list-container">
      <h2 className="job-list-heading">Job Listings</h2>
      <div className="job-cards">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-info">Company: {job.company}</p>
            <p className="job-info">Location: {job.location}</p>
            <p className="job-info">Salary: {job.salary}</p>
            <div className="job-buttons">
              <button className="edit-btn" onClick={() => setEditingJob(job)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(job.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
