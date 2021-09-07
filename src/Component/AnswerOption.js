import React from 'react';

const AnswerOption = (props) => {
    return (
        <div>
            <input type="radio" id={props.type} value={props.type} checked={props.type === props.answer} disabled={props.answer} onChange={e => props.handleAnswerSelect(e)} />
            <label htmlFor={props.type}>{props.content}</label>
            <div><hr /> </div>
        </div>
    )
}

export default AnswerOption