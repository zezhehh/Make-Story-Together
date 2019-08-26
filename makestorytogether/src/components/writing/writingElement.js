import Moment from 'react-moment';
import { Popover, Icon, Input, message } from 'antd';
import React from 'react';
import { deleteItem, patchItem, createItem } from '../../api/items';
import { CSSTransition } from 'react-transition-group';
import '../../styles/writingElement.scss';

const handleLike = (plot, token) => {
    createItem(token, {
        liked_object: {
            id: plot.id,
            app_label: 'stories',
            model_name: 'plot'
        }
    }, 'like')
    .then((res) => {
        res.success ? message.info('Go to profile to see your like list~') :
        message.info('You already liked it!');
    })
}

export const getPlotDetail = (plot, token) => {
    return (
        <div>
            {plot.written_as === null ?
            <span>BY {plot.written_by}</span> :
            <span>BY {plot.written_by} AS {plot.written_as.name}</span>
            }
            <br />
            <span>Updated at <Moment format="HH:mm YYYY-MM-DD">{plot.updated_at}</Moment></span>
            <br />
            <div style={{ color: '#1890ff' }} onClick={() => handleLike(plot, token)}>Like it!</div>
        </div>
    )
}

const invalidPlot = (plotId, editMode, token, that) => {
    if (!editMode) return
    patchItem(token, plotId, {
        valid: false
    }, 'plot')
    .then(() => {
        that.fetchPlots(that)
    })
}

const validPlot = (plotId, editMode, token, that) => {
    if (!editMode) return
    patchItem(token, plotId, {
        valid: true
    }, 'plot')
    .then(() => {
        that.fetchPlots(that)
    })
}

const handleDelete = (plotId, token, editor) => {
    deleteItem(token, plotId, 'plot')
    .then(() => {
        editor.fetchPlots(editor)
    })
}

//plots, editMode, token, that, screen_name, this
export const returnPlots = (plots, editMode, token, that, screen_name, editor) => {
    let plotsElements = [];
    plots.map((plot) => {
        if(editor.state.currentPlotId === plot.id && editor.state.editPlotVisible) {
            plotsElements.push(
                <CSSTransition
                    key={plot.id}
                    timeout={500}
                    classNames="item"
                    className='plotItem'
                >
                <div className='plot'>
                    <Input
                        ref={editor.saveInputRef}
                        placeholder={plot.content}
                        value={editor.state.plotContent} 
                        onChange={(e) => editor.setState({plotContent: e.target.value})} 
                        onPressEnter={editor.handleEditPlot} 
                        onBlur={editor.handleEditPlot} 
                    />
                </div>
                </CSSTransition>
            )
        } else {
            plotsElements.push(
                <CSSTransition
                    key={plot.id}
                    timeout={500}
                    classNames="item"
                    className='plotItem'
                >
                <div className='plot'>
                    {plot.valid ? <Icon 
                        type="check-circle" 
                        onClick={() => invalidPlot(plot.id, editMode, token, editor)} 
                    /> : 
                    <Icon 
                        type="info-circle"
                        onClick={() => validPlot(plot.id, editMode, token, editor)} 
                    />}
                    {editMode ? <Icon type='delete' style={{ marginLeft: "1em" }} onClick={() => handleDelete(plot.id, token, editor)} /> : null}
                    <Popover placement="topLeft" content={getPlotDetail(plot, token)}>
                        <span style={{ marginLeft: "1em" }}>{plot.content}</span>
                    </Popover>
                    {screen_name === plot.written_by ? <Icon style={{ marginLeft: "1em" }} type='edit' onClick={() => editor.handleEdit(plot)} /> : null}
                </div>
                </CSSTransition>
            )
        }
        return null
    })
    return plotsElements
}

export const storyEditIcon = (that) => {
    if (that.props.screen_name !== that.state.storyDetail.creator) return null
    if (that.state.editMode) {
        return (
            <Icon style={{ paddingLeft: '20px', fontSize: 'initial' }} type='check' onClick={() => that.setState({ editMode: false })} />
        )
    }
    else {
        return (
            <Icon style={{ paddingLeft: '20px', fontSize: 'initial' }} type='form' onClick={() => that.setState({ editMode: true })} />
        )
    }
}


