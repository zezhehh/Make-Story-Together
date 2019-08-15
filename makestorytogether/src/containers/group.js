import React from 'react';
import { connect } from "react-redux";
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems, deleteItem } from '../api/items';
import { joinGroup, quitGroup } from '../api/groups';
import { Card, Layout, Icon, Menu } from 'antd';
import { STATUS, createGroup, doneCreateGroup } from '../actions/groups';
import WrappedGroupForm from '../components/groupCreationForm';
import '../styles/group.css';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;


class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [], // default collapsed
            groupDetail: null,
            current: 'orderByDate'
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, groupID=null) {
        console.log('fetch group list');
        let orderBy = that.state.current === 'orderByDate' ? 'date' : 'number';
        fetchItemList('group', orderBy).then((groups) => {
            that.setState({groups});
        })
        if (groupID != null) {
            fetchItemDetail(groupID).then((groupDetail) => {
                that.setState({groupDetail});
            });
        }
    }

    fetchOwned = () => {
        fetchOwnedItems(this.props.token).then((groups) => {
            this.setState({groups});
        })
    }

    fetchJoined = () => {
        fetchJoinedItems(this.props.token).then((groups) => {
            this.setState({groups});
        })
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
        fetchItemDetail(groupID).then((groupDetail) => {
            this.setState({groupDetail});
        });
    }

    handleJoin = groupID => {
        joinGroup(this.props.token, groupID).then(() => this.fetchJoined());
        this.setState({current: 'joined'});
    }

    handleQuit = groupID => {
        quitGroup(this.props.token, groupID).then(() => this.fetchJoined());
    }

    handleDelete = groupID => {
        deleteItem(this.props.token, groupID).then(() => this.fetchOwned());
    }

    toggle = () => {
        this.setState({groupDetail: null});
        this.props.doneCreateGroup();
    }

    handleClick = e => {
        this.setState({
          current: e.key,
        });
        switch (e.key) {
            case 'my':
                this.fetchOwned();
                break;
            case 'joined':
                this.fetchJoined();
                break;
            default:
                this.fetch(this);
        }
    };

    render() {  
        return (
            <Layout>
                <Content style={{overflow: 'initial'}}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <SubMenu
                            title='All Groups'
                        >
                            <Menu.Item key="orderByDate">Order By Date</Menu.Item>
                            <Menu.Item key="orderByNumber">Order By #Member</Menu.Item>
                        </SubMenu>
                        {
                            this.props.token === null ? null :
                            (<Menu.Item key="my">
                                Owned Groups
                            </Menu.Item>)
                        }
                        {
                            this.props.token === null ? null :
                            (<Menu.Item key="joined">
                                Joined Groups
                            </Menu.Item>)
                        }
                        
                    </Menu>
                    {this.state.groups.map((group) => 
                        <Card 
                            className='groupCard'
                            key={group.id}
                            title={group.name} 
                            extra={
                                <div>
                                    {this.state.current === 'joined' ? 
                                    <Icon onClick={() => this.handleQuit(group.id)} type="user-delete" /> : null
                                    }
                                    {this.state.current === 'my' ? 
                                    <Icon onClick={() => this.handleDelete(group.id)} type="usergroup-delete" /> : null
                                    }
                                    {this.state.current !== 'my' && this.state.current != 'joined' ? 
                                    <Icon onClick={() => this.handleJoin(group.id)} type="user-add" /> : null
                                    }
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

