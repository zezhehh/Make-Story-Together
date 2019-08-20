import React from 'react';
import { connect } from 'react-redux';
import { Select, Tag, Input, Icon, Button } from 'antd';
import { searchTagByName, applyTag, removeTag } from '../api/stories';
import { createItem, fetchItemDetail } from '../api/items';

const { Option } = Select;

class CategorySearchSelect extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            storyDetail: this.props.storyDetail,
            data: [],
            value: undefined,
            inputVisible: false,
            inputValue: '',
        };
        this.triggerChange( [] );
    }

    fetch = (that) => {
        fetchItemDetail(that.props.storyDetail.id, 'story', that.props.token)
        .then(( storyDetail ) =>{
            that.setState({ storyDetail })
        })
        that.props.callback(that.props.that);
    }

    handleClose = removedTag => {
        removeTag(this.props.token, this.props.storyDetail.id, removedTag.id)
        .then(() => {
            this.fetch(this);
        })
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        createItem(this.props.token, {
            name: inputValue
        }, 'tag').then((tag) => {
            applyTag(this.props.token, this.props.storyDetail.id, tag.id)
            .then(() => {
                this.fetch(this);
            })
        });

        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);    

    handleSearch = value => {
        if (value) {
            searchTagByName(value).then(data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };
    
    handleChange = value => {
        this.setState({ value });
        this.triggerChange( value );
    };
    
    triggerChange = value => {
        const { onChange } = this.props;
        if (onChange) {
            onChange( value );
        }
    };

    handleAddTag = () => {
        applyTag(this.props.token, this.props.storyDetail.id, this.state.value)
        .then(() => {
            this.fetch(this);
        })
    }

    render() {
        const options = this.state.data.map(tag => 
            <Option 
                key={tag.id} 
                value={tag.id}
            >
                {tag.name}
            </Option>
        );
        return (
            <div>
                {this.state.storyDetail.category.map((tag) => 
                    <Tag closable key={tag.id} onClose={() => this.handleClose(tag)}>
                        {tag.name}
                    </Tag>
                )}
                {this.state.inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
                )}
                {!this.state.inputVisible && (
                <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <Icon type="plus" /> New Tag
                </Tag>
                )}
                <br />
                <Select
                    showSearch
                    mode="multiple"
                    value={this.state.value}
                    placeholder='search tags'
                    style={{ width: '30%' }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    notFoundContent={null}
                >
                    {options}
                </Select>
                <Button type="primary" onClick={this.handleAddTag}>
                    Add to the story
                </Button>
            </div>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.writers.token, 
    }
}

export default connect(mapStateToProps)(CategorySearchSelect);

