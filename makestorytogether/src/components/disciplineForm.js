import React from 'react';
import { Form } from 'antd';
import '../styles/disciplineForm.css';


class disciplineForm extends React.Component {
    render() {
        return (
            <div>form</div>
            // <Form onSubmit={this.handleSubmit}>
            //     <Form.Item>
            //         {getFieldDecorator('registration_time', {
            //         rules: [{ required: true, message: 'Please input the required registration time!' }],
            //         })(
            //         <Input
            //             placeholder="Required registration time"
            //         />,
            //         )}
            //     </Form.Item>
            //     <Form.Item>
            //         {getFieldDecorator('update_cycle', {
            //         rules: [{ required: true, message: 'Please input the required update cycle!' }],
            //         })(
            //         <Input
            //             placeholder="Required update cycle"
            //         />,
            //         )}
            //     </Form.Item>
            //     <Form.Item>
            //         <Button type="primary" htmlType="submit">
            //         Create
            //         </Button>
            //     </Form.Item>
            // </Form>
    )}
}

export default disciplineForm;
