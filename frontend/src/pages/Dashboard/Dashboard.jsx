import { useEffect, useState } from "react";
import MainLayout from "../../layouts/mainLayout";
import Card from "../../components/common/card";
import { getDashboardStats } from "../../api/dashboardApi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    presentToday: 0,
    absentToday: 0,
    absentGroups: [],
  });

  const COLORS = ["#22c55e", "#ef4444"];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const attendancePercentage =
    stats.totalStudents === 0
      ? 0
      : ((stats.presentToday / stats.totalStudents) * 100).toFixed(1);

  const pieData = [
    {
      name: "Present",
      value: stats.presentToday,
    },
    {
      name: "Absent",
      value: stats.absentToday,
    },
  ];

  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      color: "text-blue-600",
    },
    {
      title: "Total Classes",
      value: stats.totalClasses,
      color: "text-indigo-600",
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      color: "text-green-600",
    },
    {
      title: "Absent Today",
      value: stats.absentToday,
      color: "text-red-600",
    },
    {
      title: "Attendance %",
      value: `${attendancePercentage}%`,
      color: "text-purple-600",
    },
  ];

  const copyAbsentList = (group) => {
    const text = `${group.branch} - Year ${group.year} - Section ${group.section}

Absent Students:
${group.rollNumbers.join(", ")}`;

    navigator.clipboard.writeText(text);

    alert("Absent list copied successfully!");
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

      <p className="text-gray-500 mb-8">Welcome back 👋</p>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Today's Attendance</h2>

          <span className="text-gray-500">{attendancePercentage}% Present</span>
        </div>

        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Absent Students */}

      {/* Today's Absent Students */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">
            🚨 Today's Absent Students
          </h2>

          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
            Total : {stats.absentToday}
          </span>
        </div>

        {stats.absentGroups.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl text-green-600 font-bold">
              🎉 No Absentees Today
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {stats.absentGroups.map((group, index) => (
              <div
                key={index}
                className="border border-red-200 rounded-xl p-6 bg-red-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-red-700">
                      {group.branch} • Year {group.year} • Section{" "}
                      {group.section}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {group.rollNumbers.length} Students Absent
                    </p>
                  </div>

                  <button
                    onClick={() => copyAbsentList(group)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    📋 Copy
                  </button>
                </div>

                <div className="mt-5 bg-white border rounded-lg p-4">
                  <p className="text-lg font-medium text-gray-700 leading-8">
                    {group.rollNumbers.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default dashboard;
