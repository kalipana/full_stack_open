const Header = ({ name }) => {
    return (
        <div>
            <h2>
                {name}
            </h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercise}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercise={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((total, current) =>
        (total + current.exercises), 0
    )
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course