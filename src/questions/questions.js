import React from "react";
import { useGlobalContext } from "../components/context";

const Questions = () => {
  const {
    loading,
    startingPoint,
    answers,
    handleClick,
    incorrect,
    correct,
    amount,
    category,
    handleChanges,
    setForm,
    formCompleted,
  } = useGlobalContext();

  if (loading) {
    return <h1 style={{ color: "white", marginTop: "180px" }}>Loading...</h1>;
  }
  if (formCompleted === false) {
    return (
      <div className="quiz-setup">
        <h2>Quiz Setup</h2>
        <form onSubmit={(e) => setForm(e)}>
          <label htmlFor="category">Choose category</label>
          <br />
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => handleChanges(e)}
          >
            <option value={9}>Any</option>
            <option value={24}>General Knowledge</option>
            <option value={12}>Film</option>
            <option value={13}>Music</option>
            <option value={14}>Television</option>
            <option value={15}>Video Games</option>
            <option value={17}>Science and Nature</option>
            <option value={21}>Sports</option>
            <option value={22}>Geography</option>
            <option value={23}>History</option>
            <option value={24}>Politics</option>
            <option value={25}>Art</option>
            <option value={29}>Comics</option>
          </select>
          <br />
          <label htmlFor="amount">Number of questions</label>
          <br />
          <input
            type="number"
            name="amount"
            value={amount}
            min="1"
            max="30"
            required
            onChange={(e) => handleChanges(e)}
          />
          <br />
          <br />
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    );
  }
  return (
    <>
      <div className="quiz">
        <p>Correct : {correct}</p>
        <br />
        <p>Incorrect : {incorrect}</p>
        {startingPoint < amount ? (
          answers.map((item, index) => {
            if (startingPoint === index) {
              return (
                <div key={index}>
                  <h4>{item.question}</h4>
                  <ul>
                    {item.allAnswers.map((item, index) => {
                      return (
                        <li key={index} onClick={(e) => handleClick(e)}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })
        ) : (
          <div>
            <button onClick={() => window.location.reload()}>play again</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Questions;
