# 7.1: Routed Anecdotes, step 1
Add React Router to the application so that by clicking links in the Menu component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes.

The Footer component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create.

# 7.2: Routed Anecdotes, step 2
Implement a view for showing a single anecdote

Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

# 7.3: Routed Anecdotes, step3
The default functionality of the creation form is quite confusing because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds.

# 7.4: Anecdotes and Hooks step 1
Simplify the anecdote creation form of your application with the useField custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the /src/hooks/index.js file.

If you use the named export instead of the default export:

```javascript
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
```

Then importing happens in the following way:

```javascript
import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```

# 7.5: Anecdotes and Hooks step 2
Add a button to the form that you can use to clear all the input fields

Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

Depending on your solution, you may see the following warning in your console

We will return to this warning in the next exercise.

# 7.6: Anecdotes and Hooks step 3
If your solution did not cause a warning to appear in the console, you have already finished this exercise.

If you see the Invalid value for prop `reset` on <input> tag warning in the console, make the necessary changes to get rid of it.

The reason for this warning is that after making the changes to your application, the following expression:

```javascript
<input {...content}/>copy
Essentially, is the same as this:

<input
  value={content.value} 
  type={content.type}
  onChange={content.onChange}
  reset={content.reset}
/>
```

The input element should not be given a reset attribute.

One simple fix would be to not use the spread syntax and write all of the forms like this:

```javascript
<input
  value={username.value} 
  type={username.type}
  onChange={username.onChange}
/>
```

If we were to do this, we would lose much of the benefit provided by the useField hook. Instead, come up with a solution that fixes the issue, but is still easy to use with the spread syntax.

# 7.7: Country hook
Let's return to exercises 2.18-2.20.

Use the code from https://github.com/fullstack-hy2020/country-hook as your starting point.

The application can be used to search for a country's details from the service in https://studies.cs.helsinki.fi/restcountries/. If a country is found, its details are displayed

If no country is found, a message is displayed to the user

The application is otherwise complete, but in this exercise, you have to implement a custom hook useCountry, which can be used to search for the details of the country given to the hook as a parameter.

Use the API endpoint name to fetch a country's details in a useEffect hook within your custom hook.

Note that in this exercise it is essential to use useEffect's second parameter array to control when the effect function is executed. See the course part 2 for more info how the second parameter could be used.

# 7.8: Ultimate Hooks
The code of the application responsible for communicating with the backend of the note application of the previous parts looks like this:

```javascript
import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

export default { getAll, create, update, setToken }
```

We notice that the code is in no way specific to the fact that our application deals with notes. Excluding the value of the baseUrl variable, the same code could be reused in the blog post application for dealing with the communication with the backend.

Extract the code for communicating with the backend into its own useResource hook. It is sufficient to implement fetching all resources and creating a new resource.

You can do the exercise in the project found in the https://github.com/fullstack-hy2020/ultimate-hooks repository. The App component for the project is the following:

```javascript
const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}
```

The useResource custom hook returns an array of two items just like the state hooks. The first item of the array contains all of the individual resources and the second item of the array is an object that can be used for manipulating the resource collection, like creating new ones.

If you implement the hook correctly, it can be used for both notes and phone numbers (start the server with the npm run server command at port 3005).
