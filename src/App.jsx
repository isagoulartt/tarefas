import './App.css'
import React, { useCallback, useReducer, useState } from 'react'

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TAREFA':
      return [...state, action.payload]
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
    case 'DELETAR_TAREFA':
      return state.filter((_, index) => index !== action.payload)
    default:
      return state
  }
}
function App() {
  const [tarefa, setTarefa] = useState('')

  const [tarefaAtual, dispatch] = useReducer(taskReducer, [])

  const addTarefa = useCallback(() => {
    if (tarefa.trim() !== '') {
      dispatch({ type: 'ADD_TAREFA', payload: { text: tarefa, completed: false } })
      setTarefa('');
    }
  }, [tarefa])

  const concluirTarefa = useCallback((index) => {
    dispatch({ type: 'CONCLUIDO', payload: index })
  }, [])

  const deletarTarefa = useCallback((index) => {
    dispatch({ type: 'DELETAR_TAREFA', payload: index })
  }, [])

  return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
        <div>
          <input  className='input'
            type="text" 
            placeholder='Nova tarefa' 
            value={tarefa} 
            onChange={(e) => setTarefa(e.target.value)} 
          />
          <button  className='adicionar' onClick={addTarefa}>Adicionar</button>
        </div>
        <ul>
          {tarefaAtual.map((tarefas, index) => (
            <li key={index} className="tarefa-item">
              <span style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                {tarefas.text}
              </span>
              <div className="tarefa-buttons">
                {!tarefas.completed && (
                  <button className='concluir' onClick={() => concluirTarefa(index)}>concluir</button>
                )}
                <button  className='excluir' onClick={() => deletarTarefa(index)}>excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default App
