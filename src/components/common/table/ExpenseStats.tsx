import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";

type ExpenseData = {
  today: number | null;
  total: number | null;
  lastWeek: number | null;
  lastYear: number | null;
  yesterday: number | null;
  lastMonth: number | null;
  currentWeek: number | null;
  currentYear: number | null;
  currentMonth: number | null;
};

const calculatePercentage = (
  current: number | null,
  previous: number | null
) => {
  if (!previous || previous === 0 || !current) return null;
  return ((current - previous) / previous) * 100;
};

const ExpenseStats = ({
  data = {
    today: null,
    total: null,
    lastWeek: null,
    lastYear: null,
    yesterday: null,
    lastMonth: null,
    currentWeek: null,
    currentYear: null,
    currentMonth: null,
  },
}: {
  data?: ExpenseData;
}) => {
  const stats = [
    {
      label: "Today",
      value: data.today,
      prev: data.yesterday,
      color: "bg-gradient-to-r from-green-300 to-green-600",
    },
    {
      label: "This Week",
      value: data.currentWeek,
      prev: data.lastWeek,
      color: "bg-gradient-to-r from-blue-300 to-blue-600",
    },
    {
      label: "This Month",
      value: data.currentMonth,
      prev: data.lastMonth,
      color: "bg-gradient-to-r from-purple-300 to-purple-600",
    },
    {
      label: "This Year",
      value: data.currentYear,
      prev: data.lastYear,
      color: "bg-gradient-to-r from-orange-300 to-orange-600",
    },
    {
      label: "Total",
      value: data.total,
      prev: null,
      color: "bg-gradient-to-r from-pink-300 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
      {stats.map(({ label, value, prev, color }, index) => {
        const percentChange = calculatePercentage(value, prev);
        const isPositive = percentChange !== null && percentChange > 0;
        return (
          <div
            key={index}
            className={`p-5 rounded-xl shadow-md text-white ${color}`}
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-lg font-semibold">{label}</p>
              <p className="text-2xl font-bold">
                ₹{value?.toLocaleString() ?? "-"}
              </p>
              {percentChange !== null && (
                <p
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? "text-white" : "text-red-200"
                  }`}
                >
                  {isPositive ? (
                    <BiTrendingUp size={16} />
                  ) : (
                    <BiTrendingDown size={16} />
                  )}
                  {percentChange.toFixed(1)}%
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseStats;
