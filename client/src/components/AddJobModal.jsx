// AddJobModal.js
const AddJobModal = ({ isOpen, onClose, form, setForm, addJob, isFormValid }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-3">Add Job</h2>

        <input
          value={form.company}
          placeholder="Company"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="input w-full mb-2"
        />

        <input
          value={form.link}
          placeholder="Link"
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="input w-full mb-2"
        />

        <input
          value={form.title}
          placeholder="Position"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input w-full mb-2"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="input w-full mb-2"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>

        <input
          value={form.date}
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="input w-full mb-2"
        />

     
        <input
          type="email"
          value={form.jobEmail}
          placeholder="Email used on career site"
          onChange={(e) => setForm({ ...form, jobEmail: e.target.value })}
          className="input w-full mb-2"
        />

        <input
          type="text"
          value={form.jobPassword}
          placeholder="Password used on career site"
          onChange={(e) => setForm({ ...form, jobPassword: e.target.value })}
          className="input w-full mb-2"
        />

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded font-bold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={addJob}
            disabled={!isFormValid()}
            className={`px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
