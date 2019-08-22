import React from 'react';
import { clearEmptyContent, removeInvalidPlots } from '../../api/stories';
import { connect } from 'react-redux';
import { Button } from 'antd';


class StoryToolBar extends React.Component {
    handleClearEmpty = () => {
        const { that } = this.props;
        clearEmptyContent(this.props.token, that.state.storyId)
        .then(() => that.fetch(that));
    }

    handleRemoveInvalid = () => {
        const { that } = this.props;
        console.log(that.state.storyId);
        removeInvalidPlots(this.props.token, that.state.storyId)
        .then(() => that.fetch(that));
    }

    render() {
        return (
            <div className='storyToolBar'>
                <Button type='primary' style={{ marginRight: '15px' }} onClick={this.handleClearEmpty}>Clear empty contents</Button>
                <Button type='danger' onClick={this.handleRemoveInvalid}>Remove all invalid plots</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(StoryToolBar);
