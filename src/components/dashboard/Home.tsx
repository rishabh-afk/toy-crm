import dayjs from "dayjs";
import useFetch from "@/hooks/useFetch";
import { Fetch } from "@/hooks/apiUtils";
import LineGraph from "../chart/Linegraph";
import { IoStatsChart } from "react-icons/io5";
import { FC, useEffect, useState } from "react";
import DateFilter from "../common/table/DateFilter";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { formatCompactNumber, formatIndianCurrency } from "@/hooks/general";

const Home: FC = () => {
  const [dateDiff, setDateDiff] = useState<number>(0);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const { data: dealsData } = useFetch("api/dashboard");
  const crmStats: any = dealsData?.data;

  const [data, setData] = useState(crmStats);

  useEffect(() => {
    const diff = dayjs(endDate).diff(dayjs(startDate), "day");
    setDateDiff(diff);
  }, [startDate, endDate]);

  useEffect(() => {
    if (crmStats) setData(crmStats);
  }, [crmStats]);

  const fetchData = async (filterParams: any) => {
    const params = {
      endDate: filterParams.end ?? endDate,
      startDate: filterParams.start ?? startDate,
    };
    try {
      const { data, success }: any = await Fetch("api/dashboard", params);
      if (success) setData(data);
    } catch (error) {
      console.log("fetchSale error:", error);
    }
  };

  const renderIcon = (value: string = "") => {
    if (typeof value !== "string" || value.length === 0) return null;
    return value.trim().startsWith("+") ? (
      <FaArrowUp className="text-green-500" />
    ) : (
      <FaArrowDown className="text-red-500" />
    );
  };

  return (
    <div className="space-y-10">
      {/* CRM Stats */}
      <section className="">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-iconBlack">
            CRM Dashboard <br />
            <span className="text-lg font-medium text-iconBlack">
              - Showing data from the last {dateDiff} day
              {dateDiff > 1 ? "s" : ""}
            </span>
          </h2>
          <DateFilter
            endDate={endDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            fetchFilteredData={fetchData}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-6 md:grid-cols-4">
          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {data?.difference?.totalRevenue}%{" "}
                {renderIcon(data?.difference?.totalRevenue)}
              </p>
              <h3 className="text-sm font-semibold text-gray-400">
                from last month
              </h3>
              <LineGraph
                data={[20, 15, 15, 45, 20, 20, 15]}
                borderColor="rgba(0, 123, 255, 1)"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
              <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                  <IoStatsChart className="text-white text-xl" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-iconBlack">
                  {formatIndianCurrency(data?.currentPeriod?.totalRevenue)}
                </p>
                <h3 className="text-xs text-gray-500 font-semibold">
                  Total Revenue
                </h3>
              </div>
            </div>
          </div>
          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {data?.difference?.activeUsers}%{" "}
                {renderIcon(data?.difference?.activeUsers)}
              </p>
              <h3 className="text-sm font-semibold text-gray-400">
                from last month
              </h3>
              <LineGraph
                data={[20, 25, 20, 45, 20, 30, 50]}
                borderColor="rgba(255, 165, 0, 1)"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
              <div className="bg-orange-200 p-1.5 w-fit rounded-full">
                <div className="bg-orange-500 w-fit p-1.5 rounded-full">
                  <IoStatsChart className="text-white text-xl" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-iconBlack">
                  {formatCompactNumber(data?.currentPeriod?.activeUsers)}
                </p>
                <h3 className="text-xs text-gray-500 font-semibold">
                  Active Users
                </h3>
              </div>
            </div>
          </div>
          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {data?.difference?.totalDeals}%{" "}
                {renderIcon(data?.difference?.totalDeals)}
              </p>
              <h3 className="text-sm font-semibold text-gray-400">
                from last month
              </h3>
              <LineGraph
                data={[20, 45, 15, 20, 10, 50, 15]}
                borderColor="rgba(255, 0, 0, 1)"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
              <div className="bg-red-200 p-1.5 w-fit rounded-full">
                <div className="bg-red-500 w-fit p-1.5 rounded-full">
                  <IoStatsChart className="text-white text-xl" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-iconBlack">
                  {formatCompactNumber(data?.currentPeriod?.totalDeals)}
                </p>
                <h3 className="text-xs text-gray-500 font-semibold">
                  Total Deals
                </h3>
              </div>
            </div>
          </div>
          <div className="p-4 flex gap-2 bg-whiteBg rounded-lg">
            <div className="w-[55%]">
              <p className="text-lg inline-flex items-center text-iconBlack font-bold">
                {data?.difference?.conversionRatio}%
                {renderIcon(data?.difference?.conversionRatio)}
              </p>
              <h3 className="text-sm font-semibold text-gray-400">
                from last month
              </h3>
              <LineGraph
                data={[20, 25, 15, 0, 20, 30, 15]}
                borderColor="rgba(128, 128, 128, 1)"
              />
            </div>
            <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
              <div className="bg-purple-200 p-1.5 w-fit rounded-full">
                <div className="bg-purple-500 w-fit p-1.5 rounded-full">
                  <IoStatsChart className="text-white text-xl" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-iconBlack">
                  {data?.currentPeriod?.conversionRatio}%
                </p>
                <h3 className="text-xs text-gray-500 font-semibold">
                  Conversion Ratio
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 my-5 gap-5 rounded-xl">
          <div className="col-span-2">
            {/* Revenue Chart (example) */}
            {/* <div className="bg-whiteBg p-4 rounded-xl h-full">
              <h3 className="text-xl text-iconBlack font-semibold border-b border-secondary pb-4">
                Revenue Statistics
              </h3>
              <div className="mt-4 bg-infobg p-4 rounded-xl">
                <div className="flex flex-wrap justify-center items-center">
                  <div className="w-1/3 text-center text-sm text-iconBlack font-semibold">
                    Total Revenue:{" "}
                    <span className="text-lg font-extrabold text-iconBlack">
                      {crmStats?.profitReport.revenue}
                    </span>
                  </div>
                  <div className="w-1/3 text-center text-sm text-iconBlack font-semibold">
                    Total Income:{" "}
                    <span className="text-lg font-extrabold text-iconBlack">
                      {crmStats?.profitReport.revenue}
                    </span>
                  </div>
                  <div className="w-1/3 text-center text-sm text-iconBlack font-semibold">
                    Conversion Rate:{" "}
                    <span className="text-lg font-extrabold text-iconBlack">
                      {crmStats?.conversionRatio}
                    </span>
                  </div>
                  <div className="w-1/3 text-center text-sm text-iconBlack font-semibold">
                    Change:{" "}
                    <span className="text-lg font-extrabold text-iconBlack">
                      {crmStats?.profitReport.revenue}
                    </span>
                  </div>
                </div>
              </div>
              <BarChartWithNegativePositiveXAxis />
            </div> */}
          </div>
          <div className="col-span-1 h-full">
            {/* <div className="p-5 rounded-xl bg-whiteBg">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-iconBlack">
                  Profit Report
                </h3>
                <button className="bg-blue-500 text-white rounded-md px-4 py-1">
                  View Details
                </button>
              </div>
              <div className="flex justify-between items-center gap-5">
                <div className="w-1/2">
                  <div className="mt-8 grid grid-cols-1 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-200 p-1.5 w-fit rounded-lg">
                        <div className="bg-blue-500 w-fit p-1.5 rounded-lg">
                          <ImParagraphLeft className="text-white text-xl" />
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {crmStats?.profitReport.profit}
                        </p>
                        <h4 className="text-sm font-semibold">Profit</h4>
                        <p className="text-xs inline-flex items-center text-iconBlack font-bold">
                          1.23% <FaArrowUp />
                        </p>
                        <h3 className="text-xs font-semibold text-gray-400">
                          from last month
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-red-200 p-1.5 w-fit rounded-lg">
                        <div className="bg-red-500 w-fit p-1.5 rounded-lg">
                          <ImParagraphLeft className="text-white text-xl" />
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {crmStats?.profitReport.revenue}
                        </p>
                        <h4 className="text-sm font-semibold">Revenue</h4>
                        <p className="text-xs inline-flex items-center text-iconBlack font-bold">
                          1.23% <FaArrowUp />
                        </p>
                        <h3 className="text-xs font-semibold text-gray-400">
                          from last month
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-orange-200 p-1.5 w-fit rounded-lg">
                        <div className="bg-orange-500 w-fit p-1.5 rounded-lg">
                          <ImParagraphLeft className="text-white text-xl" />
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {crmStats?.profitReport.expenses}
                        </p>
                        <h4 className="text-sm font-semibold">Expenses</h4>
                        <p className="text-xs inline-flex items-center text-iconBlack font-bold">
                          1.23% <FaArrowUp />
                        </p>
                        <h3 className="text-xs font-semibold text-gray-400">
                          from last month
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ConcentricCircleGraph />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
