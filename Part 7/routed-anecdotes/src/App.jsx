import { useState } from 'react'
import { Menu } from './components/Menu'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { Anecdote } from './components/Anecdote'
import { AnecdoteCreate } from './components/AnecdoteCreate'
import { AnecdoteList } from './components/AnecdoteList'
import { Notification } from './components/Notification'


const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`a new anecdote '${anecdote.content}' created!`)
  }

  const clearNotification = () => setNotification('')

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} clearNotification={clearNotification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/create' element={<AnecdoteCreate addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
