function Character({name,moves}){


return (

  <div>
  <h1>{name}</h1>
  <span>{moves.join(',')}</span>
  </div>
)

}

export default Character