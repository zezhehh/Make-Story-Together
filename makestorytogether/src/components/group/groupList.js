import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems, deleteItem } from '../../api/items';
import { joinGroup, quitGroup } from '../../api/groups';
import { Card, Layout, Icon, Menu, Popover, Empty } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { STATUS, createGroup, doneCreateGroup } from '../../actions/groups';
import WrappedGroupForm from './groupCreationForm';
import '../../styles/group.css';
const { Content, Header } = Layout;
const { SubMenu } = Menu;

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [], // default collapsed
            detailID: null,
            current: 'orderByDate'
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, groupID=null) {
        if (that.state.current === 'my') {
            that.fetchOwned(that);
            return;
        }
        else if (that.state.current === 'joined') {
            that.fetchJoined(that);
            return;
        }
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

    fetchOwned = (that) => {
        fetchOwnedItems(that.props.token).then((groups) => {
            that.setState({groups});
        })
    }

    fetchJoined = (that) => {
        fetchJoinedItems(that.props.token).then((groups) => {
            that.setState({groups});
        })
    }

    handleJoin = groupID => {
        joinGroup(this.props.token, groupID).then(() => this.fetchJoined(this));
        this.setState({current: 'joined'});
    }

    handleQuit = groupID => {
        quitGroup(this.props.token, groupID).then(() => this.fetchJoined(this));
    }

    handleDelete = groupID => {
        deleteItem(this.props.token, groupID).then(() => this.fetchOwned(this));
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
                this.fetchOwned(this);
                break;
            case 'joined':
                this.fetchJoined(this);
                break;
            default:
                this.fetch(this);
        }
    };

    geGroupDetailById = (groupId) => {
        let group = this.state.groups.find((group) => group.id = groupId);
        return <p>{group.description}</p>
    }

    render() {  
        const groups = this.state.groups.map((group) => 
            <CSSTransition
                key={group.id}
                timeout={500}
                classNames="item"
                className='groupItem'
            >
                <Card 
                    bordered={false}
                    className='groupCard'
                    // key={group.id}
                    title={
                        <Popover placement="bottomLeft" content={this.geGroupDetailById(group.id)}>
                            <Link to={`/group/${group.id}`} style={{ color: 'initial' }}>
                                {group.name}
                            </Link>
                        </Popover>
                    } 
                    extra={
                        <div>
                            {
                                this.props.token === null ? null :
                                this.groupIcon(group.id)
                            }
                        </div>
                    }
                >
                    <p>Owner {group.owner}</p>
                </Card>
            </CSSTransition>
        );
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
                <Layout style={{ marginTop: '40px' }} className="groupList">
                    
                    <Content className="groupContent" >
                        <div style={{ height: '10px' }}></div>
                    {this.state.groups.length === 0 ? <Empty /> : null}
                    <TransitionGroup>
                    {groups}
                    </TransitionGroup>
                    
                </Content>
                </Layout>
                {
                    this.props.status === STATUS.CREATING_GROUP ? 
                    <div className='popForm'>
                        <div className='popInner'>
                            <WrappedGroupForm callback={this.fetch} that={this} />
                            <Icon onClick={this.props.doneCreateGroup} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="close-circle" />
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

