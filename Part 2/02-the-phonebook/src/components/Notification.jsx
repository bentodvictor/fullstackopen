export const Notification = ({ message, status }) => {
    if (message === null) {
        return null;
    }

    return (
        <div>
            <p className={status}>{message}</p>
        </div>
    );
}