import React from "react";
import { Form, Input, Row, Col } from "antd";
import { StyledModal } from "../StyledModal";

export default function AddFundsModal(props) {
  const [form] = Form.useForm();

  // Check if props.recordToEdit is not null before accessing its properties
  const formattedAddress = props.recordToEdit
    ? `${props.recordToEdit.locationNumber} ${props.recordToEdit.street}\n${props.recordToEdit.city}\n${props.recordToEdit.state} ${props.recordToEdit.postalCode}`
    : "";

  const formatedName = props.recordToEdit
    ? `${props.recordToEdit.firstName} ${props.recordToEdit.lastName}`
    : "";

  // Set initial values for the form fields based on props.recordToEdit (if it exists)
  form.setFieldsValue({
    userId:  props.recordToEdit ? props.recordToEdit.userId : undefined,
    name: formatedName,
    email: props.recordToEdit ? props.recordToEdit.email : undefined,
    address: formattedAddress,
    // Add more fields as needed
  });

  return (
    <StyledModal
      title="Add Funds"
      open={props.open}
      closable={false}
      onOk={() => {
        form.validateFields().then((values) => {
          let CustomerFundsDTO = {
            UserId: props.recordToEdit?.userId || '',
            Amount: values.updateFunds,
          };
          props.editCustomerFunds(CustomerFundsDTO);
          props.handleAddFundsClose();
          form.resetFields();
        });
      }}
      okText="Save"
      onCancel={() => {
        form.resetFields();
        props.handleAddFundsClose();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="CustomerID" name="userId">
          <Input disabled autoSize={{ minRows: 3, maxRows: 6 }} style={{ color: "black"}} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Name" name="name">
              <Input disabled style={{ color: "black"}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input disabled style={{ color: "black"}} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Address" name="address">
          <Input.TextArea disabled autoSize={{ minRows: 3, maxRows: 6 }} style={{ color: "black"}} />
        </Form.Item>
        <Form.Item
            label="Update Funds"
            name="updateFunds"
            rules={[
                { required: true, message: 'This field is required. Please enter the amount.' },
                {
                    validator: async (_, value) => {
                        console.log(value)
                        const availableFunds = props.recordToEdit?.availableFunds || 0;
                        const enteredAmount = parseFloat(value);

                        if (!isNaN(enteredAmount) && enteredAmount >= availableFunds) {
                            return Promise.resolve();
                        } else {
                        // Check if the input is not a number
                        if (isNaN(enteredAmount)) {
                            throw new Error('Please enter a valid number.');
                        } else {
                            // If the entered amount is not valid, reject the Promise with an error message
                            throw new Error('Update Funds must be greater than or equal to available funds');
                        }
                        }
                    },
                },
            ]}
            >
            <Input placeholder="Update Funds" type="number" />
        </Form.Item>
      </Form>
    </StyledModal>
  );
}
