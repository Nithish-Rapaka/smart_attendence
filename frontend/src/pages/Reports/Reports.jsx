import MainLayout from "../../layouts/MainLayout";
const Reports = () => {
  const reportData = [
    {
      id: 1,
      rollNo: "001",
      present: 24,
      absent: 2,
      percentage: 92.3,
    },
    {
      id: 2,
      rollNo: "002",
      present: 20,
      absent: 6,
      percentage: 76.9,
    },
    {
      id: 3,
      rollNo: "003",
      present: 16,
      absent: 10,
      percentage: 61.5,
    },
    {
      id: 4,
      rollNo: "004",
      present: 25,
      absent: 1,
      percentage: 96.2,
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="border rounded-lg p-3">
              <option>Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
            </select>

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

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Generate Report
            </button>
          </div>
        </div>

        {/* Summary */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Total Students</h3>
            <h1 className="text-3xl font-bold mt-3">60</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Average Attendance</h3>
            <h1 className="text-3xl font-bold text-green-600 mt-3">89%</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Eligible</h3>
            <h1 className="text-3xl font-bold text-blue-600 mt-3">52</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Shortage</h3>
            <h1 className="text-3xl font-bold text-red-600 mt-3">8</h1>
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
              {reportData.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{student.rollNo}</td>

                  <td className="text-center">{student.present}</td>

                  <td className="text-center">{student.absent}</td>

                  <td className="text-center">{student.percentage}%</td>

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

        <div className="flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
            Download PDF
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
