
import React from 'react';
import { connect } from "react-redux";
import { createItem } from '../../api/items';
import { doneCreateStory } from '../../actions/stories';
import { Form, Input, Button } from 'antd';

class StoryCreationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (err) {
            return
        }
        createItem(this.props.token, {
            creator: this.props.screen_name,
            ...values
        }, 'story').then((res) => {
            if (!res.success) {
                console.log('create story fail')
            }
            this.props.doneCreateStory();
            this.props.callback(this.props.that, res.id);
        })
    
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the story title!' }],
          })(
            <Input
              placeholder="Story title"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('description')(
            <Input
              placeholder="Story description"
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

const WrappedStoryForm = Form.create()(StoryCreationForm);

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps, {doneCreateStory})(WrappedStoryForm);
