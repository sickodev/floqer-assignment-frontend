"use client";
import React, { useEffect, useState } from "react";
import { H1 } from "../common/H1";
import axios, { AxiosResponse } from "axios";
import DataTable from "./main/table/data-table";
import DataChart from "./main/chart/data-chart";



const BaseTable = ({
  tableRef,
}: {
  tableRef: React.RefObject<HTMLDivElement>;
}) => {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res: AxiosResponse<TableData[]> = await axios.get(
          "https://floqer-backend-ubn6.onrender.com/api/v1/store"
        );
        setData(res.data); // Ensure the response matches TableData[]
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  return (
    <section
      ref={tableRef}
      id="base-table" // Correct the ID
      className="h-full w-full space-y-6 p-2"
    >
      <H1>All ML Engineer Salaries from 2020 to 2024.</H1>
      <DataTable data={data}/>
      <DataChart data={data}/>
    </section>
  );
};

export default BaseTable;
