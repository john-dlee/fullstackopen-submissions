const Header = (props) => <h1>{props.name}</h1>

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

const Total = ({ parts }) => <p>Number of exercises {parts.reduce((acc, curValue) =>  acc + curValue.exercises, 0)}</p>

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }
  return <Course course={course} />
  
}

export default App
