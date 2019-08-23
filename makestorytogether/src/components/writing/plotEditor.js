import { Icon, Button, Input } from 'antd';
import { newPlot } from '../../api/stories';
import React from 'react';
import { getPlots } from '../../api/stories';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { patchItem } from '../../api/items';
import { returnPlots } from './writingElement';
import { createCharacter, WRITING_STATUS, doneCreateCharacter } from '../../actions/stories';
import WrappedCharacterForm from './characterCreationForm';
import CharacterDropDown from './characterDropDown';
import '../../styles/plotEditor.css'


class PlotEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plots: [],
            inputPlotVisible: false,
            value: '',
            editPlotVisible: false,
            plotContent: '',
            currentPlotId: null,
            selectedCharacter: null, //id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.storyPlotsCount !== prevProps.storyPlotsCount) {
            this.fetchPlots(this)
        }
        if (prevProps.currentChapterId !== this.props.currentChapterId && this.props.currentChapterId !== undefined) {
            this.fetchPlots(this)
        }
    }

    fetchPlots = (me) => {
        const { that } = me.props;
        if (that.state.currentChapterId === null) return
        getPlots(me.props.token, that.state.storyId, that.state.currentChapterId)
        .then((plots) => {
            me.setState({ plots });
            console.log('plots', plots);
        })
    }

    saveInputRef = input => (this.input = input);

    handleEdit = (plot) => {
        this.setState({
            plotContent: plot.content,
            editPlotVisible: true,
            currentPlotId: plot.id
        })
    }

    handleEditPlot = () => {
        patchItem(this.props.token, this.state.currentPlotId, {
            content: this.state.plotContent
        }, 'plot')
        .then(() => {
            this.fetchPlots(this);
            this.setState({
                inputPlotVisible: false, 
                value: '',
                currentPlotId: null
            });
        })
    }

    handleNewPlot = () => {
        const { that } = this.props;
        if (this.state.value === '') {
            this.setState({
                inputPlotVisible: false,
            });
            return
        }
        newPlot(this.props.token, that.state.storyId, {
            content: this.state.value,
            chapter_id: that.state.currentChapterId,
            character_id: this.state.selectedCharacter
        })
        .then((plot) => {
            this.setState({
                plots: [...this.state.plots, plot],
                inputPlotVisible: false, 
                value: ''
            });
        })
    }

    newChapter = () => {
        return (
            <Button>New Character</Button>
        )
    }

    newPlot = () => {
        return (
            <CSSTransition
                key='newPlotBtn'
                timeout={500}
                classNames="item-btn"
                className='plotItem'
            >
            <div>
                {!this.state.inputPlotVisible && 
                    <Button className='newPlotBnt' onClick={() => this.setState({inputPlotVisible: true}, () => this.input.focus())}>
                        <Icon type='plus' />New Plot
                    </Button>
                }

                {this.state.inputPlotVisible && 
                    (
                    <div className='plot-textarea'>
                    <Input.TextArea
                        ref={this.saveInputRef}
                        placeholder="Input nothing to quit"
                        value={this.state.value} 
                        onChange={(e) => this.setState({value: e.target.value})} 
                        onPressEnter={this.handleNewPlot}
                        // onBlur={this.handleNewPlot}
                        autosize={true}
                    />
                    <CharacterDropDown placement="bottomRight" className='character-drop-down' storyId={this.props.that.state.storyId} that={this} selectedCharacter={this.state.selectedCharacter} />
                    </div>
                    )
                }
                
            </div>
            </CSSTransition>
        )
    }

    render() {
        const { that, token, screen_name } = this.props;
        if (that.state.currentChapterId === null) return null;
        const { editMode } = that.state;
        const newPlotButton = that.state.currentChapterId !== null && that.state.currentChapterId === that.state.lastChapterId;
        return (
            <div className='storyEditor'>
            <TransitionGroup>
                {returnPlots(this.state.plots, editMode, token, that, screen_name, this).map((plot) => plot)}
                {newPlotButton ? 
                    this.newPlot() : null  
                }
            </TransitionGroup>
            {
                this.props.writing_status === WRITING_STATUS.CREATING_CHARACTER ? 
                <div className='popForm'>
                    <div className='popInner'>
                        <WrappedCharacterForm that={this} storyId={this.props.that.state.storyId} />
                        <Icon onClick={this.props.doneCreateCharacter} style={{ color: 'rgba(0, 0, 0, 0.7)', float: 'right' }}  type="close-circle" />
                    </div>
                </div>: null
            }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.writers.token,
        screen_name: state.writers.screen_name,
        writing_status: state.stories.writing_status
    }
}

export default connect(mapStateToProps, {createCharacter, doneCreateCharacter})(PlotEditor);
