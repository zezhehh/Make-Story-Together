import React from 'react';
import { connect } from "react-redux";
import { Descriptions, Popover } from 'antd';

class GroupDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: this.props.match.params.groupID,
            groupDetail: this.props.groupDetail
        }
    }

    render() {
        return (
            <Descriptions column={3} bordered>
                <Descriptions.Item label='Name' span={2}>{this.state.groupDetail.name}</Descriptions.Item>
                <Descriptions.Item label='Owner'>{this.state.groupDetail.owner}</Descriptions.Item>
                <Descriptions.Item label='Created At' span={3}>{this.state.groupDetail.created_at}</Descriptions.Item>
                <Descriptions.Item label='Descriptions' span={3}>{this.state.groupDetail.description}</Descriptions.Item>
                <Descriptions.Item 
                    label={
                        <Popover content='from first discipline'>
                            Registration Time Required
                        </Popover>
                    } 
                    span={3}
                >
                    {this.state.groupDetail.rule.length === 0 ? null :
                        this.state.groupDetail.rule[0].registration_time
                    }
                </Descriptions.Item>
                <Descriptions.Item 
                    label={
                        <Popover content='from first discipline'>
                            Update Cyle Required
                        </Popover>
                    } 
                    span={3}
                >
                    {this.state.groupDetail.rule.length === 0 ? null :
                        this.state.groupDetail.rule[0].update_cycle
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Members' span={3}>
                    {this.state.groupDetail.members.length === 0 ? null :
                        (
                            this.state.groupDetail.members.map((member) => 
                                <div key={member.username}>{member.screen_name}</div>
                            )
                        )
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Stories' span={3}>
                    {this.state.groupDetail.stories.length === 0 ? null :
                        (
                            this.state.groupDetail.stories.map((story) => 
                                <div key={story.id}>{story.title}</div>
                            )
                        )
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Blacklist' span={3}>
                    {this.state.groupDetail.rule.length !== 0 ? 
                        (
                            this.state.groupDetail.rule.map((discipline) => {
                                if (discipline.blacklist.length !== 0) {
                                    return (
                                        <div key={discipline.id}>
                                            <strong>In discipline {discipline.id}:</strong>
                                            {
                                                discipline.blacklist.map((user) => 
                                                    <div key={user}>{user}</div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            }
                            )
                        ) : null
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Whitelist' span={3}>
                    {this.state.groupDetail.rule.length !== 0 ? 
                        (
                            this.state.groupDetail.rule.map((discipline) => {
                                if (discipline.whitelist.length !== 0) {
                                    return (
                                        <div key={discipline.id}>
                                            <strong>In discipline {discipline.id}:</strong>
                                            {
                                                discipline.whitelist.map((user) => 
                                                    <div key={user}>{user}</div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            }
                            )
                        ) : null
                    }
                </Descriptions.Item>
            </Descriptions>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}


export default connect(mapStateToProps)(GroupDescription);
