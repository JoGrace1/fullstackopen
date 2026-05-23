import './notification.css'

const Notification = ({ message }) => {
  if (message === null || message === "") {
    return null
  }

  return (
    <h1 className="notification">
      {message}
    </h1>
  )
}

export default Notification
