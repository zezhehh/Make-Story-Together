import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchItemList, fetchItemDetail, fetchJoinedItems, fetchOwnedItems, deleteItem } from '../../api/items';
import { Card, Layout, Icon, Menu, Empty, Popover, Select, Spin } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { STATUS, createStory, doneCreateStory } from '../../actions/stories';
import WrappedStoryForm from './storyCreationForm';
import '../../styles/story.css';
const { Content, Header } = Layout;
const { SubMenu } = Menu;


class StoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [], // default collapsed
            storyDetail: null,
            current: 'orderByDate',
            searchValue: '',
            filteredStories: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, storyID=null) {
        if (that.state.current === 'my') {
            that.fetchOwned(that);
            return;
        }
        if (that.state.current === 'owned') {
            that.fetchJoined(that);
            return
        }
        let orderBy = that.state.current === 'orderByDate' ? 'date' : 'number';
        fetchItemList('story', orderBy).then((stories) => {
            that.setState({stories, loading: false});
        })
        if (storyID != null) {
            fetchItemDetail(storyID, 'story').then((storyDetail) => {
                that.setState({storyDetail});
            });
        }
    }

    fetchOwned = (that) => {
        fetchOwnedItems(that.props.token, 'story').then((stories) => {
            that.setState({stories});
        })
    }

    fetchJoined = (that) => {
        fetchJoinedItems(that.props.token, 'story').then((stories) => {
            that.setState({stories});
        })
    }

    handleClick = e => {
        if (e.key !== 'search') {
            this.setState({
              current: e.key,
            }, () => {
                switch (e.key) {
                    case 'my':
                        this.fetchOwned(this);
                        break;
                    case 'joined':
                        this.fetchJoined(this);
                        break;
                    case 'search':
                        break;
                    default:
                        this.fetch(this);
                }
            });
        }
        
    };

    getStoryDetailById = (storyId) => {
        let story = this.state.stories.find((story) => story.id === storyId);
        return <p>{story.description}</p>
    }

    handleSearch = (title) => {
        this.setState({ searchValue: title });
        let filteredStories = this.state.stories.filter((story) => story.title.includes(title));
        this.setState({ filteredStories })
    }

    handleDelete = (storyId) => {
        deleteItem(this.props.token, storyId, 'story')
        .then(() => this.fetch(this));
    }

    render() {
        let stories = this.state.searchValue === '' ? this.state.stories : this.state.filteredStories;
        let options = stories.map((story) => 
            <CSSTransition
                key={story.id}
                timeout={500}
                classNames="item"
                className='storyItem'
            >
                <Card 
                    className='storyCard'
                    // key={story.id}
                    bordered={false}
                    title={
                        <Popover placement="bottomLeft" content={this.getStoryDetailById(story.id)}>
                        <Link to={`/story/${story.id}`} style={{ color: 'initial' }}>
                            {story.title}
                        </Link>
                        </Popover>
                    } 
                    extra={
                        <div>
                            <Link to={{ pathname: '/just-writing!', state: { storyId: story.id} }}><Icon style={{ color: 'initial' }} type="edit" /></Link>
                            {this.props.screen_name === story.creator ? <Icon onClick={() => this.handleDelete(story.id)} type='delete' style={{ marginLeft: '10px' }} /> : null}
                        </div>
                    }
                >
                    <p>Creator {story.creator}</p>
                </Card>
            </CSSTransition>
        )
        return (
            <Layout style={{ minWidth: '550px', overflow: 'auto' }}>
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
                        <Menu.Item key="search">
                        <Select
                            className='storySearch'
                            showSearch
                            placeholder="Search by the story title"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            notFoundContent={null}
                        />
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{ marginTop: '40px' }}  className='storyList'>
                <Content style={{overflow: 'initial'}} className='story-list-content'>
                    <div style={{ height: '10px' }}></div>
                    {this.state.loading ? <Spin /> : null}
                    {this.state.stories.length === 0 && !this.state.loading ? <Empty /> : null}
                    <TransitionGroup>
                    {options}
                    </TransitionGroup>
                </Content>
                </Layout>
                {
                    this.props.status === STATUS.CREATING_STORY ? 
                    <div className='popForm'>
                        <div className='popInner'>
                            <WrappedStoryForm callback={this.fetch} that={this} />
                            <Icon onClick={this.props.doneCreateStory} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="close-circle" />
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
        status: state.stories.status,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps, {createStory, doneCreateStory})(StoryList);

