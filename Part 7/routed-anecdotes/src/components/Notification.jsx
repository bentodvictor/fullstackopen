export const Notification = ({ notification, clearNotification }) => {
    const notificationStyle = {
        border: '0.5px solid black',
        padding: '1px'
    }
    

    if (notification !== '') {
        setTimeout(() => {
            clearNotification()
        }, 5000);
        
        return (
            <div style={notificationStyle}>
                <p>{notification}</p>
            </div>
        )
    }

    return (<></>)
}