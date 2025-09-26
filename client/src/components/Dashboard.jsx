import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddJobModal from './AddJobModal'; // Import the model

function Dashboard({ setLoggedIn }) {

  const [jobs, setJobs] = useState([]); //Holds all job data fetched from the backend.

  const [form, setForm] = useState({ //Stores form values when adding a new job.
    company: '', 
    link: '', 
    title: '', 
    status: 'Applied', 
    date: '',
    jobEmail: '',      
    jobPassword: ''     
  });

  const [filterStatus, setFilterStatus] = useState('All');

  const [editJobId, setEditJobId] = useState(null);//Keeps track of which job is being edited (by its _id).

  const [editForm, setEditForm] = useState({ 
    company: '', 
    link: '', 
    title: '', 
    status: '', 
    date: '',
    jobEmail: '',       
    jobPassword: ''     
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // for open close Form to Add job


  useEffect(() => {
    axios.get('/jobs').then((res) => setJobs(res.data));
  }, []);  // Fetches all jobs from backend and saves them in jobs state.


  const isFormValid = () => {  //form validation
    return form.company && form.link && form.title && form.status && form.date;
  };

  const isEditFormValid = () => { // edit form validation
    return editForm.company && editForm.link && editForm.title && editForm.status && editForm.date;
  };

  const addJob = async () => { // to add new job
    if (!isFormValid()) return;
    try {
      await axios.post('/jobs/add', form);
      const res = await axios.get('/jobs');
      setJobs(res.data);

      setForm({  //reset form
        company: '', link: '', title: '', status: 'Applied', date: '',
        jobEmail: '', 
        jobPassword: '' 
      });

      setIsModalOpen(false);

      toast.success('Job added successfully ✅');
      
    } catch (err) {
      toast.error('Failed to add job ❌');
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
      toast.success('Job deleted');
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  const startEdit = (job) => {
    setEditJobId(job._id);
    setEditForm({
      company: job.company,
      link: job.link,
      title: job.title,
      status: job.status,
      date: job.date ? new Date(job.date).toISOString().substring(0, 10) : '',
      jobEmail: job.jobEmail || '',       
      jobPassword: job.jobPassword || ''  
    });
  };

  const updateJob = async () => {
    if (!isEditFormValid()) return;
    try {
      await axios.put(`/jobs/${editJobId}`, editForm);
      const res = await axios.get('/jobs');
      setJobs(res.data);
      setEditJobId(null);
      toast.success('Job updated ✅');
    } catch (err) {
      toast.error('Failed to update job ❌');
    }
  };

  const filteredJobs = filterStatus === 'All' ? jobs : jobs.filter((j) => j.status === filterStatus);

  return (
    <div className="p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-4 px-6 py-3 bg-gray-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-black ">JobTracker.com👩‍💻</h1>
        <div className="flex gap-3">
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
          >
            Add Job
          </button>

        
          <button
            onClick={() => {
              axios.post('/auth/logout');
              setLoggedIn(false);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4 max-w-xs">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Job Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
       {filteredJobs.map((job) => (
    <div
      key={job._id}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
    >
      {editJobId === job._id ? (
        // Edit Mode
        <div className="space-y-2">
          <input
            value={editForm.company}
            placeholder="Company"
            onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
            className="input"
          />
          <input
            value={editForm.link}
            placeholder="Link"
            onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
            className="input"
          />
          <input
            value={editForm.title}
            placeholder="Position"
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="input"
          />
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            className="input"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
          <input
            value={editForm.date}
            type="date"
            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
            className="input"
          />
          <input
            type="email"
            value={editForm.jobEmail}
            placeholder="Email used on career site"
            onChange={(e) => setEditForm({ ...editForm, jobEmail: e.target.value })}
            className="input"
          />
          <input
            type="password"
            value={editForm.jobPassword}
            placeholder="Password used on career site"
            onChange={(e) => setEditForm({ ...editForm, jobPassword: e.target.value })}
            className="input"
          />

          <div className="flex gap-2 mt-2">
            <button onClick={updateJob} className="btn">Save</button>
            <button onClick={() => setEditJobId(null)} className="btn bg-gray-300">Cancel</button>
          </div>
        </div>
      ) : (
        // Card View
        <div>
          <h3 className="text-lg font-semibold">{job.company}</h3>
          <p className="text-gray-700">{job.title}</p>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 underline"
          >
            Website Link
          </a>
          <p className="text-sm text-gray-600 mt-1">📌 Status: {job.status}</p>
          <p className="text-sm text-gray-500">📅 Applied on: {new Date(job.date).toLocaleDateString('en-GB')}</p>

          {job.jobEmail && <p className="text-sm text-black">Email Id - {job.jobEmail}</p>}
          {job.jobPassword && <p className="text-sm text-black"> Password - {job.jobPassword}</p>}

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => startEdit(job)}
              className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              onClick={() => deleteJob(job._id)}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded font-bold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  ))}
</div>


      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        setForm={setForm}
        addJob={addJob}
        isFormValid={isFormValid}
      />
    </div>
  );
}

export default Dashboard;
