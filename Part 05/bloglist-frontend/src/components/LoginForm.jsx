export const LoginForm = ({ username, password, handleLogin, onChangeUsername, onChangeValue }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username:
          <input data-testid='username' type='text' value={username} onChange={onChangeUsername} />
        </div>
        <div>password:
          <input data-testid='password' type='password' value={password} onChange={onChangeValue} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}