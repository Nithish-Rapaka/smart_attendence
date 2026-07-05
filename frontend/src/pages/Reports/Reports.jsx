import { useEffect, useState } from "react";
import MainLayout from "../../layouts/mainLayout";
import { getAllClasses } from "../../api/classApi";
import { getAttendanceSummary } from "../../api/attendanceApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const reports = () => {
  const [classes, setClasses] = useState([]);
  const [report, setReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    section: "",
  });
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

  const handleGenerateReport = async () => {
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

      const data = await getAttendanceSummary(selectedClass.id);

      console.log(data);

      setReport(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alert("Failed to load report");
    }
  };

  const downloadPDF = () => {
    if (!report) {
      alert("Please generate a report first.");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);
    doc.text("Attendance Report", 14, 18);

    // Filters
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(`Department : ${formData.branch}`, 14, 30);
    doc.text(`Year : ${formData.year}`, 14, 37);
    doc.text(`Section : ${formData.section}`, 14, 44);

    // Summary
    doc.text(`Total Students : ${report.totalStudents}`, 120, 30);
    doc.text(
      `Average Attendance : ${report.averageAttendance.toFixed(2)}%`,
      120,
      37,
    );
    doc.text(`Eligible : ${report.eligible}`, 120, 44);
    doc.text(`Shortage : ${report.shortage}`, 120, 51);

    autoTable(doc, {
      startY: 60,

      head: [["Roll No", "Present", "Absent", "Attendance %", "Status"]],

      body: report.students.map((student) => [
        student.rollNo,
        student.present,
        student.absent,
        `${student.percentage.toFixed(2)}%`,
        student.percentage >= 75 ? "Eligible" : "Shortage",
      ]),

      styles: {
        halign: "center",
        fontSize: 10,
      },

      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    doc.save("Attendance_Report.pdf");
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents =
    report?.students
      ?.sort((a, b) => {
        const getOrder = (rollNo) => {
          const suffix = rollNo.slice(-2);

          // 00-99
          if (/^\d{2}$/.test(suffix)) {
            return parseInt(suffix);
          }

          // A0-A9, B0-B9...
          if (/^[A-Z]\d$/.test(suffix)) {
            const letter = suffix.charCodeAt(0) - 65;
            const digit = parseInt(suffix[1]);

            return 100 + letter * 10 + digit;
          }

          return 9999;
        };

        return getOrder(a.rollNo) - getOrder(b.rollNo);
      })
      .slice(indexOfFirstStudent, indexOfLastStudent) || [];
  const totalPages = Math.ceil(
    (report?.students?.length || 0) / studentsPerPage,
  );
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Heading */}

        <div>
          <h1 className="text-3xl font-bold">Attendance Reports</h1>

          <p className="text-gray-500">View monthly attendance reports</p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div></div>

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="border rounded-lg p-3"
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
              className="border rounded-lg p-3"
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
              className="border rounded-lg p-3"
            >
              <option value="">Section</option>

              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerateReport}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Summary */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Total Students</h3>
            <h1 className="text-3xl font-bold mt-3">
              {report?.totalStudents ?? 0}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Average Attendance</h3>
            <h1 className="text-3xl font-bold text-green-600 mt-3">
              {report?.averageAttendance?.toFixed(2) ?? 0}%
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Eligible</h3>
            <h1 className="text-3xl font-bold text-blue-600 mt-3">
              {report?.eligible ?? 0}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Shortage</h3>
            <h1 className="text-3xl font-bold text-red-600 mt-3">
              {report?.shortage ?? 0}
            </h1>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 text-left px-6">Roll No</th>

                <th className="text-center">Present</th>

                <th className="text-center">Absent</th>

                <th className="text-center">Attendance %</th>

                <th className="text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student.studentId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">{student.rollNo}</td>

                  <td className="text-center">{student.present}</td>

                  <td className="text-center">{student.absent}</td>

                  <td className="text-center">
                    {student.percentage.toFixed(2)}%
                  </td>

                  <td className="text-center">
                    {student.percentage >= 75 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Eligible
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Shortage
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          {/* Pagination */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* PDF */}
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Download PDF
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
export default reports;
