import React, {useEffect} from 'react'
import CustomersTable from '../../Tables/CustomersTable/CustomersTable';

export default function CustomersPage(props) {
    useEffect(() => {
        console.log(props.customers)
    }, []); // Dependency array, if empty, useEffect runs only once, when components mounts

    return (
    
        <CustomersTable
            dataSource={props.customers}
            isLoading={props.isLoading}
            serverError={props.serverError}
        />
    );
};

