import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getAllClasses } from "../../api/classApi";
import { getAllStudents } from "../../api/studentApi";
import {
  saveAttendance,
  updateAttendance,
  getAttendanceByClassAndDate,
} from "../../api/attendanceApi";
const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceStudents, setAttendanceStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    section: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleUpdateAttendance = async () => {
    try {
      const request = {
        academicClassId: selectedClassId,
        date: formData.date,
        attendance: attendanceStudents.map((student) => ({
          studentId: student.studentId,
          status: student.status,
        })),
      };

      await updateAttendance(request);

      alert("Attendance Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await getAllClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSaveAttendance = async () => {
    try {
      const request = {
        academicClassId: selectedClassId,
        date: formData.date,
        attendance: attendanceStudents.map((student) => ({
          studentId: student.studentId,
          status: student.status,
        })),
      };

      console.log(request);

      await saveAttendance(request);

      alert("Attendance Saved Successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to Save Attendance");
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

  const handleLoadStudents = async () => {
    try {
      console.log("Classes:", classes);
      console.log("Form Data:", formData);
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

      setSelectedClassId(selectedClass.id);
      const existingAttendance = await getAttendanceByClassAndDate(
        selectedClass.id,
        formData.date,
      );
      console.log(existingAttendance);
      const data = await getAllStudents();

      const filteredStudents = data
        .filter(
          (student) =>
            student.branch === formData.branch &&
            student.year === Number(formData.year) &&
            student.section === formData.section,
        )
        .sort((a, b) => a.rollNo.localeCompare(b.rollNo));

      setStudents(filteredStudents);
      if (existingAttendance.length > 0) {
        setIsUpdate(true);

        setAttendanceStudents(
          existingAttendance.map((item) => ({
            studentId: item.studentId,
            rollNo: item.rollNo,
            status: item.status,
          })),
        );
      } else {
        setIsUpdate(false);

        setAttendanceStudents(
          filteredStudents.map((student) => ({
            studentId: student.id,
            rollNo: student.rollNo,
            status: "PRESENT",
          })),
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load students");
    }
  };

  const toggleAttendance = (studentId) => {
    setAttendanceStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId
          ? {
              ...student,
              status: student.status === "PRESENT" ? "ABSENT" : "PRESENT",
            }
          : student,
      ),
    );
  };
  const presentCount = attendanceStudents.filter(
    (student) => student.status === "PRESENT",
  ).length;

  const absentCount = attendanceStudents.filter(
    (student) => student.status === "ABSENT",
  ).length;
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>

          <p className="text-gray-500">Mark Attendance</p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Department</option>

              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Year</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Section</option>

              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
            <button
              onClick={() => {
                console.log("Load Students Clicked");
                handleLoadStudents();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              Load Students
            </button>
          </div>
        </div>

        {/* Attendance Grid */}

        {/* Attendance Grid */}

        {attendanceStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
              {attendanceStudents.map((student) => (
                <button
                  key={student.studentId}
                  onClick={() => toggleAttendance(student.studentId)}
                  className={`
            h-20 w-20
            rounded-xl
            shadow-md
            text-2xl
            font-bold
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-105
            ${
              student.status === "PRESENT"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }
          `}
                >
                  {student.rollNo.slice(-2)}
                </button>
              ))}
            </div>
          </div>
        )}

        {attendanceStudents.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-5">
            <div className="flex gap-8">
              <div className="text-green-600 font-bold text-lg">
                Present : {presentCount}
              </div>

              <div className="text-red-600 font-bold text-lg">
                Absent : {absentCount}
              </div>
            </div>

            <button
              onClick={isUpdate ? handleUpdateAttendance : handleSaveAttendance}
              className={`px-8 py-3 rounded-lg text-white font-semibold shadow-lg transition ${
                isUpdate
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isUpdate ? "Update Attendance" : "Save Attendance"}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Attendance;
