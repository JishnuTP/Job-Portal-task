import React, { useState } from 'react';
import api from '../api';

interface JobFormProps {
  fetchJobs: () => void;
  editingJob?: any; // If editing a job, pass its details
  clearEditing: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ fetchJobs, editingJob, clearEditing }) => {
  const [formData, setFormData] = useState({
    title: editingJob?.title || '',
    company: editingJob?.company || '',
    location: editingJob?.location || '',
    salary: editingJob?.salary || '',
    description: editingJob?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob.id}`, formData);
        clearEditing();
      } else {
        await api.post('/jobs', formData);
      }
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
      <div className="form-input-container">
        <input
          className="form-input"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-textarea"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="form-submit-btn">
        {editingJob ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default JobForm;
