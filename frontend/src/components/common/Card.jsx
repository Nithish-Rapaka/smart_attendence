const Card = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <h1 className={`text-3xl font-bold mt-3 ${color}`}>{value}</h1>
    </div>
  );
};

export default Card;
