
import React from 'react';
import { connect } from "react-redux";
import { createGroup } from '../api/groups';
import { doneCreateGroup } from '../actions/groups';
import { Form, Input, Button } from 'antd';

class GroupCreationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (err) {
            return
        }
        createGroup(this.props.token, {
            owner: this.props.screen_name,
            ...values
        }).then((res) => {
            if (!res.success) {
                console.log('create group fail')
            }
            this.props.doneCreateGroup();
            this.props.callback(this.props.that, res.id);
        })
    
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the group name!' }],
          })(
            <Input
              placeholder="Group name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input the group description!' }],
          })(
            <Input
              placeholder="Description"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedGroupForm = Form.create()(GroupCreationForm);

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps, {doneCreateGroup})(WrappedGroupForm);
