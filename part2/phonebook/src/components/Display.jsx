const Display = ({ visiblePersons, onDelete }) => {
  return (
    <ul>
      {visiblePersons.map(person => 
        <li key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => onDelete(person.id)}>delete</button>
        </li>)}
    </ul>
  )
}

export default Display