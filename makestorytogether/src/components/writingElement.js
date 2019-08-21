import Moment from 'react-moment';
import { Popover, Icon } from 'antd';
import React from 'react';
import { deleteItem, patchItem } from '../api/items';

export const getPlotDetail = (plot) => {
    console.log(plot)
    return (
        <div>
            <span>BY {plot.written_by}</span>
            <br />
            <span>Updated at <Moment format="HH:mm YYYY-MM-DD">{plot.updated_at}</Moment></span>
        </div>
    )
}

const invalidPlot = (plotId, editMode, token, callback, that, currentChapterId) => {
    if (!editMode) return
    patchItem(token, plotId, {
        valid: false
    }, 'plot')
    .then(() => {
        callback(currentChapterId, that)
    })
}

const validPlot = (plotId, editMode, token, callback, that, currentChapterId) => {
    if (!editMode) return
    patchItem(token, plotId, {
        valid: true
    }, 'plot')
    .then(() => {
        callback(currentChapterId, that)
    })
}

const handleDelete = (plotId, token, callback, that, currentChapterId) => {
    deleteItem(token, plotId, 'plot')
    .then(() => {
        callback(currentChapterId, that)
    })
}

export const returnPlots = (plots, currentChapterId, editMode, token, callback, that) => {
    let plotsElements = [];
    if (plots[currentChapterId] !== undefined) {
        plots[currentChapterId].map((plot) => 
            plotsElements.push(
                <div className='plot' key={plot.id}>
                    {plot.valid ? <Icon 
                        type="check-circle" 
                        onClick={() => invalidPlot(plot.id, editMode, token, callback, that, currentChapterId)} 
                    /> : 
                    <Icon 
                        type="info-circle"
                        onClick={() => validPlot(plot.id, editMode, token, callback, that, currentChapterId)} 
                    />}
                    {editMode ? <Icon type='delete' style={{ marginLeft: "1em" }} onClick={() => handleDelete(plot.id, token, callback, that, currentChapterId)} /> : null}
                    <Popover placement="topLeft" content={getPlotDetail(plot)}>
                        <span style={{ marginLeft: "1em" }}>{plot.content}</span>
                    </Popover>
                </div>
            )
        )
    }
    return plotsElements
}

