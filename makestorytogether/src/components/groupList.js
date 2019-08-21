import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems, deleteItem } from '../api/items';
import { joinGroup, quitGroup } from '../api/groups';
import { Card, Layout, Icon, Menu, Divider, Empty } from 'antd';
import { STATUS, createGroup, doneCreateGroup } from '../actions/groups';
import WrappedGroupForm from './groupCreationForm';
import '../styles/group.css';
const { Content, Header } = Layout;
const { SubMenu } = Menu;

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [], // default collapsed
            detailID: null,
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
            this.setState({groupDetail,
                detailID: groupID
            });
            console.log(groupDetail);
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
        this.setState({groupDetail: null, detailID: null});
        this.props.doneCreateGroup();
    }

    groupIcon = (groupID) => {
        if (this.state.current === 'joined') {
            return <Icon onClick={() => this.handleQuit(groupID)} type="user-delete" />
        } 
        else if (this.state.current === 'my') {
            return <Icon onClick={() => this.handleDelete(groupID)} type="usergroup-delete" />
        }
        else if (this.state.current !== 'my' && this.state.current !== 'joined') {
            return  <Icon onClick={() => this.handleJoin(groupID)} type="user-add" />
        }
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
                <Header className='groupHeader' style={{padding: 0, zIndex: 1 }}>
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
                </Header>
                <Layout style={{ marginTop: '40px' }}>
                    
                    <Content className="groupContent" >
                        <div style={{ height: '10px' }}></div>
                    {this.state.groups.length === 0 ? <Empty /> : null}
                    {this.state.groups.map((group) => 
                        <Card 
                            className='groupCard'
                            key={group.id}
                            title={
                                <Link to={`/group/${group.id}`} style={{ color: 'initial' }}>
                                    {group.name}
                                </Link>
                            } 
                            extra={
                                <div>
                                    {
                                        this.props.token === null ? null :
                                        this.groupIcon(group.id)
                                    }
                                    <Icon onClick={() => this.handleMore(group.id)} type="more" />
                                </div>
                            } 
                            style={{ width: 300 }}
                        >
                            <p>Owner {group.owner}</p>
                            <p>{group.description}</p>
                            {
                                this.state.detailID !== group.id || this.collaspedState() ? null :
                                <div>
                                    <Divider />
                                    <p>More detail of {group.name}</p>
                                    <Icon onClick={this.toggle} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="up" />
                                </div>
                            }
                        </Card>
                        
                    )}
                </Content>
                </Layout>
                {
                    this.props.status === STATUS.CREATING_GROUP && !this.collaspedState() ? 
                    <div className='popForm'>
                        <div className='popInner'>
                            <WrappedGroupForm callback={this.fetch} that={this} />
                            <Icon onClick={this.toggle} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="close-circle" />
                        </div>
                    </div>: null
                }
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

export default connect(mapStateToProps, {createGroup, doneCreateGroup})(GroupList);

