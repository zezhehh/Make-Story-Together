import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, InputNumber } from 'antd';
import UserSearchSelect from './userSearch';
import { createItem } from '../api/items';
import { applyDiscipline } from '../api/groups';
import '../styles/disciplineForm.css';


class NakedDisciplineForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            let postData = {
                registration_time: values.registration_time,
                update_cycle: values.update_cycle,
                whitelist: [],
                blacklist: []
            };
            if (values.whitelist.value !== null)
            for (let i = 0; i < values.whitelist.length; i++) {
                postData.whitelist.push({ "screen_name": values.whitelist[i] });
            }
            for (let i = 0; i < values.blacklist.length; i++) {
                postData.blacklist.push({ "screen_name": values.blacklist[i] });
            }
            createItem(this.props.token, postData, 'discipline').then((discipline) => {
                console.log(discipline)
                applyDiscipline(this.props.token, this.props.groupId, discipline.id)
                .then(() => {
                    this.props.callback(this.props.that)
                })
            })
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
                    {getFieldDecorator('whitelist')(
                        <UserSearchSelect />
                    )}
                </Form.Item>
                <Form.Item label="Blacklist">
                    {getFieldDecorator('blacklist')(
                        <UserSearchSelect />
                    )}
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

const mapStateToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(DisciplineForm);
