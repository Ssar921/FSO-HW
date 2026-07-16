import { useState } from "react";

const AnecdoteInfo = ({ title, anecdotes, votes, index }) => {
	return (
		<>
			<h1>{title}</h1>
			<div>{anecdotes[index]}</div>
			<div>has {votes[index]} votes</div>
		</>
	);
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

	const handleNext = () =>
		setSelected(Math.floor(Math.random() * anecdotes.length));

	const handleVote = () => {
		const newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	const mostVotedIndex = votes.indexOf(Math.max(...votes));

	return (
		<>
			<AnecdoteInfo
				title="Anecdote of the day"
				anecdotes={anecdotes}
				votes={votes}
				index={selected}
			/>
			<Button handleClick={handleNext} text="next anecdote" />
			<Button handleClick={handleVote} text="vote" />

			{votes[mostVotedIndex] > 0 && (
				<AnecdoteInfo
					title="Anecdote with most votes"
					anecdotes={anecdotes}
					votes={votes}
					index={mostVotedIndex}
				/>
			)}
		</>
	);
};

export default App;
