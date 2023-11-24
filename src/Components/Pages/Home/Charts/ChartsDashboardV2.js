import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const ChartsContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 12px;
  margin-top: 0px;
  height: 70vh;
  background: #fff;

  div {
    width: 51vh;
    height: 65vh;
    position: relative;
    border-radius: 10%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
    overflow: hidden;
  }

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const SatisfactionPieCharts = () => {
  const satisfactionData = {
    labels: ["Satisfied", "Neutral", "Unsatisfied"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
        hoverBackgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
      },
    ],
  };

  const responseTimeData = {
    labels: ["Fast", "Average", "Slow"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
        hoverBackgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
      },
    ],
  };

  const issueResolutionData = {
    labels: ["Quick", "Moderate", "Long"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
        hoverBackgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <ChartsContainer>
      <div>
        <h3>Customer Satisfaction</h3>
        <Doughnut data={satisfactionData} options={chartOptions} width={150} height={150} />
      </div>
      <div>
        <h3>Response Time</h3>
        <Doughnut data={responseTimeData} options={chartOptions} width={150} height={150} />
      </div>
      <div>
        <h3>Issue Resolution Time</h3>
        <Doughnut data={issueResolutionData} options={chartOptions} width={150} height={150} />
      </div>
    </ChartsContainer>
  );
};

export default SatisfactionPieCharts;