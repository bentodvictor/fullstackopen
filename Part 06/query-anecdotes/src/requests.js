import axios from 'axios'

const serverUrl = 'http://localhost:3001'
const generateId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
    const response = await axios.get(`${serverUrl}/anecdotes`)
    return response.data
}

export const createAnecdote = async (content) => {
    if (content.length < 5) {
        throw new Error('anecdote must be at least 5 characters long.')
    }

    const response = await axios.post(`${serverUrl}/anecdotes`, {
        id: generateId(),
        content: content,
        votes: 0
    })
    return response.data
}

export const updateVote = async (anecdote) => {
    const response = await axios.patch(`${serverUrl}/anecdotes/${anecdote.id}`, {
        id: anecdote.id,
        content: anecdote.content,
        votes: anecdote.votes + 1
    })
    return response.data
}