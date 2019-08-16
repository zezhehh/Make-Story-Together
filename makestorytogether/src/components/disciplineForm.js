import React from 'react';
import { Form, Button, InputNumber } from 'antd';
import UserSearchSelect from './userSearch';
import '../styles/disciplineForm.css';


class NakedDisciplineForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            console.log(values)
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label='Required Registration Time'>
                    {getFieldDecorator('registration_time', { initialValue: -1 })(<InputNumber />)}
                    <span className="ant-form-text"> days</span>
                </Form.Item>
                <Form.Item label='Required Update Cycle'>
                    {getFieldDecorator('update_cycle', { initialValue: -1 })(<InputNumber />)}
                    <span className="ant-form-text"> days</span>
                </Form.Item>
                <Form.Item label="Whitelist">
                    {getFieldDecorator('whitelist', {
                        initialValue: {data: []}
                    })(<UserSearchSelect />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Create
                    </Button>
                </Form.Item>
            </Form>
    )}
}
const DisciplineForm = Form.create()(NakedDisciplineForm);
export default DisciplineForm;
