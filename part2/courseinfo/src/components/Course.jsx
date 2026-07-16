const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
	<div>
		{props.parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</div>
);

const Part = (props) => (
	<p>
		{props.part.name} {props.part.exercises}
	</p>
);

const Total = (props) => <b>total of {props.total} exercises</b>;

const Course = ({ course }) => {
	const total = course.parts.reduce(
		(sum, course) => sum + course.exercises,
		0,
	);

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total total={total} />
		</div>
	);
};

export default Course;
