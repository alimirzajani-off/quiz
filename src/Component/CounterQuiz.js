import React from 'react';

const CounterQuiz = (props) => {
    return (
        <div>
            Question {props.questionId} from {props.total}
        </div>
    )
}

export default CounterQuiz