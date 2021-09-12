import React from 'react';

const AnswerOption = (props) => {
    return (
        <div className="input_group">
            <input type="radio" id={props.type} value={props.type} checked={props.type === props.answer} disabled={props.answer} onChange={e => props.handleAnswerSelect(e)} />
            <label className="label_input_group" htmlFor={props.type}>{props.content}</label>
        </div>
    )
}

export default AnswerOption