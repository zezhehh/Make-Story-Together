import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchItemDetail } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import Animate from 'rc-animate';
import StoryToolBar from '../components/writing/storyToolBar';
import { storyEditIcon } from '../components/writing/writingElement';
import PlotEditor from '../components/writing/plotEditor';
import '../styles/writing.css';
import ChapterEditor from '../components/writing/chapterEditor';
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
        }
    }

    componentDidMount() {
        this.setState({storyId: this.props.location.state.storyId},
            () => this.fetch(this))
    }

    fetch = (that) => {
        fetchItemDetail(that.state.storyId, 'story', that.props.token)
        .then((storyDetail) => {
            that.setState({ storyDetail });
            console.log('storyDetail', storyDetail)
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

            {this.state.editMode ? 
            <StoryToolBar that={this} />
            : null}
            {/* <Animate
                transitionName="fade"
                transitionAppear
            > */}
            {/* <CSSTransition timeout={200} classNames="writing-page-transition-node"> */}
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
            {/* </CSSTransition> */}
            {/* </Animate> */}
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
