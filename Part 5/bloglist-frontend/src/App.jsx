import { useState, useEffect, useSyncExternalStore } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { BlogList } from './components/BlogList'
import { Notification } from './components/Notification'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { LogoutForm } from './components/LogoutForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    loadBlogs()
    setUserToken()
  }, [])

  const setUserToken = () => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      setError(ex.response.data.error)

      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUsername('')
    setPassword('')
  }

  const addBlog = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const blog = {
      title: formData.get('title'),
      author: formData.get('author'),
      url: formData.get('url')
    };

    const response = await blogService.create(blog)

    if (response?.id) {
      loadBlogs()
      setSuccess(`a new blog \"${response.title}\" by \"${response.author}\" added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    }

    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  const handleAuthor = ({ target }) => setAuthor(target.value)
  const handleTitle = ({ target }) => setTitle(target.value)
  const handleUrl = ({ target }) => setUrl(target.value)
  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)

  const loadBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  return (
    <div>
      {error && <Notification type='error' message={error} />}
      {success && <Notification type='success' message={success} />}

      <h2>BLOGS</h2>
      {
        user === null
          ? <LoginForm password={password} username={username} handleLogin={handleLogin} onChangeUsername={handleUsername} onChangeValue={handlePassword} />
          : <LogoutForm username={user?.username} onClickLogout={handleLogout} />
      }

      <br />
      <hr />

      {user !== null && <BlogForm
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
        onChangeAuthor={handleAuthor}
        onChangeTitle={handleTitle}
        onChangeUrl={handleUrl}
      />}

      <br />

      {user !== null && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App