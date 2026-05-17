const Header = ({header}) => {
  return(
    <h1>{header}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map( part => <li key={part.id}>{part.name} {part.exercises}</li>)}
      <Total parts = {parts} />
    </div>
  )
}
const Total = ({parts}) => {
  const sum = parts.reduce((sum, part)=> sum + part.exercises,0)

  return(
    <p> total of {sum} excercises</p>
  )
}

const Course = ({courses}) => {
  return(
    <div>
      {courses.map(course =>
        <div key ={course.id}>
          <Header header =  {course.name} />
          <Content parts= {course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course
