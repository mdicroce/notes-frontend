import React, { useState, useEffect } from 'react'
import dbConections from './Services/dbConection'
const App = () => {
  const [persons, setPersons] = useState([])
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    dbConections.getAll()
      .then(response => {
        setPersons([...response])
      })
  }, [])
  const [stilo, setStilo] = useState(success);
  const [newName, setNewName] = useState('')
  const [filter, newFilter] = useState('')
  const changeHandler = (status) => {
    let value = status["target"]["value"];
    let name = status.target.name;
    let aux = { ...newName };
    aux[name] = value;
    setNewName({ ...aux });
  }
  const changeNumber = () => {
    const PersonToChange = {
      "name" : newName.name,
      "number" : newName.number
    }
    let id = persons.find((actual)=>newName.name == actual.name).id;
    console.log(id);
    dbConections.modify(id,PersonToChange)
    .then(response => {
      setPersons(persons.map((actual)=>{
        if(actual.id !== id)
        {
          return actual;
        }
        else
        {
          return response;
        }
      }))
    })
    .catch(error => {
      setStilo(fail);
      setMensaje(`Information of ${PersonToChange.name} has been deleted`);
      setTimeout(()=>{setMensaje("")
      setStilo(success);
    },2000);
    }
    )
  }
  const subHandler = (status) => {
    status.preventDefault();
    if (persons.some((value) => value.name === newName.name)) 
      {
        if(window.confirm(`${newName.name} is already added to the phonebook,do you want to change the number?`))
        changeNumber();

      }
    else {
      const personToAdd = {
        "name": newName.name,
        "number": newName.number
      }
      
      dbConections.create(personToAdd)
        .then(response => {
          setPersons([...persons,response])
          setMensaje(`Added ${response.name}`);
        })
        setTimeout(()=>setMensaje(""),2000)
      }
  status.target[0].value = "";
  status.target[1].value = "";

}

return (
  <div>
    <Filter newFilter={newFilter} />
    <Mensaje  mensaje={mensaje} stilo={stilo}/>
    <h2>Phonebook</h2>
    <form onSubmit={subHandler}>
      <div>
        name: <input name="name" onChange={changeHandler} type="text" />
          number: <input name="number" onChange={changeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ShowNumbers numbers={persons} filter={filter} setPersons={setPersons} />
  </div>
)
}
const success = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px"
}
const fail = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px"
}
const Filter = ({ newFilter }) => {
  const filterHandler = (status) => {
    newFilter(status.target.value);
  }
  return (<form>
    <input type="text" onChange={filterHandler} />

  </form>
  )
}
const Mensaje = ({mensaje,stilo}) => 
{
  if(mensaje)
  {
    return (
      <div style={stilo}>{mensaje}</div>
    )
  }
  else
  {
    return (
      <></>
    )
  }
}
const ShowNumbers = ({ numbers, filter, setPersons}) => {
  const regEx = new RegExp(`${filter}`, "i");
  if (numbers.length !== 0) {
    return (
      <div>
        {numbers.filter((actual) => actual.name).filter((actual) => actual.name.match(regEx)).map((actual) => {
          return (
            <div key={actual.id}>
              <p><b>Name: </b>{actual.name}<b> Number: </b>{actual.number}</p>
              <DeleteButton id={actual.id} setPersons={setPersons} number ={numbers}/>
            </div>
          )
        })}
      </div>
    );
  }
  else {
    return (<div></div>)
  }
}
const DeleteButton = ({id,setPersons,number}) =>
{
  const deleteFunction = () =>
  {
    if(window.confirm(`Desea eliminar a ${number.find((actual)=>actual.id === id).name}`))
    {
      dbConections.deleteThis(id)
      .then(() => setPersons(number.filter((actual)=>actual.id !== id))
      )

    }
  }
  return (
    <button onClick={deleteFunction}>
      Delete
    </button>
  )
} 
export default App;
