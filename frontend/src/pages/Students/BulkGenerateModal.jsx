import { useEffect, useState } from "react";
import { getAllClasses } from "../../api/classApi";
import { bulkGenerateStudents } from "../../api/studentApi";

const bulkGenerateModal = ({ open, onClose, onSuccess }) => {
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    prefix: "",
    startNumber: "",
    endNumber: "",
    branch: "",
    year: "",
    section: "",
  });

  useEffect(() => {
    if (open) {
      fetchClasses();
    }
  }, [open]);

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load classes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "branch") {
      setFormData({
        ...formData,
        branch: value,
        year: "",
        section: "",
      });
      return;
    }

    if (name === "year") {
      setFormData({
        ...formData,
        year: value,
        section: "",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const branches = [...new Set(classes.map((c) => c.branch))];

  const years = [
    ...new Set(
      classes.filter((c) => c.branch === formData.branch).map((c) => c.year),
    ),
  ];

  const sections = [
    ...new Set(
      classes
        .filter(
          (c) =>
            c.branch === formData.branch && c.year === Number(formData.year),
        )
        .map((c) => c.section),
    ),
  ];

  const handleSubmit = async () => {
    if (!formData.prefix.trim()) {
      alert("Prefix is required");
      return;
    }

    if (!formData.startNumber) {
      alert("Start Number is required");
      return;
    }

    if (!formData.endNumber) {
      alert("End Number is required");
      return;
    }

    if (Number(formData.startNumber) > Number(formData.endNumber)) {
      alert("Start Number should be less than or equal to End Number");
      return;
    }

    if (!formData.branch || !formData.year || !formData.section) {
      alert("Please select Department, Year and Section");
      return;
    }

    const selectedClass = classes.find(
      (c) =>
        c.branch === formData.branch &&
        c.year === Number(formData.year) &&
        c.section === formData.section,
    );

    if (!selectedClass) {
      alert("Academic Class not found");
      return;
    }

    try {
      await bulkGenerateStudents({
        prefix: formData.prefix,
        startNumber: Number(formData.startNumber),
        endNumber: Number(formData.endNumber),
        academicClassId: selectedClass.id,
      });

      alert("Students Generated Successfully");

      setFormData({
        prefix: "",
        startNumber: "",
        endNumber: "",
        branch: "",
        year: "",
        section: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Bulk Generation Failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Bulk Generate Students</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Prefix</label>

          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
            placeholder="Example: 23IT"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Start Number</label>

            <input
              type="number"
              name="startNumber"
              value={formData.startNumber}
              onChange={handleChange}
              placeholder="1"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">End Number</label>

            <input
              type="number"
              name="endNumber"
              value={formData.endNumber}
              onChange={handleChange}
              placeholder="60"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Department</label>

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Department</option>

            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
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

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Section</label>

          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Section</option>

            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
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
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Generate Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default bulkGenerateModal;
