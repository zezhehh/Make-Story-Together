import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Anchor, Typography, Button, Icon, Input, Tooltip, Popover } from 'antd';
import { fetchItemDetail } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import Moment from 'react-moment';
import { getChapters, getPlots, newChapter, newPlot } from '../api/stories';
import { returnPlots } from '../components/writingElement';
import ChapterNode from '../components/chapterNode';
import '../styles/writing.css';
const { Title } = Typography;

const { Link } = Anchor;


class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: null,
            storyDetail: emptyStoryDetail,
            inputPlotVisible: false,
            inputChapterVisible: false,
            value: '',
            chapterTitle: '',
            plots: {},
            chapters: [],
            currentChapterId: null,
            editMode: false
        }
    }

    handleClick = (e, link) => {
        e.preventDefault();
        let title = link.href;
        let chapter = this.state.chapters.find(obj => {return obj.title===title});
        if (this.state.editMode) setTimeout(function(){}, 500);
        if (chapter === undefined) return
        this.setState({ currentChapterId: chapter.id }, () => {
            this.fetchPlots(this.state.currentChapterId, this)
        });
    };

    componentDidMount() {
        this.setState({storyId: this.props.location.state.storyId},
            () => this.fetch())
    }
    
    fetch = () => {
        fetchItemDetail(this.state.storyId, 'story', this.props.token)
        .then((storyDetail) => {
            this.setState({ storyDetail });
        })
        this.fetchChapters(this)
    }

    fetchChapters = (that) => {
        getChapters(that.props.token, that.state.storyId)
        .then((chapters) => {
            that.setState({ 
                chapters,
            });
            if (chapters.length !== 0) {
                that.setState({
                    currentChapterId: chapters[0].id
                }, () => {
                    that.fetchPlots(that.state.currentChapterId, that);
                })
            }
        })
    }

    fetchPlots = (chapterId, that) => {
        getPlots(that.props.token, that.state.storyId, chapterId)
        .then((chapter_plots) => {
            let newPlots = that.state.plots;
            newPlots[chapterId] = chapter_plots;
            that.setState({ plots: newPlots })
        })
    }

    handleNewPlot = () => {
        if (this.state.value === '') {
            this.setState({
                inputPlotVisible: false,
            });
            return
        }
        newPlot(this.props.token, this.state.storyId, {
            content: this.state.value,
            chapter_id: this.state.currentChapterId
        })
        .then((plot) => {
            let newPlots = this.state.plots;
            if (newPlots[this.state.currentChapterId] === undefined) {
                newPlots[this.state.currentChapterId] = [plot]
            } else {
                newPlots[this.state.currentChapterId] = [
                    ...newPlots[this.state.currentChapterId],
                    plot
                ]
            }
            this.setState({
                inputPlotVisible: false, 
                value: '',
                plots: newPlots
            });
        })
    }

    handleNewChapter = () => {
        if (this.state.chapterTitle === '') {
            this.setState({
                inputChapterVisible: false, 
            })
            return;
        }
        newChapter(this.props.token, this.state.storyId, {
            title: this.state.chapterTitle
        })
        .then((chapter) => {
            this.setState({
                chapters: [...this.state.chapters, chapter],
                inputChapterVisible: false, 
                chapterTitle: '',
                currentChapterId: chapter.id
            })
        })
    }

    saveInputRef = input => (this.input = input);

    newPlot = () => {
        return (
            <div>
                {!this.state.inputPlotVisible && 
                    <Button className='newPlotBnt' onClick={() => this.setState({inputPlotVisible: true}, () => this.input.focus())}>
                        <Icon type='plus' />New Plot
                    </Button>
                }

                {this.state.inputPlotVisible && 
                    <Input
                        ref={this.saveInputRef}
                        placeholder="Input nothing to quit"
                        value={this.state.value} 
                        onChange={(e) => this.setState({value: e.target.value})} 
                        onPressEnter={this.handleNewPlot} 
                        onBlur={this.handleNewPlot} 
                    />
                }
            </div>
        )
    }


    newChapter = () => {
        return (
            <div>
                {!this.state.inputChapterVisible && 
                    <Button className='newChapterBnt' onClick={() => this.setState({inputChapterVisible: true}, () => this.input.focus())}>
                        <Icon type='plus' />New Chapter
                    </Button>
                }
                {this.state.inputChapterVisible && 
                <Tooltip
                    title="Input nothing to quit"
                    placement="topLeft"
                    overlayClassName="tooltip"
                >
                    <Input
                        ref={this.saveInputRef}
                        className='newChapterInput'
                        placeholder="Input nothing to quit"
                        value={this.state.chapterTitle} 
                        onChange={(e) => this.setState({chapterTitle: e.target.value})} 
                        onPressEnter={this.handleNewChapter} 
                        onBlur={this.handleNewChapter} 
                    />
                </Tooltip>
                }
            </div>
        )
    }

    chapterNode = () => {

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
                <RouterLink to={`/story/${this.state.storyDetail.id}`} style={{ color: 'initial' }}>{this.state.storyDetail.title}</RouterLink>
                {this.props.screen_name === this.state.storyDetail.creator && !this.state.editMode ? 
                    <Icon style={{ paddingLeft: '20px', fontSize: 'initial' }} type='form' onClick={() => this.setState({ editMode: true })} /> : null
                }
                {this.props.screen_name === this.state.storyDetail.creator && this.state.editMode ? 
                    <Icon style={{ paddingLeft: '20px', fontSize: 'initial' }} type='check' onClick={() => this.setState({ editMode: false })} /> : null
                }
                <br />
                <div style={{ fontSize: 'initial' }}>{this.state.storyDetail.creator}</div>
            </Title>
            {this.state.editMode ? 
            <div className='storyToolBar'>
                <Button type='primary' style={{ marginRight: '15px' }}>Clear empty contents</Button>
                <Button type='danger'>Remove all invalid plots</Button>
            </div>
            : null}
            <div className='writingPage'>
                <Anchor affix={false} onClick={this.handleClick} className='storyTOC'>
                    {this.state.chapters.map((chapter) => 
                        <Link 
                            key={chapter.id}
                            href={chapter.title}
                            title={
                                <ChapterNode chapter={chapter} callback={this.fetchChapters} that={this} editMode={this.state.editMode} />
                            }
                        />
                    )}
                    {this.newChapter()}
                </Anchor>
                
                <div className='storyEditor'>
                    {returnPlots(
                        this.state.plots, 
                        this.state.currentChapterId, 
                        this.state.editMode, 
                        this.props.token, 
                        this.fetchPlots, 
                        this
                    )
                    .map((plot) => plot)}
                    {this.state.chapters.length !== 0 && 
                        this.state.currentChapterId === this.state.chapters[this.state.chapters.length - 1].id ? 
                        this.newPlot() : null  
                    }
                </div>
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
