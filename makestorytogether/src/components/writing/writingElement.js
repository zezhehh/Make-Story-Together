import Moment from 'react-moment';
import { Popover, Icon, Input } from 'antd';
import React from 'react';
import { deleteItem, patchItem } from '../../api/items';

export const getPlotDetail = (plot) => {
    return (
        <div>
            <span>BY {plot.written_by}</span>
            <br />
            <span>Updated at <Moment format="HH:mm YYYY-MM-DD">{plot.updated_at}</Moment></span>
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
                <div className='plot' key={plot.id}>
                    <Input
                        ref={editor.saveInputRef}
                        placeholder={plot.content}
                        value={editor.state.plotContent} 
                        onChange={(e) => editor.setState({plotContent: e.target.value})} 
                        onPressEnter={editor.handleEditPlot} 
                        onBlur={editor.handleEditPlot} 
                    />
                </div>
            )
        } else {
            plotsElements.push(
                <div className='plot' key={plot.id}>
                    {plot.valid ? <Icon 
                        type="check-circle" 
                        onClick={() => invalidPlot(plot.id, editMode, token, editor)} 
                    /> : 
                    <Icon 
                        type="info-circle"
                        onClick={() => validPlot(plot.id, editMode, token, editor)} 
                    />}
                    {editMode ? <Icon type='delete' style={{ marginLeft: "1em" }} onClick={() => handleDelete(plot.id, token, editor)} /> : null}
                    <Popover placement="topLeft" content={getPlotDetail(plot)}>
                        <span style={{ marginLeft: "1em" }}>{plot.content}</span>
                    </Popover>
                    {screen_name === plot.written_by ? <Icon style={{ marginLeft: "1em" }} type='edit' onClick={() => editor.handleEdit(plot)} /> : null}
                </div>
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


