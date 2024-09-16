export const LoginForm = ({ username, password, handleLogin, onChangeUsername, onChangeValue }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username:
          <input type='text' value={username} onChange={onChangeUsername} />
        </div>
        <div>password:
          <input type='password' value={password} onChange={onChangeValue} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}