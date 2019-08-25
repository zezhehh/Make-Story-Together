import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, message, Button } from 'antd';
import CharacterList from '../components/writing/characterList';
import Animate from 'rc-animate';
import { fetchItemDetail, createItem } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import StoryToolBar from '../components/writing/storyToolBar';
import AnimateHeight from 'react-animate-height';
import { storyEditIcon } from '../components/writing/writingElement';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PlotEditor from '../components/writing/plotEditor';
import '../styles/writing.css';
import '../styles/characterList.css'
import ChapterEditor from '../components/writing/chapterEditor';
import { WS_URL } from '../constants';

const { Title } = Typography;


class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: null,
            storyDetail: emptyStoryDetail,
            currentChapterId: null,
            lastChapterId: null,
            editMode: false,
            showCharacterList: false
        }
    }

    componentDidMount() {
        this.setState({storyId: this.props.location.state.storyId},
            () => {
                this.fetch(this);
                this.initWs();
            })
    }

    initWs = () => {
        this.ws = new WebSocket(`${WS_URL}/${this.state.storyId}/`);
        this.ws.onopen = () => {
            console.log('connected')
        }
    
        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            console.log(message)
        }
    
        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }

    fetch = (that) => {
        fetchItemDetail(that.state.storyId, 'story', that.props.token)
        .then((storyDetail) => {
            that.setState({ storyDetail });
            console.log('storyDetail', storyDetail)
        })
    }

    handleLikeIt = () => {
        this.ws.send(JSON.stringify({ like: 'new like' }))
        createItem(this.props.token, {
            liked_object: {
                model_name: 'story',
                app_label: 'stories',
                id: this.state.storyId
            }
        }, 'like')
        .then((res) => {
            if (!res.success) {
                message.info('You already liked it!');
            } else {
                message.info('Go to profile to see your like list~');
            }
        })
    }

    render() {
        
        return (
        <div className='writing'>
            {this.props.token === null ?
                <Redirect
                    to={{
                    pathname: "/profile"
                    }}
                /> : null
            }

            <Title style={{ textAlign: "center", padding: '20px' }}>
                <RouterLink to={`/story/${this.state.storyDetail.id}`} style={{ color: 'initial' }}>
                        {this.state.storyDetail.title}
                </RouterLink>
                {storyEditIcon(this)}
                <br />
                <div style={{ fontSize: 'initial' }}>{this.state.storyDetail.creator}</div>
            </Title>
            <div 
                style={{ textAlign: 'center', marginTop: '-20px' }} 
            >
                <span style={{ color: '#1890ff' }} onClick={this.handleLikeIt}>like it!</span>
                <Button 
                    onClick={() => this.setState({ showCharacterList: !this.state.showCharacterList })}
                    style={{ marginLeft: '15px', width: '135px' }}
                    >
                    {!this.state.showCharacterList ?
                    'Show Characters' : 'Hide Characters'}
                </Button>
            </div>

            <AnimateHeight
                duration={ 500 }
                height={ this.state.showCharacterList ? 'auto' : 0 }
            >
            <CharacterList storyId={this.state.storyId} />
            </AnimateHeight>

            {this.state.editMode ? 
            <StoryToolBar that={this} />
            : null}
            <div className='writingPage'>
                <ChapterEditor 
                    that={this}
                    editMode={this.state.editMode}
                    storyId={this.state.storyId}
                    storyChaptersCount={this.state.storyDetail.chapters_count}
                />
                <PlotEditor 
                    that={this}
                    currentChapterId={this.state.currentChapterId}
                    editMode={this.state.editMode}
                    storyPlotsCount={this.state.storyDetail.plots_count}
                />
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps)(Writing);
