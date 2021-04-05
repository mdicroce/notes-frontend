import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'

const App = () => {
  return (
    <div>
      <Countries />
    </div>
  )
  /* const [persons, setPersons] = useState([])
  useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  const [newName, setNewName] = useState('')
  const [filter, newFilter] = useState('')
  const changeHandler = (status) =>{
    let value = status["target"]["value"];
    let name = status.target.name;
    let aux = {...newName};
    aux[name] = value;
    setNewName({...aux});
    
  }
  const subHandler = (status) =>{
    status.preventDefault();
    
    if(persons.some((value)=>value.name === newName.name))
    {
      alert(`${newName.name} is already added to the phonebook`)
    }
    else
    {
      setPersons(persons.concat(newName));
    }
    status.target[0].value = "";
    status.target[1].value="";
    
  }
  return (
    <div>
      <Filter newFilter = {newFilter}/>
      <h2>Phonebook</h2>
      <form onSubmit={subHandler}>
        <div>
          name: <input name="name" onChange={changeHandler} type="text"/>
          number: <input name="number" onChange={changeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowNumbers numbers={persons} filter={filter}  />
    </div>
  ) */
}
const Filter = ({newFilter}) => {
  const filterHandler = (status) => {
    newFilter(status.target.value);
  }
  return ( <form>
    <input type="text" onChange={filterHandler}/>

  </form>
  )
}
const ShowNumbers = ({numbers,filter}) =>
{
  return (
    numbers.map((actual) =>{
      if(actual.name.search(filter) !== -1)
      {
        return (
          <div key={actual.name}>
  
            <p> {actual.name} <i> {actual.phone} </i> </p>
  
          </div>
        )
        
      }

    })
  )
}
export default App;
