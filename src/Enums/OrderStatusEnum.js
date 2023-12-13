const OrderStatusEnum = {
    Created: {VALUE: 101, STRING: 'Created'},
    Processing: {VALUE: 102, STRING: 'Processing'},
    Waiting: {VALUE: 103, STRING: 'Waiting'},
    Cancelled: {VALUE: 104, STRING: 'Cancelled'},
    Dispatched: {VALUE: 105, STRING: 'Dispatched'},
    Delivered: {VALUE: 106, STRING: 'Delivered'},
    Error: {VALUE: 107, STRING: 'Error'}
};

const OrderStatusStringEnum = {
    101: 'Created',
    102: 'Processing',
    103: 'Waiting',
    104: 'Cancelled',
    105: 'Dispatched',
    106: 'Delivered',
    107: 'Error'
};

export { OrderStatusEnum, OrderStatusStringEnum }