import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddStudentModal from "./AddStudentModal";
import BulkGenerateModal from "./BulkGenerateModal";
import { deleteStudent, getAllStudents } from "../../api/studentApi";
import DeleteStudentModal from "./DeleteStudentModal";

const Students = () => {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();

      console.log(data);

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.rollNo.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await deleteStudent(selectedStudent.id);

      alert("Student Deleted Successfully");

      await fetchStudents();

      setShowDeleteModal(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

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
            <button
              onClick={() => {
                setIsEdit(false);
                setSelectedStudent(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
              + Add Student
            </button>

            <button
              onClick={() => setShowBulkModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
            >
              + Bulk Generate
            </button>
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search Roll Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No Students Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium">{student.rollNo}</td>

                    <td>{student.branch}</td>

                    <td>{student.year}</td>

                    <td>{student.section}</td>

                    <td className="text-center space-x-2">
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddStudentModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setSelectedStudent(null);
        }}
        isEdit={isEdit}
        student={selectedStudent}
        refreshStudents={fetchStudents}
      />
      <BulkGenerateModal
        open={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSuccess={fetchStudents}
      />
      <DeleteStudentModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDelete}
        rollNo={selectedStudent?.rollNo}
      />
    </MainLayout>
  );
};

export default Students;
