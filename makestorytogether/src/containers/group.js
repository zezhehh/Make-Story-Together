import React from 'react';
import { connect } from "react-redux";
import { fetchGroupList, fetchGroupDetail } from '../api/groups';
import { Card, Layout, Icon, Button } from 'antd';
import { STATUS, createGroup, doneCreateGroup } from '../actions/groups';
import WrappedGroupForm from '../components/groupCreationForm';
import '../styles/group.css';
const { Sider, Content } = Layout;

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [], // default collapsed
            groupDetail: null
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, groupID=null) {
        console.log('fetch group list');
        fetchGroupList().then((groups) => {
            that.setState({groups});
        })
        if (groupID != null) {
            fetchGroupDetail(groupID).then((groupDetail) => {
                that.setState({groupDetail});
            });
        }
    }

    collaspedState = () => {
        if (this.props.status === STATUS.CREATING_GROUP) {
            return false
        } else if (this.state.groupDetail !== null) {
            return false
        } else {
            return true
        }
    }

    handleMore = groupID => {
        fetchGroupDetail(groupID).then((groupDetail) => {
            this.setState({groupDetail});
        });
    }

    toggle = () => {
        this.setState({groupDetail: null});
        this.props.doneCreateGroup();
    }

    render() {  
        return (
            <Layout>
                <Content style={{overflow: 'initial'}}>
                    {this.state.groups.map((group) => 
                        <Card 
                            className='groupCard'
                            key={group.id}
                            title={group.name} 
                            extra={
                                <div>
                                    <Icon type="user-add" />
                                    <Icon onClick={() => this.handleMore(group.id)} type="more" />
                                </div>
                            } 
                            style={{ width: 300 }}
                        >
                            <p>Owner {group.owner}</p>
                            <p>{group.description}</p>
                        </Card>
                        
                    )}
                </Content>
                <Sider
                    className='groupSider'
                    trigger={null}
                    collapsible 
                    collapsed={this.collaspedState()}
                    reverseArrow={true}
                    width="450px"
                    collapsedWidth='0px'
                    style={{
                        overflow: 'auto',
                        position: 'fixed',
                        right: 0,
                        height: '100%'
                    }}
                >
                    {this.collaspedState() ? null : <Icon onClick={this.toggle} style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '40px' }}  type="menu-unfold" />}
                    {this.state.groupDetail === null || this.collaspedState() ? null :
                        <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <p>{this.state.groupDetail.name}</p>
                            <p>Owner {this.state.groupDetail.owner}</p>
                            <p>{this.state.groupDetail.description}</p>
                        </div>
                    }
                    {this.props.status === STATUS.CREATING_GROUP && !this.collaspedState() ? <WrappedGroupForm callback={this.fetch} that={this} /> : null}
                </Sider>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        status: state.groups.status
    }
}

export default connect(mapStateToProps, {createGroup, doneCreateGroup})(Group);

