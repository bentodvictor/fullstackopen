# Exercise 6.20
Implement retrieving anecdotes from the server using React Query.

The application should work in such a way that if there are problems communicating with the server, only an error page will be displayed.

browser saying anecdote service not available due to problems in server on localhost
You can find here info how to detect the possible errors.

You can simulate a problem with the server by e.g. turning off the JSON Server. Please note that in a problem situation, the query is first in the state isLoading for a while, because if a request fails, React Query tries the request a few times before it states that the request is not successful. You can optionally specify that no retries are made:

```javascript
const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  }
)
```

or that the request is retried e.g. only once:

```javascript
const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  }
)
```

# Exercise 6.21
Implement adding new anecdotes to the server using React Query. The application should render a new anecdote by default. Note that the content of the anecdote must be at least 5 characters long, otherwise the server will reject the POST request. You don't have to worry about error handling now.

# Exercise 6.22
Implement voting for anecdotes using again the React Query. The application should automatically render the increased number of votes for the voted anecdote.


# Exercise 6.23.
The application has a Notification component for displaying notifications to the user.

Implement the application's notification state management using the useReducer hook and context. The notification should tell the user when a new anecdote is created or an anecdote is voted on.

The notification is displayed for five seconds.

# Exercise 6.24.
As stated in exercise 6.21, the server requires that the content of the anecdote to be added is at least 5 characters long. Now implement error handling for the insertion. In practice, it is sufficient to display a notification to the user in case of a failed POST request:

browser showing error notification for trying to add too short of an anecdoate
The error condition should be handled in the callback function registered for it, see here how to register a function.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your completed exercises to the exercise submission system.