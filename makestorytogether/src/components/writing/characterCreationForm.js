
import React from 'react';
import { connect } from "react-redux";
import { createItem } from '../../api/items';
import { doneCreateCharacter } from '../../actions/stories';
import { Form, Input, Button } from 'antd';

class CharacterCreationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (err) {
            return
        }
        createItem(this.props.token, {
            player: this.props.screen_name,
            story: this.props.storyId,
            ...values
        }, 'character').then((res) => {
            if (!res.success) {
                console.log('create character fail')
            }
            this.props.doneCreateCharacter();
            this.props.that.setState({ selectedCharacter: res.id });
        })
    
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the character name!' }],
          })(
            <Input
              placeholder="Character name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('description')(
            <Input
              placeholder="Character description"
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

const WrappedCharacterForm = Form.create()(CharacterCreationForm);

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps, {doneCreateCharacter})(WrappedCharacterForm);
