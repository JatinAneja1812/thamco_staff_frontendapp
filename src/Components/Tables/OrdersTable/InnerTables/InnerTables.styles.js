import {Table} from 'antd';
import styled from 'styled-components';

const InnerTablesWrapper = styled(Table)`

  overflow: hidden;
  overflow-x: auto;
  background-color: #transparent;
  color: #000;
  
  .ant-table-body {
    overflow-x: auto;
  }

  .ant-table.ant-table-bordered{
    background-color: transparent !Important;
    margin: -2px 0px 0px 35px !Important;
  }

  .ant-table-bordered.ant-table-thead > tr > th, .ant-table-bordered.ant-table-tbody > tr > td {
    border-right: 0px solid #e9e9e9 !Important;
  }


  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    white-space: nowrap;
    text-align: ${(props) => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
    height: 13px;
    padding: 9px;
    p {
      margin-bottom: 0;
    }
  }

  .ant-table-tbody > tr.dummy-row > td {
    span {
      display: none;
    }

    svg {
      display: none;
    }
  }

  .ant-table-tbody > tr.ant-table-row-level-0.ok:hover > td {
    background: unset !important;
  }

  .ant-table-tbody > tr.ant-table-row-level-0.delayed-communication:hover > td {
    background: unset !important;
  }

  .ant-table-tbody > tr.ant-table-row-level-0.lost-communication:hover > td {
    background: unset !important;
  }

  table tr td.ant-table-selection-column {
    text-align: center !important;
  }

  .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td,
  .ant-table-tbody > tr:hover > td {
    background-color: transparent;
  }

  .ant-table-pagination {
    margin-right: 5px;
  }

}

  .ant-table-header {
    background-color: transparent;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
  }


  .ant-table-content {
    overflow-x: auto;
  }

  .ant-table-column-title {
    position: relative;
    z-index: 1;
    flex: 1;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }

  &.collapsed {
    height: 0;
  }
`;

export default InnerTablesWrapper;