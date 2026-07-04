import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/common/Card";
const Dashboard = () => {
  const cards = [
    {
      title: "Total Students",
      value: 120,
      color: "text-blue-600",
    },
    {
      title: "Present Today",
      value: 115,
      color: "text-green-600",
    },
    {
      title: "Absent Today",
      value: 5,
      color: "text-red-600",
    },
    {
      title: "Attendance %",
      value: "95.8%",
      color: "text-purple-600",
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

      <p className="text-gray-500 mb-8">Welcome back, Administrator 👋</p>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
