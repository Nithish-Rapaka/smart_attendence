import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
const Students = () => {
  const [students] = useState([
    {
      id: 1,
      rollNo: "22IT001",
      department: "IT",
      year: "3",
      section: "A",
    },
    {
      id: 2,
      rollNo: "22IT002",
      department: "IT",
      year: "3",
      section: "A",
    },
    {
      id: 3,
      rollNo: "22IT003",
      department: "IT",
      year: "3",
      section: "A",
    },
    {
      id: 4,
      rollNo: "22IT004",
      department: "IT",
      year: "3",
      section: "B",
    },
  ]);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Student Management
            </h1>
            <p className="text-gray-500">Manage student records</p>
          </div>

          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
              + Add Student
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
              + Bulk Generate
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow">
              Delete Students
            </button>
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search Roll Number..."
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select className="border rounded-lg px-4 py-2">
              <option>Department</option>

              <option>IT</option>

              <option>CSE</option>

              <option>ECE</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>Year</option>

              <option>1</option>

              <option>2</option>

              <option>3</option>

              <option>4</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>Section</option>

              <option>A</option>

              <option>B</option>

              <option>C</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-4 text-left">Roll No</th>

                <th className="text-left">Department</th>

                <th className="text-left">Year</th>

                <th className="text-left">Section</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium">{student.rollNo}</td>

                  <td>{student.department}</td>

                  <td>{student.year}</td>

                  <td>{student.section}</td>

                  <td className="text-center space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">
                      Edit
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Students;
