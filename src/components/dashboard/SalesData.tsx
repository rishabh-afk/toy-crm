"use client";

import { toast } from "react-toastify";
import { Fetch } from "@/hooks/apiUtils";
import {
  dashboardTitle,
  dashboardTitleUSD,
  DashboardEndpoint as endpoint,
} from "@/data/endpoints";
import { useCallback, useEffect, useState } from "react";

const SalesCard = (data: any) => {
  const {
    total,
    title,
    last,
    current,
    comparison: description,
    comparison2: description2,
  } = data;
  const percentageDifference =
    current.INR - last.comparativeINR >= 0
      ? (current.INR - last.comparativeINR) / 100
      : (last.comparativeINR - current.INR) / 100;
  return (
    <div className="bg-primary/10 p-2 rounded-lg shadow-md mb-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        <span className="bg-green-200 text-green-700 px-1 py-[2px] text-[10px] rounded-md">
          {current.INR - last.comparativeINR > 0 ? "+" : "-"}
          {percentageDifference}%{" "}
          {current.INR - last.comparativeINR > 0 ? "⬆" : "⬇"}
        </span>
      </div>
      <div className="my-2">
        <p className="text-xl font-bold text-primary">
          ₹ {current.INR.toLocaleString("en-IN")}
        </p>
        <p className="text-sm text-gray-500">Total</p>
      </div>
      <div>
        {((description && last > 0) || last === 0) && (
          <p className="text-[10px] text-gray-600">
            {description}{" "}
            <span className="font-semibold">
              {last.toLocaleString("en-IN")}
            </span>
          </p>
        )}
        {description2 && (
          <p className="text-[10px] text-gray-600">
            {description2}{" "}
            <span className="font-semibold">
              {current.INR - last.comparativeINR >= 0 ? "+ ₹" : "- ₹"}{" "}
              {current.INR - last.comparativeINR > 0
                ? (current.INR - last.comparativeINR).toLocaleString("en-IN")
                : (last.comparativeINR - current.INR).toLocaleString("en-IN")}
            </span>
          </p>
        )}
        {last?.UserCount === 0 || last?.UserCount > 0 ? (
          <>
            <p className="text-[10px] text-gray-600">
              Previous Users:{" "}
              <span className="font-semibold">{last.UserCount}</span>
            </p>
            <p className="text-[10px] text-gray-600">
              New Users:{" "}
              <span className="font-semibold">
                {current.UserCount}{" "}
                {current.UserCount - last.UserCount > 0 ? "⬆" : "⬇"}
              </span>
            </p>
          </>
        ) : (
          <p className="text-[10px] text-gray-600">
            Total Users:{" "}
            <span className="font-semibold">{current.UserCount}</span>
          </p>
        )}
        <p className="text-[10px] text-gray-600">
          Total Transactions:{" "}
          <span className="font-semibold">
            {current.countsINR}{" "}
            {current.countsINR - last.countsCompINR > 0 ? "⬆" : "⬇"}
          </span>
        </p>
        {total && (
          <p className="text-[10px] text-gray-600">
            Total Therapists: <span className="font-semibold">{total}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const SalesCardUSD = (data: any) => {
  const {
    total,
    title,
    last,
    current,
    comparison: description,
    comparison2: description2,
  } = data;
  const percentageDifference =
    current.USD - last.comparativeUSD >= 0
      ? (current.USD - last.comparativeUSD) / 100
      : (last.comparativeUSD - current.USD) / 100;
  return (
    <div className="bg-primary/10 p-2 rounded-lg shadow-md mb-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        <span className="bg-green-200 text-green-700 px-1 py-[2px] text-[10px] rounded-md">
          {current.USD - last.comparativeUSD > 0 ? "+" : "-"}
          {percentageDifference}%{" "}
          {current.USD - last.comparativeUSD > 0 ? "⬆" : "⬇"}
        </span>
      </div>
      <div className="my-2">
        <p className="text-xl font-bold text-primary">
          $ {current.USD.toLocaleString("en-IN")}
        </p>
        <p className="text-sm text-gray-500">Total</p>
      </div>
      <div>
        {((description && last > 0) || last === 0) && (
          <p className="text-[10px] text-gray-600">
            {description}{" "}
            <span className="font-semibold">
              {last.toLocaleString("en-IN")}
            </span>
          </p>
        )}
        {description2 && (
          <p className="text-[10px] text-gray-600">
            {description2}{" "}
            <span className="font-semibold">
              {current.USD - last.comparativeUSD >= 0 ? "+ $" : "- $"}{" "}
              {current.USD - last.comparativeUSD > 0
                ? (current.USD - last.comparativeUSD).toLocaleString("en-IN")
                : (last.comparativeUSD - current.USD).toLocaleString("en-IN")}
            </span>
          </p>
        )}
        {last?.UserCount === 0 || last?.UserCount > 0 ? (
          <>
            <p className="text-[10px] text-gray-600">
              Previous Users:{" "}
              <span className="font-semibold">{last.UserCount}</span>
            </p>
            <p className="text-[10px] text-gray-600">
              New Users:{" "}
              <span className="font-semibold">
                {current.UserCount}{" "}
                {current.UserCount - last.UserCount > 0 ? "⬆" : "⬇"}
              </span>
            </p>
          </>
        ) : (
          <p className="text-[10px] text-gray-600">
            Total Users:{" "}
            <span className="font-semibold">{current.UserCount}</span>
          </p>
        )}
        <p className="text-[10px] text-gray-600">
          Total Transactions:{" "}
          <span className="font-semibold">
            {current.countsUSD}{" "}
            {current.countsUSD - last.countsCompUSD > 0 ? "⬆" : "⬇"}
          </span>
        </p>
        {total && (
          <p className="text-[10px] text-gray-600">
            Total Therapists: <span className="font-semibold">{total}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const SalesData = () => {
  const [currency, setCurrency] = useState("INR");
  const [data, setData] = useState<any>({
    allTime: {},
    days: {},
    months: {},
    weeks: {},
    years: {},
    total: 0,
  });
  const [loading, setLoading] = useState<any>(true);

  const fetchSales = useCallback(async () => {
    const { data, message, success }: any = await Fetch(endpoint["fetchSale"]);
    if (success) {
      setData(data);
      setLoading(false);
    } else toast.error(message);
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  if (loading) return null;

  return (
    <>
      <div className="flex justify-end items-center gap-5 pb-5">
        <button
          onClick={() => setCurrency("INR")}
          className={`border border-primary rounded-lg px-6 text-base py-1 font-medium ${
            currency === "INR"
              ? "bg-primary text-white"
              : "text-primary bg-white"
          }`}
        >
          In INR
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={`border border-primary rounded-lg px-6 text-base py-1 font-medium ${
            currency === "USD"
              ? "bg-primary text-white"
              : "text-primary bg-white"
          }`}
        >
          In USD
        </button>
      </div>
      {currency === "INR" ? (
        <div className="grid grid-cols-5 gap-4 rounded-lg">
          <SalesCard {...data.days} {...dashboardTitle["Today"]} />
          <SalesCard {...data.weeks} {...dashboardTitle["Week"]} />
          <SalesCard {...data.months} {...dashboardTitle["Month"]} />
          <SalesCard {...data.years} {...dashboardTitle["Year"]} />
          <SalesCard
            {...data.allTime}
            total={data.total}
            {...dashboardTitle["AllTime"]}
          />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 rounded-lg">
          <SalesCardUSD {...data.days} {...dashboardTitleUSD["Today"]} />
          <SalesCardUSD {...data.weeks} {...dashboardTitleUSD["Week"]} />
          <SalesCardUSD {...data.months} {...dashboardTitleUSD["Month"]} />
          <SalesCardUSD {...data.years} {...dashboardTitleUSD["Year"]} />
          <SalesCardUSD
            {...data.allTime}
            total={data.total}
            {...dashboardTitleUSD["AllTime"]}
          />
        </div>
      )}
    </>
  );
};

export default SalesData;
