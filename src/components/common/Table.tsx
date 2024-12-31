"use client";

import dayjs from "dayjs";
import Modal from "./Modal";
import FormRenderer from "./FormRender";
import NoDataFound from "./NoDataFound";
import { FaFilter } from "react-icons/fa";
import { endpoints } from "@/data/endpoints";
import { BsFilterLeft } from "react-icons/bs";
import { Delete, Fetch } from "@/hooks/apiUtils";
import GenerateExcelButton from "./GenerateExcel";
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../crud/ConfirmationModal";
import ConfirmationOfferModal from "../crud/ConfirmationOfferModal";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface TableColumn {
  key: string;
  label: string;
  isDate?: boolean;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableProps {
  data: any;
  type?: any;
  hideStatus?: boolean;
  columns: TableColumn[];
  operationsAllowed: any;
  pagination_data?: Pagination;
}

interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const TableComponent = <T extends { [key: string]: any }>({
  data,
  type,
  columns,
  hideStatus,
  pagination_data,
  operationsAllowed,
}: TableProps) => {
  const [paginate, setPaginate] = useState<Pagination>({
    totalPages: pagination_data?.totalPages ?? 1,
    totalItems: pagination_data?.totalItems ?? 0,
    currentPage: pagination_data?.currentPage ?? 1,
    itemsPerPage: pagination_data?.itemsPerPage ?? 10,
  });
  const [activeStatus, setActiveStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sort, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });
  const [formData, setData] = useState<any>({});
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formConfig, setFormConfig] = useState<any>("");
  const [showOfferModal, setOfferModal] = useState(false);
  const [showOfferModalID, setOfferModalID] = useState("");
  const [organisationId, setOrganisationId] = useState<any>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<T>>(data ?? []);
  const [selectIdForDeletion, setSelectIdForDeletion] = useState<string>("");

  const handleCloseModal = () => {
    setFormConfig("");
    setIsModalVisible(false);
  };

  const handleActiveStatus = (activeStatus: any) => {
    setActiveStatus(activeStatus);
    if (activeStatus === "all") return handleReset();
    fetchFilteredData({ status: activeStatus });
  };

  const handleReset = async () => {
    setEndDate("");
    setStartDate("");
    setSearchTerm("");
    setOrganisationId("");
    setActiveStatus("all");
    await fetchFilteredData({
      limit: 10,
      page: 1,
      end: "",
      start: "",
      sortkey: "",
      sortdir: "",
      status: "all",
    });
  };
  const handleEdit = async (id?: string) => {
    let resp: any;
    if (id && id !== "") {
      const endpoint = endpoints[type].read;
      if (endpoint) resp = await Fetch(`${endpoint}${id}`);
    }
    if (resp?.success && (resp?.data?._id || resp?.data?.result?._id))
      setData(resp.data.result ? resp.data.result : resp.data);
    else setData({});
    setIsModalVisible(true);
  };
  const handleDelete = async (id: string) => {
    setSelectIdForDeletion(id);
    if (!showDeleteModal) return setShowDeleteModal(true);
    if (type && id) {
      const deleteEndpoint = endpoints[type].delete;
      const fetchEndpoint = endpoints[type].fetchAll;

      if (deleteEndpoint && fetchEndpoint) {
        await Delete(`${deleteEndpoint}${id}`);
        const response: any = await Fetch(fetchEndpoint);

        if (response?.success) {
          setShowDeleteModal(false);
          setFilteredData(
            response?.data?.result ? response?.data?.result : response?.data
          );
          setPaginate(response?.data?.pagination);
        } else window.location.reload(); // TODO: handle this more gracefully in the future
      }
    }
  };

  const debounce = (func: any, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchFilteredData = async (filterParams?: any) => {
    const data = {
      end: filterParams?.end ?? endDate,
      sortkey: filterParams?.key ?? sort.key,
      start: filterParams?.start ?? startDate,
      sortdir: filterParams?.dir ?? sort.direction,
      status: filterParams?.status ?? activeStatus,
      current: filterParams?.page ?? paginate.currentPage,
      limit: filterParams?.limit ?? paginate.itemsPerPage,
      orgId: filterParams?.organisationId ?? "",
    };

    setPaginate({
      ...paginate,
      currentPage: data.current,
      itemsPerPage: data.limit,
    });
    const params: any = { page: data.current, limit: data.limit };

    if (searchTerm && searchTerm.length > 3)
      Object.assign(params, { search: searchTerm });
    if (activeStatus !== "all" && data?.status !== "all")
      Object.assign(params, {
        status: data?.status ? data.status : activeStatus,
      });

    if (organisationId || data?.orgId)
      Object.assign(params, { orgId: data?.orgId ?? organisationId });
    if (startDate || data?.start)
      Object.assign(params, {
        startDate: dayjs(data?.start ?? startDate).format("YYYY-MM-DD"),
      });
    if (endDate || data?.end)
      Object.assign(params, {
        endDate: dayjs(data?.end ?? endDate).format("YYYY-MM-DD"),
      });

    if (sort.key || data?.sortkey)
      Object.assign(params, {
        sortkey: data?.sortkey ?? sort.key,
        sortdir: data?.sortdir ?? sort.direction,
      });

    const fetchEndpoint = endpoints[type]?.fetchAll;
    if (fetchEndpoint) {
      const response: any = await Fetch(`${fetchEndpoint}`, params);
      if (response?.success) {
        setFilteredData(response?.data?.result || []);
        setPaginate(response?.data?.pagination);
      }
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sort.key === key && sort.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    fetchFilteredData({ key, dir: direction });
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden"; // prevent overflow
    } else document.body.style.overflow = "scroll";
  }, [isModalVisible]);

  if (filteredData.length === 0 && !isModalVisible)
    return (
      <NoDataFound
        type={type}
        debounce={debounce}
        handleEdit={handleEdit}
        handleReset={handleReset}
        operationsAllowed={operationsAllowed}
      />
    );

  const handleDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal
        formtype={
          formConfig ? "" : formData._id ? "Edit " + type : "Add " + type
        }
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      >
        {type && formData && (
          <FormRenderer
            data={formData}
            setPaginate={setPaginate}
            onClose={handleCloseModal}
            setFilteredData={setFilteredData}
            formType={formConfig ? formConfig : type}
          />
        )}
      </Modal>
      <Modal isVisible={showDeleteModal} onClose={handleDeleteModal}>
        <ConfirmationModal
          id={selectIdForDeletion}
          handleDelete={handleDelete}
          handleDeleteModal={handleDeleteModal}
        />
      </Modal>
      <Modal isVisible={showOfferModal} onClose={() => setOfferModal(false)}>
        <ConfirmationOfferModal
          setOfferModalID={setOfferModalID}
          setFilteredData={setFilteredData}
          showOfferModalID={showOfferModalID}
          closeModal={() => setOfferModal(false)}
        />
      </Modal>
      <div className="flex bg-white p-5 rounded-2xl justify-between items-center">
        <h2 className={`text-3xl text-black font-semibold w-fit`}>
          All {type}
        </h2>
        <div className="space-x-2 flex">
          <GenerateExcelButton data={filteredData} />
          <button
            type="button"
            onClick={debounce(handleReset, 1000)}
            className="bg-white text-black border flex gap-2 justify-center items-center border-gray-200 outline-none px-4 text-lg py-2 hover:border-primary rounded-xl hover:bg-primary hover:text-white"
          >
            Clear filters <FaFilter />
          </button>
          {operationsAllowed?.create && (
            <button
              className="bg-primary text-white px-4 py-1 rounded-xl"
              type="button"
              onClick={() => handleEdit("")}
            >
              Add {type}
              <sup>+</sup>
            </button>
          )}
        </div>
      </div>
      <div className="py-5">
        {/* Search and Filters */}
        <div className="flex gap-5 bg-white p-5 rounded-2xl justify-between items-end mb-4">
          <div>
            <p className="flex text-black font-medium gap-2 items-center pb-1">
              <BsFilterLeft size={25} /> Filters
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search here..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-4 text-lg py-2 placeholder:text-black rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-black border-gray-200 w-full"
              />
              <button
                type="button"
                className="border px-4 text-lg py-2 rounded-xl text-black border-gray-200 bg-white hover:bg-primary hover:text-white"
                onClick={debounce(() => fetchFilteredData(), 500)}
              >
                Search
              </button>
            </div>
          </div>
          {!hideStatus && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium">Status:</label>
              <select
                value={activeStatus}
                onChange={(e) => handleActiveStatus(e.target.value as any)}
                className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-black border-gray-200"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-black font-medium">Page:</label>
            <select
              value={paginate.itemsPerPage}
              onChange={(e: any) =>
                fetchFilteredData({ limit: e.target.value })
              }
              className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-black border-gray-200"
            >
              {[5, 10, 20, 50, 100].map((items) => (
                <option key={items} value={items}>
                  {items}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium">Start Time:</label>
              <input
                type="date"
                value={startDate as any}
                onChange={(e) => {
                  setStartDate(e.target.value as any);
                  if (endDate) fetchFilteredData({ start: e.target.value });
                }}
                max={endDate as any}
                className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-black border-gray-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-black font-medium">End Time:</label>
              <input
                type="date"
                value={endDate as any}
                onChange={(e) => {
                  setEndDate(e.target.value as any);
                  if (startDate) fetchFilteredData({ end: e.target.value });
                }}
                min={startDate as any}
                className="border px-4 text-lg py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-black border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white p-5 rounded-2xl">
          <table className="min-w-full max-w-auto overflow-hidden">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ maxWidth: `calc(100% /${columns.length + 1} )` }}
                    className="p-4 text-gray-700 font-bold border border-gray-200 text-left cursor-pointer"
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    {col.label}
                    {col.sortable && (
                      <>
                        {sort.key === col.key && sort.direction === "asc" ? (
                          <FaSortUp className="inline ml-2" />
                        ) : sort.key === col.key &&
                          sort.direction === "desc" ? (
                          <FaSortDown className="inline ml-2" />
                        ) : (
                          <FaSort className="inline ml-2" />
                        )}
                      </>
                    )}
                  </th>
                ))}
                {operationsAllowed?.read && (
                  <th className="p-4 border text-left text-black border-gray-200 font-bold">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.length > 0 &&
                filteredData.map((row: any, index: any) => (
                  <tr
                    key={index}
                    className="border text-black border-gray-200 cursor-pointer"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="text-sm border border-gray-200 px-4 py-3"
                      >
                        {col.isDate
                          ? dayjs(row[col.key]).format("YYYY-MM-DD")
                          : col.key === "_id" || col.key === "conversationId"
                          ? row[col.key].slice(-8)
                          : row[col.key] === false
                          ? "false"
                          : row[col.key] === true
                          ? "true"
                          : row[col.key] === 0 || row[col.key] === 1
                          ? parseInt(row[col.key])
                          : row[col.key]
                          ? row[col.key].toString().slice(0, 75)
                          : ""}
                      </td>
                    ))}
                    {operationsAllowed?.read && (
                      <td className="px-4 py-3 text-nowrap flex h-full justify-center items-center">
                        {operationsAllowed?.update && (
                          <button
                            onClick={() => handleEdit(row?._id)}
                            className="text-blue-500 text-xl hover:scale-125 hover:p-1 mr-1 hover:bg-blue-100 p-1 rounded transition"
                          >
                            <FaEdit title="Edit" />
                          </button>
                        )}
                        {operationsAllowed?.delete && (
                          <button
                            onClick={() => handleDelete(row?._id)}
                            className="text-red-700 text-xl hover:scale-125 hover:p-1 hover:bg-red-100 p-1 rounded transition"
                          >
                            <FaTrash title="Delete" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={debounce(
              () => fetchFilteredData({ page: paginate.currentPage - 1 }),
              100
            )}
            disabled={paginate.currentPage === 1}
            className="border border-primary text-black rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-semibold text-gray-700">
            Showing {(paginate.currentPage - 1) * paginate.itemsPerPage + 1} to{" "}
            {paginate.totalItems < paginate.itemsPerPage * paginate.currentPage
              ? paginate.totalItems
              : paginate.itemsPerPage * paginate.currentPage}{" "}
            of {paginate.totalItems} entries
          </span>
          <button
            onClick={debounce(
              () => fetchFilteredData({ page: paginate.currentPage + 1 }),
              100
            )}
            disabled={paginate.currentPage === paginate.totalPages}
            className="border border-primary hover:bg-primary hover:text-white text-black rounded-md px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
