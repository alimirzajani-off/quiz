import React from 'react';
import quizQuestions from '../api/Questions';
import AnswerOption from './AnswerOption';

class AnswerQuiz extends React.Component {

    renderQusetion(key) {
        return (
            <AnswerOption type={key.type} content={key.content} handleAnswerSelect={this.props.handleAnswerSelect}/>
        )
    }
    render() {
        return (
            <ul style={{paddingLeft:0}}>
                {quizQuestions[this.props.counter].answers.map(item=>this.renderQusetion(item))}
            </ul>
            )
    }
}

export default AnswerQuiz