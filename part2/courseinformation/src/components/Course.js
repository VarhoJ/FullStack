const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  const Total = ({ parts }) => {
    console.log(parts)
    const exercises= parts.map(part => part.exercises)
    console.log(exercises)
  
    const sum = exercises.reduce((s,p) => s+p, 0)
    console.log({sum})
    return (
        <b> Total of exercises {sum} </b>
    ) 
  
  }
   
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Course = ({course}) => {
    console.log("toimii tässä", course)
    return (
      <div> 
        <Header course={course.name} />
        {course.parts.map( part => 
           <Part key={part.id} part={part} /> 
        )}
        <Total parts={course.parts} />
      </div>
      
    )
  }

  export default Course