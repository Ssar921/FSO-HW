import { useState } from "react";

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, bad, neutral }) => {
	const allFeedback = good + neutral + bad;

	if (allFeedback === 0) {
		return <p>No feedback yet</p>;
	}

	const avg = (good - bad) / allFeedback;
	const positive = `${good / allFeedback} %`;

	return (
		<>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={allFeedback} />
					<StatisticLine text="average" value={avg} />
					<StatisticLine text="positive" value={positive} />
				</tbody>
			</table>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>Give Feedback</h1>
			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
