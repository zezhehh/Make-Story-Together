import React from 'react';
import { Icon } from 'antd';
import { deleteItem } from '../../api/items';
import { connect } from 'react-redux';
import Animate from 'rc-animate';
class ChapterNode extends React.Component {
    // constructor(props) {}
    handleDelete = () => {
        deleteItem(this.props.token, this.props.chapter.id, 'chapter')
        .then(() => {
            this.props.callback(this.props.that)
        })
    }

    render() {
        const chapter = this.props.chapter;
        return (
            <Animate
                transitionName="fade"
                transitionAppear
            >
            <div key={chapter.id}>
                {this.props.editMode ? <Icon onClick={this.handleDelete} type="delete" style={{ marginRight: "8px" }} /> : null}
                {chapter.title}
            </div>
            </Animate>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps)(ChapterNode);
