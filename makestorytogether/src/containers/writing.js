import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Anchor, Typography, Button, Icon, Input, Tooltip, Popover } from 'antd';
import { fetchItemDetail } from '../api/items';
import { emptyStoryDetail } from '../api/emptyStructure';
import Moment from 'react-moment';
import { getChapters, getPlots, newChapter, newPlot } from '../api/stories';
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
            currentChapterId: null
        }
    }

    handleClick = (e, link) => {
        e.preventDefault();
        let title = e.target.title;
        let chapter = this.state.chapters.find(obj => {return obj.title===title});
        this.setState({ currentChapterId: chapter.id }, () => {
            this.fetchPlots(this.state.currentChapterId)
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
        this.fetchChapters()
    }

    fetchChapters = () => {
        getChapters(this.props.token, this.state.storyId)
        .then((chapters) => {
            this.setState({ 
                chapters,
            });
            if (chapters.length !== 0) {
                this.setState({
                    currentChapterId: chapters[0].id
                }, () => {
                    this.fetchPlots(this.state.currentChapterId)
                })
            }
        })
    }

    fetchPlots = (chapterId) => {
        getPlots(this.props.token, this.state.storyId, chapterId)
        .then((chapter_plots) => {
            this.setState({ plots: {
                [chapterId]: chapter_plots,
                ...this.state.plots
            } })
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
                chapterTitle: ''
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
                    />
                }
            </div>
        )
    }

    getPlotDetail = (plot) => {
        console.log(plot)
        return (
            <div>
                <span>BY {plot.written_by}</span>
                <br />
                <span>Updated at <Moment format="HH:mm YYYY-MM-DD">{plot.updated_at}</Moment></span>
            </div>
        )
    }

    returnPlots = (plots) => {
        let plotsElements = [];
        if (plots[this.state.currentChapterId] !== undefined) {
            plots[this.state.currentChapterId].map((plot) => 
                plotsElements.push(
                    <Popover placement="topLeft" key={plot.id} content={this.getPlotDetail(plot)}>
                        <div className='plot'>
                            {plot.valid ? <Icon type="check-circle" /> : <Icon type="info-circle" />}
                            <span style={{ marginLeft: "1em" }}>{plot.content}</span>
                        </div>
                    </Popover>
                )
            )
        }
        return plotsElements
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
                    />
                </Tooltip>
                }
            </div>
        )
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
            <Title style={{ textAlign: "center", padding: '20px' }}>{this.state.storyDetail.title}</Title>
            <div className='writingPage'>
                <Anchor affix={false} offsetTop={40} offsetBottom={80} onClick={this.handleClick} className='storyTOC'>
                    {this.state.chapters.map((chapter) => 
                        <Link key={chapter.id} href={`#${chapter.title}`} title={chapter.title} />
                    )}
                    {this.newChapter()}
                </Anchor>
                
                <div className='storyEditor'>
                    {this.returnPlots(this.state.plots).map((plot) => plot)}
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
        token: state.writers.token
    }
}

export default connect(mapStateToProps)(Writing);