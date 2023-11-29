import { useParams, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !hours) {
      setFormError('Por favor, preencha todos os campos corretamente')
      return
    }
      
    // Verifica se o campo de horas segue o padrão desejado
    if (!/^\d+h$/i.test(hours)) {
        setFormError('O campo de carga horária deve começar com números e terminar com "h"');
        return;
    }

    const { data, error } = await supabase
      .from('courses')
      .update({ title, description, hours })
      .eq('id', id)
      .select()
    
    if (error) {
      console.log(error)
      setFormError('Por favor, preencha todos os campos corretamente')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }


  }

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select()
        .eq('id', id)
        .single()
      
      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setHours(data.hours)
        console.log(data)
      }
    }

    fetchCourse()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <label htmlFor="hours">Carga Horária:</label>
        <input
          type="text"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        /> 

        <button>Salvar Mudanças no Curso</button>

        {formError && <p className="error">{formError}</p>}
        
      </form>
    </div>
  )
}

export default Update