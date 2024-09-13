export const Notification = ({ type, message }) => {
    const color = type === 'error' ? 'red' : 'green'

    return (
        <div>
            <p style={{
                textTransform: 'uppercase',
                color: color,
                fontWeight: 'bold',
                border: `4px solid ${color}`,
                padding: '10px',                
            }}>
                {message}
            </p>
        </div>
    )
}