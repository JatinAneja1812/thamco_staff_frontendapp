import React from "react";
import styled from "styled-components";
import useChart from "./useChart";

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartWrapper = styled.div`
  width: 48%; /* Adjust the width as needed */
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
