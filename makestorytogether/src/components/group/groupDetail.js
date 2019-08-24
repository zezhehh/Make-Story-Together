import React from 'react';
import { Card, Icon, Spin } from 'antd';
import Animate from 'rc-animate';
import { connect } from "react-redux";
import { fetchItemDetail } from '../../api/items';
import GroupDescription from './groupDescription';
import GroupManage from './groupManage';
import '../../styles/groupDetail.css';

class GroupDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: this.props.match.params.groupID,
            groupDetail: null,
            manage: false,
            loading: true
        }
    }

    componentDidMount() {
        this.fetch(this);
    }

    fetch = (that) => {
        fetchItemDetail(that.state.groupId, 'group', that.props.token)
        .then((groupDetail) => {
            that.setState({
                groupDetail,
                loading: false
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
                {this.state.loading ? <Spin /> :
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                <Card bordered={false} className='groupDetailCard'>
                    {
                        this.state.groupDetail !== null && this.props.screen_name === this.state.groupDetail.owner ? 
                        this.manageIcon() : null
                    }
                    {
                        this.state.groupDetail === null || this.state.manage ? null : 
                        <GroupDescription match={this.props.match} groupDetail={this.state.groupDetail} />
                    }
                    
                    {
                        !this.state.manage ? null : 
                        <GroupManage 
                            match={this.props.match} 
                            groupDetail={this.state.groupDetail}
                            callback={this.fetch}
                            that={this}
                        />
                    }
                </Card>
                </Animate>
                }
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

export default connect(mapStateToProps)(GroupDetail);
