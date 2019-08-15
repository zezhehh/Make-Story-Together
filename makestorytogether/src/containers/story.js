import React from 'react';
import { connect } from "react-redux";
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems } from '../api/items';
import { Card, Layout, Icon, Menu } from 'antd';
import { STATUS, createStory, doneCreateStory } from '../actions/stories';
import WrappedStoryForm from '../components/storyCreationForm';
import '../styles/story.css';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;


class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [], // default collapsed
            storyDetail: null,
            current: 'orderByDate'
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, storyID=null) {
        console.log('fetch story list');
        let orderBy = this.state.current === 'orderByDate' ? 'date' : 'number';
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
        fetchOwnedItems(this.props.token, 'stories').then((stories) => {
            this.setState({stories});
        })
    }

    fetchJoined = () => {
        fetchJoinedItems(this.props.token, 'stories').then((stories) => {
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
            this.setState({storyDetail});
        });
    }

    toggle = () => {
        this.setState({storyDetail: null});
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
                <Content style={{overflow: 'initial'}}>
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
                    {this.state.stories.map((story) => 
                        <Card 
                            className='storyCard'
                            key={story.id}
                            title={story.title} 
                            extra={
                                <div>
                                    <Icon type="user-add" />
                                    <Icon onClick={() => this.handleMore(story.id)} type="more" />
                                </div>
                            } 
                            style={{ width: 300 }}
                        >
                            <p>Creator {story.creator}</p>
                        </Card>
                        
                    )}
                </Content>
                <Sider
                    className='storySider'
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
                    {this.state.storyDetail === null || this.collaspedState() ? null :
                        <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            <p>{this.state.storyDetail.title}</p>
                            <p>Creator {this.state.storyDetail.creator}</p>
                        </div>
                    }
                    {this.props.status === STATUS.CREATING_STORY && !this.collaspedState() ? <WrappedStoryForm callback={this.fetch} that={this} /> : null}
                </Sider>
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

export default connect(mapStateToProps, {createStory, doneCreateStory})(Story);

