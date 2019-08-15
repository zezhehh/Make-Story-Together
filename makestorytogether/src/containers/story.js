import React from 'react';
import { connect } from "react-redux";
import { fetchItemList, fetchItemDetail } from '../api/items';
import { Card, Layout, Icon } from 'antd';
import { STATUS, createStory, doneCreateStory } from '../actions/stories';
import WrappedStoryForm from '../components/storyCreationForm';
import '../styles/story.css';
const { Sider, Content } = Layout;



class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [], // default collapsed
            storyDetail: null
        }
    }

    componentDidMount() {
        this.fetch(this)
    }

    fetch(that, storyID=null) {
        console.log('fetch story list');
        fetchItemList('story').then((stories) => {
            that.setState({stories});
        })
        if (storyID != null) {
            fetchItemDetail(storyID, 'story').then((storyDetail) => {
                that.setState({storyDetail});
            });
        }
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

    render() {  
        return (
            <Layout>
                <Content style={{overflow: 'initial'}}>
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

