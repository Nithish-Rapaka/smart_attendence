import { useEffect, useState } from "react";
import { getAllClasses } from "../../api/classApi";
import { addStudent } from "../../api/studentApi";
import { updateStudent } from "../../api/studentApi";
const addStudentModal = ({
  open,
  onClose,
  refreshStudents,
  isEdit,
  student,
}) => {
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    rollNo: "",
    academicClassId: "",
    branch: "",
    year: "",
    section: "",
  });

  useEffect(() => {
    if (!open) return;

    fetchClasses();

    if (student) {
      setFormData({
        rollNo: student.rollNo,
        academicClassId: student.academicClassId,
        branch: student.branch,
        year: student.year,
        section: student.section,
      });
    } else {
      setFormData({
        rollNo: "",
        academicClassId: "",
        branch: "",
        year: "",
        section: "",
      });
    }
  }, [open, student]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedClass = classes.find(
        (c) =>
          c.branch === formData.branch &&
          c.year === Number(formData.year) &&
          c.section === formData.section,
      );

      if (!selectedClass) {
        alert("Please select Department, Year and Section");
        return;
      }

      const request = {
        rollNo: formData.rollNo,
        academicClassId: selectedClass.id,
      };

      if (isEdit) {
        await updateStudent(student.id, request);
        alert("Student Updated Successfully");
      } else {
        await addStudent(request);
        alert("Student Added Successfully");
      }

      refreshStudents();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || error.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Update Student" : "Save Student"}
        </h2>

        {/* Roll Number */}

        <div className="mb-4">
          <label className="block mb-2 font-medium">Roll Number</label>

          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Enter Roll Number"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Department */}

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

        {/* Year */}

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

        {/* Section */}

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

        {/* Buttons */}

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
            {isEdit ? "Update Student" : "Save Student"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default addStudentModal;
