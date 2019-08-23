import React from 'react';
import { connect } from "react-redux";
import { Descriptions, Popover, Tag } from 'antd';
import Moment from 'react-moment';

const getDistinctScreenName = (arr) => {
    return [...new Set(arr.map(item => item.screen_name))]
}

class StoryDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: this.props.match.params.storyID,
            storyDetail: this.props.storyDetail
        }
    }

    render() {
        return (
            <Descriptions column={3} bordered>
                <Descriptions.Item label='Title'>{this.state.storyDetail.title}</Descriptions.Item>
                <Descriptions.Item label='Creator'>{this.state.storyDetail.creator}</Descriptions.Item>
                <Descriptions.Item label='Maintainer'>{this.state.storyDetail.mantainer}</Descriptions.Item>
                <Descriptions.Item label='Public?'>{this.state.storyDetail.public}</Descriptions.Item>
                <Descriptions.Item label='#Plots'>{this.state.storyDetail.plots_count}</Descriptions.Item>
                <Descriptions.Item label='Created At'><Moment format="YYYY/MM/DD">{this.state.storyDetail.created_at}</Moment></Descriptions.Item>
                <Descriptions.Item label='Category' span={3}>
                    {this.state.storyDetail.category.length === 0 ? null :
                        (
                            this.state.storyDetail.category.map((tag) => 
                                <Tag key={tag.id}>{tag.name}</Tag>
                            )
                        )
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Descriptions' span={3}>{this.state.storyDetail.description}</Descriptions.Item>
                <Descriptions.Item 
                    label={
                        <Popover content='from first discipline'>
                            Registration Time Required
                        </Popover>
                    } 
                    span={3}
                >
                    {this.state.storyDetail.rule.length === 0 ? null :
                        this.state.storyDetail.rule[0].registration_time
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
                    {this.state.storyDetail.rule.length === 0 ? null :
                        this.state.storyDetail.rule[0].update_cycle
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Participators' span={3}>
                    {this.state.storyDetail.participators.length === 0 ? null :
                        (
                            getDistinctScreenName(this.state.storyDetail.participators).map((participator) => 
                                <div key={participator}>{participator}</div>
                            )
                        )
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Blacklist' span={3}>
                    {this.state.storyDetail.rule.length !== 0 ? 
                        (
                            this.state.storyDetail.rule.map((discipline) => {
                                if (discipline.blacklist.length === 0) {
                                    return null
                                }
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
                            )
                        ) : null
                    }
                </Descriptions.Item>
                <Descriptions.Item label='Whitelist' span={3}>
                    {this.state.storyDetail.rule.length !== 0 ? 
                        (
                            this.state.storyDetail.rule.map((discipline) => {
                                if (discipline.whitelist.length === 0) {
                                    return null
                                }
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


export default connect(mapStateToProps)(StoryDescription);
