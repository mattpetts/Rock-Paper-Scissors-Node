const normaliseAnswer = (answer) => answer.trim().toLowerCase();
const answerIsValid   = (answer) => ['rock', 'paper', 'scissors'].includes(answer);

module.exports = {
    normaliseAnswer,
    answerIsValid
}