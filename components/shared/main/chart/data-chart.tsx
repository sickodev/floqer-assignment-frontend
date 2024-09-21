import { ChartContainer } from "@/components/ui/chart";
import React from "react";
import { chartConfig } from "./chart-config";
import {
  Bar,
  BarChart,
  CartesianGrid,
} from "recharts";

const DataChart = ({ data }: { data: TableData[] }) => {
  const years = Array.from(new Set(data.map((item) => item.work_year)));
  const numberOfJobs: number[] = [];
  const averageSalaries: number[] = [];

  // Calculate average salary and number of jobs per year
  for (const year of years) {
    const jobsInYear = data.filter((item) => item.work_year === year);
    numberOfJobs.push(jobsInYear.length);
    const avgSalary =
      jobsInYear.reduce(
        (acc, curr) => acc + parseFloat(curr.salary_in_usd),
        0
      ) / jobsInYear.length;
    averageSalaries.push(avgSalary);
  }

  const chartData = [];
  for (let index = 0; index < years.length; index++) {
    chartData.push({
      year: years[index],
      averageSalary: averageSalaries[index],
      numberOfJob: numberOfJobs[index],
    });
  }
  return (
    <ChartContainer config={chartConfig} className="max-h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>

      <h3>
        Couldn't build a chart. The data manipulation was tough :(
      </h3>
    </ChartContainer>
  );
};

export default DataChart;
