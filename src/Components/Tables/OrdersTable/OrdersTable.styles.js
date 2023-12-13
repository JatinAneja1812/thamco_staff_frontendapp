import { Table } from "antd";
import styled from "styled-components";

const OrdersTableWrapper = styled(Table)`
  width: 96%; // Set a fixed width for the table
  margin: 0 auto; // Center the table horizontally
  overflow-x: auto; // Allow horizontal scrolling

  .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px; // Adjust the top margin for better spacing
  }
  .folder {
    cursor: pointer;
  }

  // Filter icon
  span.ant-dropdown-trigger.ant-table-filter-trigger {
    color: #ffffff;
  }

  .ant-pagination-item.ant-pagination-item-1.ant-pagination-item-active{
    border-color: #265c36 !important;
  }

  .ant-pagination-item.ant-pagination-item-1.ant-pagination-item-active a{
    display: inline !important;
    border-color: #265c36 !important;
    color: #265c36 !important;
  }

  // Filter icon active
  span.ant-dropdown-trigger.ant-table-filter-trigger.active {
    color: #000000;
    background-color: #ffffff;
  }

  // Sorter "up" icon
  span.anticon.anticon-caret-up.ant-table-column-sorter-up {
    color: #ffffff;
  }

  // Sorter "up" icon active
  span.anticon.anticon-caret-up.ant-table-column-sorter-up.active {
    color: #000000;
    background-color: #ffffff;
    border-radius: 3px;
  }

  // Sorter "down" icon
  span.anticon.anticon-caret-down.ant-table-column-sorter-down {
    color: #ffffff;
  }

  // Sorter "down" icon active
  span.anticon.anticon-caret-down.ant-table-column-sorter-down.active {
    color: #000000;
    background-color: #ffffff;
    border-radius: 3px;
  }

  // Table header
  .ant-table-thead .ant-table-cell {
    background-color: rgb(67, 94, 56);
    color: #ffffff;
  }

  // Header cells of the table on hover
  .ant-table-thead .ant-table-cell:hover {
    background-color: rgb(67, 94, 56) !important;
  }

  // Table headers when the sorter is enabled
  th.ant-table-cell.ant-table-column-sort.ant-table-column-has-sorters {
    background-color: rgb(67, 94, 56) !important;
  }

  // The "border" between the table header columns
  th.ant-table-cell.ant-table-column-has-sorters:hover:before {
    background-color: #f0f0f0 !important;
  }

  // Border radius of the first cell inside the table header
  .ant-table-thead .ant-table-cell:first-child {
    border-start-start-radius: 4px !important;
  }

  // Border radius of the last cell inside the table header
  .ant-table-thead .ant-table-cell:last-child {
    border-start-end-radius: 4px !important;
  }

  .deleteBtn > Button:hover {
    border-color: red;
  }

  // Border between table rows imitating margin between rows
  .ant-table-tbody > tr.ant-table-row > td {
    border-bottom: solid 2.5px #f3f3f3;
    border-top: solid 2.5px #f3f3f3;
  }

  // Border of the first child of the row (first <td> element on the far left)
  .ant-table-tbody > tr.ant-table-row > td:first-child {
    border-left: solid 0.5px #f3f3f3;
  }

  // Border of the first child of the row (first <td> element on the far right)
  .ant-table-tbody > tr.ant-table-row > td:last-child {
    border-right: solid 0.5px #f3f3f3;
  }

  // Main styling on :hover event for the table row
  .ant-table-tbody > tr.ant-table-row:hover > td {
    border-bottom: solid 0.5px #2f762c;
    border-top: solid 0.5px #2f762c;
    background-color: rgba(67, 94, 56, 0.15);
  }

  .ant-table-tbody > tr.ant-table-row:hover > td:first-child {
    //border-left: solid 0.5px #0093DD;                  
  }

  .ant-table-tbody > tr.ant-table-row:hover > td:last-child {
    //border-right: solid 0.5px #0093DD;        
  }

  .ant-table-row-selected > td {
    border-bottom: solid 0.5px #2f762c !important;
    border-top: solid 0.5px #2f762c !important;
    background: rgba(67, 94, 56, 0.15);
  }
`;
export default OrdersTableWrapper;
