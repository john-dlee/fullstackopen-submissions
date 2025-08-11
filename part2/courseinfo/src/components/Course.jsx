const Header = (props) => <h2>{props.name}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => <Part key={part.name} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) => <b>total of {parts.reduce((acc, curValue) =>  acc + curValue.exercises, 0)} exercises </b>

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
  </div>
)

export default Course