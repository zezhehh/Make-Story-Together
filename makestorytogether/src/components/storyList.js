import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems } from '../api/items';
import { Card, Layout, Icon, Menu, Divider, Empty } from 'antd';
import { STATUS, createStory, doneCreateStory } from '../actions/stories';
import WrappedStoryForm from './storyCreationForm';
import '../styles/story.css';
const { Content, Header } = Layout;
const { SubMenu } = Menu;


class StoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [], // default collapsed
            storyDetail: null,
            detailID: null,
            current: 'orderByDate'
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, storyID=null) {
        console.log('fetch story list');
        let orderBy = that.state.current === 'orderByDate' ? 'date' : 'number';
        fetchItemList('story', orderBy).then((stories) => {
            that.setState({stories});
        })
        if (storyID != null) {
            fetchItemDetail(storyID, 'story').then((storyDetail) => {
                that.setState({storyDetail});
            });
        }
    }

    fetchOwned = () => {
        fetchOwnedItems(this.props.token, 'story').then((stories) => {
            this.setState({stories});
        })
    }

    fetchJoined = () => {
        fetchJoinedItems(this.props.token, 'story').then((stories) => {
            this.setState({stories});
        })
    }

    collaspedState = () => {
        if (this.props.status === STATUS.CREATING_STORY) {
            return false
        } else if (this.state.storyDetail !== null) {
            return false
        } else {
            return true
        }
    }

    handleMore = storyID => {
        fetchItemDetail(storyID, 'story').then((storyDetail) => {
            this.setState({storyDetail, detailID: storyID});
        });
    }

    toggle = () => {
        this.setState({storyDetail: null, detailID: null});
        this.props.doneCreateStory();
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
                <Header className='storyHeader' style={{padding: 0, zIndex: 1 }}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <SubMenu
                            title='All Stories'
                        >
                            <Menu.Item key="orderByDate">Order By Date</Menu.Item>
                            <Menu.Item key="orderByNumber">Order By #Member</Menu.Item>
                        </SubMenu>
                        {
                            this.props.token === null ? null :
                                (<Menu.Item key="my">
                                    Owned Stories
                                </Menu.Item>)
                            }
                            {
                                this.props.token === null ? null :
                                (<Menu.Item key="joined">
                                    Joined Stories
                                </Menu.Item>)
                            }
                    </Menu>
                </Header>
                <Layout style={{ marginTop: '40px' }}>
                <Content style={{overflow: 'initial'}}>
                    <div style={{ height: '10px' }}></div>
                    {this.state.stories.length === 0 ? <Empty /> : null}
                    {this.state.stories.map((story) => 
                        <Card 
                            className='storyCard'
                            key={story.id}
                            title={
                                <Link to={`/story/${story.id}`} style={{ color: 'initial' }}>
                                    {story.title}
                                </Link>
                            } 
                            extra={
                                <div>
                                    <Link to={{ pathname: '/just-writing!', state: { storyId: story.id} }}><Icon style={{ color: 'initial' }} type="edit" /></Link>
                                    <Icon type="user-add" />
                                    <Icon onClick={() => this.handleMore(story.id)} type="more" />
                                </div>
                            } 
                            style={{ width: 300 }}
                        >
                            <p>Creator {story.creator}</p>
                            {
                                this.state.detailID !== story.id || this.collaspedState() ? null :
                                <div>
                                    <Divider />
                                    <p>{story.description}</p>
                                    <Icon onClick={this.toggle} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="up" />
                                </div>
                            }
                        </Card>
                        
                    )}
                </Content>
                </Layout>
                {
                    this.props.status === STATUS.CREATING_STORY && !this.collaspedState() ? 
                    <div className='popForm'>
                        <div className='popInner'>
                            <WrappedStoryForm callback={this.fetch} that={this} />
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
        status: state.stories.status
    }
}

export default connect(mapStateToProps, {createStory, doneCreateStory})(StoryList);

