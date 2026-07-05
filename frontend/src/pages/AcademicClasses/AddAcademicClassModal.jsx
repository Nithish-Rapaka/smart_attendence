import { useState } from "react";
import { addClass } from "../../api/classApi";

const AddAcademicClassModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.branch.trim()) {
      alert("Department is required");
      return;
    }

    if (!formData.year) {
      alert("Year is required");
      return;
    }

    if (!formData.section.trim()) {
      alert("Section is required");
      return;
    }

    try {
      await addClass({
        branch: formData.branch,
        year: Number(formData.year),
        section: formData.section.toUpperCase(),
      });

      alert("Academic Class Added Successfully");

      setFormData({
        branch: "",
        year: "",
        section: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to Add Class");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add Academic Class</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Department</label>

          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Example: IT, CSE, Data Science"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Year</label>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Section</label>

          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Example: A"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAcademicClassModal;
