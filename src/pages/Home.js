import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import CourseCard from '../components/CourseCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [courses, setCourses] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setCourses(prevCourses => {
      return prevCourses.filter(cs => cs.id !== id)
    })
  }

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses') 
        .select()
        .order(orderBy, {ascending: false})
      
        if (error) {
          setFetchError('Não foi possível carregar os cursos')
          setCourses(null)
          console.log(error)
        }
        if (data) {
          setCourses(data)
          setFetchError(null)
        }
    }

    fetchCourses()

  }, [orderBy])


  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {courses && (
        <div className="courses">
          <div className="order-by">
            <p>Ordenar por:</p>
            <button onClick={() => setOrderBy('created_at')}>Tempo Criado</button>
            <button onClick={() => setOrderBy('title')}>Título</button>
            <button onClick={() => setOrderBy('hours')}>Carga Horária</button>
            {/* {orderBy} */}
          </div>
          <div className="course-grid">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home