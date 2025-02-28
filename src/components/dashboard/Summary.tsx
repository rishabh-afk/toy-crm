// import {
//   closedDeals,
//   recentActivity,
//   upcomingMeetings,
// } from "@/data/dashboard";
import useFetch from "@/hooks/useFetch";
// import BarChart from "../chart/Barchart";
import { useRouter } from "next/navigation";
import { endpoints } from "@/data/endpoints";
import { formatCurrency, formatDate } from "@/hooks/general";
// import { FaFileAlt } from "react-icons/fa";

const Summary = () => {
  const router = useRouter();
  const { data } = useFetch(endpoints["Quotation"].fetchAll);
  const updatedData = data?.data.result.slice(0, 5);

  return (
    <>
      {/* <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/4 h-fit bg-whiteBg p-4 rounded-xl">
          <div className="flex justify-between gap-5 border-b border-infobg pb-4 items-center">
            <h2 className="font-semibold text-iconBlack">Closed Deals</h2>
            <button className="text-blue-500 bg-infobg font-semibold text-sm rounded-md whitespace-nowrap px-2 py-1">
              View all
            </button>
          </div>
          <div className="mt-4 space-y-5">
            {closedDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 w-full">
                  <div
                    className={`min-h-10 min-w-10 p-2 text-white aspect-square flex justify-center items-center rounded-full ${deal.color}`}
                  >
                    {deal.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold w-full items-center">
                    <span className="text-iconBlack font-medium inline-flex">
                      {deal.name} -{" "}
                      <span className="font-bold">{deal.amount}</span>
                    </span>
                    <span className="flex justify-between pt-1 font-normal items-center">
                      <span className="text-xs text-gray-500">
                        {deal?.date}
                      </span>
                      <span className="text-white bg-gray-400 px-2 text-xs py-0.5 rounded">
                        {deal?.status}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit lg:w-1/4 bg-whiteBg p-4 rounded-xl">
          <div className="flex justify-between gap-5 border-b border-infobg pb-3 items-center">
            <h2 className="font-semibold text-iconBlack">Website Traffic</h2>
            <button className="text-blue-500 bg-infobg font-semibold text-sm rounded-md whitespace-nowrap px-2 py-1">
              View Details
            </button>
          </div>
          <BarChart />{" "}
        </div>
        <div className="w-full h-fit lg:w-1/4 bg-whiteBg p-4 rounded-xl">
          <div className="flex justify-between gap-3 border-b border-infobg pb-3 items-center">
            <h2 className="font-semibold text-iconBlack">Recent Activity</h2>
            <button className="text-blue-500 bg-infobg font-semibold text-sm rounded-md whitespace-nowrap px-2 py-1">
              View Details
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div
                  className={`min-h-9 min-w-9 flex justify-center items-center text-lg aspect-square rounded-full ${activity.icon}`}
                >
                  <FaFileAlt color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {activity.title}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {activity.description}
                  </span>
                  <span className="text-right flex flex-col">
                    {activity.user && (
                      <span className="text-gray-500 text-xs">
                        - {activity.user}
                      </span>
                    )}
                    <span className="text-gray-500 text-xs">
                      {activity.time}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit lg:w-1/4 bg-whiteBg p-4 rounded-xl">
          <div className="flex justify-between gap-5 border-b border-infobg pb-3 items-center">
            <h2 className="font-semibold text-iconBlack">Upcoming Meetings</h2>
            <button className="text-blue-500 bg-infobg font-semibold text-sm rounded-md whitespace-nowrap px-2 py-1">
              View all
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex justify-between w-full items-center gap-3">
                  <div className="font-medium w-12 aspect-square flex justify-center items-center bg-infobg text-gray-500 text-center text-xs p-2 rounded-lg">
                    {meeting.date.slice(0, 8)}
                  </div>
                  <div className="text-iconBlack text-sm font-semibold">
                    <p>{meeting.title}</p>
                    <p className="font-normal text-gray-600">
                      {meeting.description}
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm">{meeting.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Recent Deals */}
      <section className="px-6 py-4 bg-whiteBg rounded-xl mt-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-iconBlack font-semibold">
            Recent Deals Status
          </h2>
          <button
            type="button"
            onClick={() => router.push("/dashboard/quotation")}
            className="text-blue-500 bg-infobg font-semibold text-sm rounded-md whitespace-nowrap px-2 py-1"
          >
            View Details
          </button>
        </div>
        <table className="w-full mt-4 text-sm">
          <thead className="text-base text-iconBlack text-left">
            <tr>
              <th className="p-4 border border-infobg">Deal ID</th>
              <th className="p-4 border border-infobg">Client</th>
              <th className="p-4 border border-infobg">Deal Value</th>
              <th className="p-4 border border-infobg">Deal Status</th>
              <th className="p-4 border border-infobg">Approved On</th>
              <th className="p-4 border border-infobg">Salesperson</th>
              <th className="p-4 border border-infobg">Salesperson (Email)</th>
              {/* <th className="p-4 border border-infobg">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {updatedData?.length > 0 &&
              updatedData.map((deal: any) => (
                <tr
                  key={deal._id}
                  className="border-b border-infobg text-iconBlack hover:bg-infobg cursor-pointer"
                >
                  <td className="p-4 border border-infobg">
                    Quotation_{deal.quotationNo}
                  </td>
                  <td className="p-4 capitalize border border-infobg">
                    {deal.customerName}
                  </td>
                  <td className="p-4 border border-infobg">
                    {formatCurrency(deal.netAmount)}
                  </td>
                  <td className="p-4 border border-infobg">
                    <span
                      className={`px-2 py-1 text-xs text-white rounded ${
                        deal.status === "Approved"
                          ? "bg-green-500"
                          : deal.dealStatus === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {deal.status}
                    </span>
                  </td>
                  <td className="p-4 border border-infobg">
                    {deal.approvedOn ? formatDate(deal.approvedOn) : "-"}
                  </td>
                  <td className="p-4 border border-infobg">
                    {deal.preparedByName}
                  </td>
                  <td className="p-4 border border-infobg">
                    {deal.preparedByEmail}
                  </td>
                  {/* <td className="p-4 border border-infobg">
                  <button className="bg-blue-400 text-white rounded text-lg p-1 hover:text-indigo-800 mr-2">
                    <FaEye />
                  </button>
                  <button className="bg-gray-400 text-white rounded text-lg p-1 hover:text-green-800">
                    <FaArrowDown />
                  </button>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Summary;
