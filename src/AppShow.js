export const AppShow = ({ course }) => {
    return (
        <div>
            {course.map((actualCourse) => {
                return (<div key={actualCourse.id}>
                    <Header header={actualCourse.name} />
                    <Content parts={actualCourse.parts} />
                    <Total exercises={actualCourse.parts} />
                </div>
                )
            })}

        </div>
    )
}

const Header = ({ header }) => <h1> {header}</h1>
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((course) => {
                return (<div key={course.id}>
                    <p> {course.name} <span> {course.exercises} </span></p>
                </div>)
            })}
        </div>
    )
}

const Total = ({ exercises }) => {
    const exer = exercises.map((actual) => actual.exercises).reduce((total, actual) => total += actual);
    return <div>total of {exer} exercises</div>

}