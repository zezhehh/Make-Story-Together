import React from 'react';
import { connect } from 'react-redux';
import { Anchor, Button, Icon, Input, Tooltip } from 'antd';
import { getChapters, newChapter } from '../../api/stories';
import ChapterNode from './chapterNode';

const { Link } = Anchor;


class ChapterEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputChapterVisible: false,
            value: '',
            chapterTitle: '',
            chapters: [],
        }
    }

    componentDidMount() {
        const { that } = this.props;
        if (that.state.storyId === null) return
        this.fetchChapters(this)
    }

    fetchChapters = (me) => {
        const { that } = me.props;
        if (me.props.token === null) return
        getChapters(me.props.token, that.state.storyId)
        .then((chapters) => {
            me.setState({ 
                chapters,
            });
            console.log(chapters)
            if (chapters.length !== 0) {
                that.setState({
                    currentChapterId: chapters[0].id,
                    lastChapterId: chapters[chapters.length - 1].id
                })
            }
        })
    }

    handleClick = (e, link) => {
        const { that } = this.props;
        e.preventDefault();
        let title = link.href;
        let chapter = this.state.chapters.find(obj => {return obj.title===title});
        if (that.state.editMode) setTimeout(function(){}, 500);
        if (chapter === undefined) return
        that.setState({ 
            currentChapterId: chapter.id
        });
    };
    
    handleNewChapter = () => {
        const { that } = this.props;
        if (this.state.chapterTitle === '') {
            this.setState({
                inputChapterVisible: false, 
            })
            return;
        }
        newChapter(this.props.token, that.state.storyId, {
            title: this.state.chapterTitle
        })
        .then((chapter) => {
            this.setState({
                chapters: [...this.state.chapters, chapter],
                inputChapterVisible: false, 
                chapterTitle: '',
            });
            that.setState({
                currentChapterId: chapter.id,
                lastChapterId: chapter.id
            });
        })
    }

    saveInputRef = input => (this.input = input);

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

    render() {
        const { that } = this.props;
        return (
                <Anchor affix={false} onClick={this.handleClick} className='storyTOC'>
                    {this.state.chapters.map((chapter) => 
                        <Link 
                            key={chapter.id}
                            href={chapter.title}
                            title={
                                <ChapterNode chapter={chapter} callback={this.fetchChapters} that={this} editMode={that.state.editMode} />
                            }
                        />
                    )}
                    {this.newChapter()}
                </Anchor>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name
    }
}

export default connect(mapStateToProps)(ChapterEditor);
