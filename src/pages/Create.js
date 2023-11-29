import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const Create = () => {
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
      .insert([{ title, description, hours }])
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

  return (
    <div className="page create">
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

        <button>Criar Novo Curso</button>

        {formError && <p className="error">{formError}</p>}
        
      </form>
    </div>
  )
}

export default Create