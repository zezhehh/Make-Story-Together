import React from 'react';
import { Select } from 'antd';
import { searchByScreenName } from '../api/writers';

const { Option } = Select;

class UserSearchSelect extends React.Component {
    state = {
        data: [],
        value: undefined,
    };
    
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            data: value.data || []
        };
    }

    handleSearch = value => {
        if (value) {
            searchByScreenName(value).then(data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };
    
    handleChange = value => {
        console.log('selected');
        console.log(value);
        this.setState({ value });
        // this.triggerChange({ value });
    };
    
    triggerChange = changedValue => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
    };

    render() {
        const options = this.state.data.map(user => <Option key={user.username}>{user.screen_name}</Option>);
        return (
            <Select
                showSearch
                mode="multiple"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

export default UserSearchSelect;
