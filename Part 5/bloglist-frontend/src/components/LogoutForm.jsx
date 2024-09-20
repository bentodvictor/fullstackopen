export const LogoutForm = ({ username, onClickLogout }) => {
  return (
    <div>
      <p><span>{username}</span> <span>logged-in</span></p> <button onClick={onClickLogout}>logout</button>
    </div>
  )
}