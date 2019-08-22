import React from 'react';
import { Card, Icon } from 'antd';
import { connect } from "react-redux";
import { fetchItemDetail } from '../../api/items';
import StoryDescription from './storyDescription';
import StoryManage from './storyManage';
import '../../styles/storyDetail.css';

class StoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: this.props.match.params.storyID,
            storyDetail: null,
            manage: false
        }
    }

    componentDidMount() {
        this.fetch(this);
    }

    fetch = (that) => {
        fetchItemDetail(that.state.storyId, 'story', that.props.token)
        .then((storyDetail) => {
            that.setState({
                storyDetail
            });
        });
    }

    toggleManage = () => {
        this.setState({
            manage: !this.state.manage
        })
    }

    manageIcon = () => {
        if (this.state.manage) {
            return <Icon onClick={this.toggleManage}  type='file-done' />
        } else {
            return <Icon onClick={this.toggleManage}  type='form' />
        }
    }

    render() {
        return (
            <div>
                <Card className='storyDetailCard'>
                    {
                        this.state.storyDetail !== null && this.props.screen_name === this.state.storyDetail.creator ? 
                        this.manageIcon() : null
                    }
                    {
                        this.state.storyDetail === null || this.state.manage ? null : 
                        <StoryDescription match={this.props.match} storyDetail={this.state.storyDetail} />
                    }
                    {
                        !this.state.manage ? null : 
                        <StoryManage 
                            match={this.props.match} 
                            storyDetail={this.state.storyDetail}
                            callback={this.fetch}
                            that={this}
                        />
                    }
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps)(StoryDetail);
