import React from "react";
import styled from "styled-components";
import useChart from "./useChart";

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap onto the next line */
  justify-content: space-around; /* Adjust as needed */
  align-items: center;
  background: #fff;
`;

const SectionTitle = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  color: #333; /* Adjust the color as needed */
`;

const ChartWrapper = styled.div`
  height: 50vh;
  width: 48%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  background: #fcfff7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ChartTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333; /* Adjust the color as needed */
`;

const ChartsDashboard = () => {
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Customer Visits",
        data: [12, 19, 3, 5, 2, 3, 15],
        backgroundColor: "rgb(27 109 4 / 49%)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Sales",
        data: [5, 8, 2, 10, 3, 6, 7],
        fill: false,
        borderColor: "rgb(27 109 4 / 49%)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardContainer>
      <SectionTitle>Statistics</SectionTitle>
      <ChartWrapper>
        <ChartTitle>Customer Visits</ChartTitle>
        {useChart({
          type: "bar",
          data: barChartData,
          options: chartOptions,
          chartId: "barChart",
        })}
      </ChartWrapper>
      <ChartWrapper>
        <ChartTitle>Sales</ChartTitle>
        {useChart({
          type: "line",
          data: lineChartData,
          options: chartOptions,
          chartId: "lineChart",
        })}
      </ChartWrapper>
    </DashboardContainer>
  );
};

export default ChartsDashboard;
