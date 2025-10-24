import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVote } from './requests'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedList = anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      queryClient.setQueryData(['anecdotes'], updatedList)
      notificationDispatch({
        type: 'notify',
        payload: `anecdote '${updatedAnecdote.content}' voted.`
      })
    }
  })


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate(anecdote)
  }

  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {result.isLoading && <div>loading data...</div>}
      {!result.isLoading && result.isSuccess && anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ marginTop: '0.75rem' }}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}> vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
