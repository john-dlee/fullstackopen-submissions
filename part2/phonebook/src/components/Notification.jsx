const Notification = ({ notification }) => {
  if (notification === null) return null

  const notiStyle = {
    color: notification.isError ? 'red' : 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '20px',
    marginBottom: '10px'
  }
  
  return (
    <div style={notiStyle}>
      {notification.message}
    </div>
  )
}

export default Notification