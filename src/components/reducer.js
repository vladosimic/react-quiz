const reducer = (state, action) => {
  if (action.type === "FETCH_DATA") {
    let correctIncorrect = action.payload.map((item) => {
      let correct = [item.correct_answer];
      const arr = {
        question: item.question,
        allAnswers: correct
          .concat(item.incorrect_answers)
          .sort(() => Math.random() - 0.5),
        correct_answer: item.correct_answer,
      };

      return arr;
    });

    return { ...state, answers: correctIncorrect };
  }
  if (action.type === "ANSWER_CLICKED") {
    let all = state.answers[state.startingPoint].allAnswers.find((item) => {
      if (action.payload === item) {
        return item;
      }
    });

    let correctAnswer = state.answers[state.startingPoint].correct_answer;

    if (all === correctAnswer) {
      return {
        ...state,
        startingPoint: state.startingPoint + 1,
        correct: state.correct + 1,
      };
    } else {
      return {
        ...state,
        startingPoint: state.startingPoint + 1,
        incorrect: state.incorrect + 1,
      };
    }
  }
  if (action.type === "FORM_COMPLETED") {
    return { ...state, formCompleted: true };
  }
  if (action.type === "CHANGES") {
    const name = action.payload.target.name;
    const value = action.payload.target.value;
    return { ...state, [name]: value };
  }

  return state;
};

export default reducer;
