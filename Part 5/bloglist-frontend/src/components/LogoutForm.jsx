export const LogoutForm = ({ username, onClickLogout }) => {
  return (
    <div>
      <p>{username} logged-in</p> <button onClick={onClickLogout}>logout</button>
    </div>
  )
}