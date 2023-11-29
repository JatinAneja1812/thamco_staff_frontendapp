import styled from 'styled-components';

const DropdownWrapper = styled.div`
    display: flex;
    flex-flow: row;
    border-radius: 4px;

    .search-input {
        border-radius: 4px 0 0 4px !important;
    }

    .search-btn {
        border-radius: 0px;
    }

    .reset-btn {
        border-radius: 0px;
    }
`;

export default DropdownWrapper;