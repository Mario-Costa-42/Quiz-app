// Import necessary libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {FaTwitter,FaFacebook,FaInstagram} from 'react-icons/fa'

const App = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        // Example quizzes
        setQuizzes([
            { id: 9, name: 'General Knowledge' },
            { id: 10, name: 'Entertainment: Books' },
            { id: 11, name: 'Entertainment: Film' },
            { id: 12, name: 'Entertainment: Music' },
            { id: 13, name: 'Entertainment: Musicals & Theatres' },
            { id: 14, name: 'Entertainment: Television' },
            { id: 15, name: 'Entertainment: Video Games' },
            { id: 16, name: 'Entertainment: Board Games' },
            { id: 17, name: 'Science & Nature' },
            { id: 18, name: 'Science: Computers' },
            { id: 19, name: 'Science: Mathematics' },
            { id: 20, name: 'Mythology' },
            { id: 21, name: 'Sports' },
            { id: 22, name: 'Geography' },
            { id: 23, name: 'History' },
            { id: 24, name: 'Politics' },
            { id: 25, name: 'Art' },
            { id: 26, name: 'Celebrities' },
            { id: 27, name: 'Animals' },
            { id: 28, name: 'Vehicles' },
            { id: 29, name: 'Entertainment: Comics' },
            { id: 30, name: 'Science: Gadgets' },
            { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
            { id: 32, name: 'Entertainment: Cartoon & Animations' }
        ]);
    }, []);

    useEffect(() => {
        if (selectedQuiz) {
            const fetchQuestions = async () => {
                try {
                    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedQuiz}&type=multiple`);
                    const formattedQuestions = response.data.results.map((question) => {
                        const answers = [...question.incorrect_answers];
                        const correctIndex = Math.floor(Math.random() * 4);
                        answers.splice(correctIndex, 0, question.correct_answer);
                        return {
                            question: question.question,
                            answers,
                            correctAnswer: question.correct_answer,
                        };
                    });
                    setQuestions(formattedQuestions);
                } catch (error) {
                    console.error('Error fetching questions:', error);
                }
            };

            fetchQuestions();
        }
    }, [selectedQuiz]);

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setStartTime(Date.now());
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizComplete(true);
            setEndTime(Date.now());
        }
    };

    const calculateTimeTaken = () => {
        if (startTime && endTime) {
            const timeInSeconds = Math.floor((endTime - startTime) / 1000);
            return `${Math.floor(timeInSeconds / 60)} minutes and ${timeInSeconds % 60} seconds`;
        }
        return '0 seconds';
    };

    const getPassMessage = () => {
        const passPercentage = 70; // Example pass percentage
        const achievedPercentage = (score / questions.length) * 100;
        return achievedPercentage >= passPercentage ? 'Congratulations! You passed!' : 'Better luck next time!';
    };

    const handleShareResultTwitter = () => {
        const message = `I scored ${score}/${questions.length} on the ${quizzes.find(q => q.id === selectedQuiz).name} quiz! Try it out!`;
        const url = encodeURIComponent(`https://yourquizapp.com`);// link to the github hostpage later 
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
        window.open(shareUrl, '_blank');
    };
    ////add other links here below 
    const handleShareResultFacebook = () => {
        const message = `I scored ${score}/${questions.length} on the ${quizzes.find(q => q.id === selectedQuiz).name} quiz! Try it out!`;
        const url = encodeURIComponent(`https://yourquizapp.com`); // link to the GitHub host page later
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(message)}`;
        window.open(shareUrl, '_blank');
    };

    const handleShareResultInstagram = () => {
        const message = `I scored ${score}/${questions.length} on the ${quizzes.find(q => q.id === selectedQuiz).name} quiz! Try it out!`;
        const url = `https://yourquizapp.com`; // link to the GitHub host page later
        const instagramUrl = `https://www.instagram.com/create/story/?background_image=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
        window.open(instagramUrl, '_blank');
    };
    
    

    return (
        <div className="app">
            <h1>Quiz App</h1>

            {!quizStarted ? (
                <div className="quiz-selection">
                    <h2>Select a Quiz:</h2>
                    {quizzes.map((quiz) => (
                        <button key={quiz.id} onClick={() => setSelectedQuiz(quiz.id)}>
                            {quiz.name}
                        </button>
                    ))}
                    {selectedQuiz && (
                        <button onClick={handleStartQuiz} id='start-quiz'>
                            Start Quiz
                        </button>
                    )}
                </div>
            ) : quizComplete ? (
                <div className="result">
                    <h2>Quiz Complete!</h2>
                    <p>Your score: {score} / {questions.length}</p>
                    <p>Time taken: {calculateTimeTaken()}</p>
                    <p>{getPassMessage()}</p>
                    <FaTwitter onClick={handleShareResultTwitter} className='shareButtons'></FaTwitter>
                    <FaFacebook onClick={handleShareResultFacebook} className='shareButtons'></FaFacebook>
                    <FaInstagram onClick={handleShareResultInstagram} className='shareButtons'></FaInstagram>
                </div>
            ) : questions.length > 0 ? (
                <div className="quiz">
                    <h2>Question {currentQuestionIndex + 1}:</h2>
                    <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                    <div className="answers">
                        {questions[currentQuestionIndex].answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(answer)}
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        ))}
                    </div>
                    <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
};

export default App;

