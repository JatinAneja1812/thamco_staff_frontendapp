import { useEffect } from 'react';
import { Chart } from 'chart.js/auto'; // Update this import based on your Chart.js version
import styled from 'styled-components';

const ChartWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px; // Set an appropriate height
`;

const useChart = ({ type, data, options, chartId }) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId).getContext('2d');
    const chart = new Chart(ctx, { type, data, options });

    return () => {
      chart.destroy(); // Destroy the chart when the component unmounts
    };
  }, [type, data, options, chartId]);

  return (
    <ChartWrapper>
      <ChartContainer>
        <canvas id={chartId} />
      </ChartContainer>
    </ChartWrapper>
  );
};

export default useChart;