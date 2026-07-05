import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getAllClasses } from "../../api/classApi";
import AddAcademicClassModal from "./AddAcademicClassModal";
import DeleteAcademicClassModal from "./DeleteAcademicClassModal";
import { deleteClass } from "../../api/classApi";

const AcademicClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedClass) return;

    try {
      await deleteClass(selectedClass.id);

      alert("Academic Class Deleted Successfully");

      await fetchClasses();

      setShowDeleteModal(false);
      setSelectedClass(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete Academic Class");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Heading */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Academic Classes</h1>

            <p className="text-gray-500">Manage Academic Classes</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Class
          </button>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-4 text-left">Department</th>

                <th className="text-left">Year</th>

                <th className="text-left">Section</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8">
                    No Academic Classes Found
                  </td>
                </tr>
              ) : (
                classes.map((academicClass) => (
                  <tr
                    key={academicClass.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">{academicClass.branch}</td>

                    <td>{academicClass.year}</td>

                    <td>{academicClass.section}</td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setSelectedClass(academicClass);
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

      <AddAcademicClassModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchClasses}
      />

      <DeleteAcademicClassModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedClass(null);
        }}
        onConfirm={handleDelete}
        className={
          selectedClass
            ? `${selectedClass.branch} ${selectedClass.year}-${selectedClass.section}`
            : ""
        }
      />
    </MainLayout>
  );
};

export default AcademicClasses;
