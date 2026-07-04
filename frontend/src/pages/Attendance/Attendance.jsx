import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";

const Attendance = () => {
  // Dummy student data
  const initialStudents = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    rollNo: `22IT${String(index + 1).padStart(3, "0")}`,
    present: true,
  }));

  const [students, setStudents] = useState(initialStudents);
  const [loaded, setLoaded] = useState(false);

  const handleLoadStudents = () => {
    setLoaded(true);
  };

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student,
      ),
    );
  };

  const presentCount = students.filter((s) => s.present).length;
  const absentCount = students.length - presentCount;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Heading */}

        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>

          <p className="text-gray-500">Mark student attendance</p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input type="date" className="border rounded-lg p-3" />

            <select className="border rounded-lg p-3">
              <option>IT</option>
              <option>CSE</option>
              <option>ECE</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <button
              onClick={handleLoadStudents}
              className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Load Students
            </button>
          </div>
        </div>

        {/* Student Grid */}

        {loaded && (
          <>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => toggleAttendance(student.id)}
                    className={`
                      h-20 rounded-xl
                      font-bold
                      text-lg
                      transition-all
                      shadow
                      hover:scale-105
                      ${
                        student.present
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }
                    `}
                  >
                    {student.rollNo.slice(-3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}

            <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow p-5">
              <div className="flex gap-8 text-lg">
                <span className="text-green-600 font-bold">
                  Present : {presentCount}
                </span>

                <span className="text-red-600 font-bold">
                  Absent : {absentCount}
                </span>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg mt-4 md:mt-0">
                Save Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Attendance;
