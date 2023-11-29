import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const CourseCard = ({ course, onDelete }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('courses')
            .delete()
            .eq('id', course.id)
            .select()
        
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            onDelete(course.id)
        }

    }

    return (
        <div className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="hours">{course.hours}</div>
            <div className="buttons">
                <Link to={'/' + course.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default CourseCard