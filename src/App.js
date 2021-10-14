import axios from "axios";
import { useEffect, useState } from "react";
import ScootersList from "./components/ScootersList";

function App() {
  const [scooters, setScooters] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [regInput, setReg] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [kmInput, setKm] = useState(0);

  function regInputHandler(e) {
    setReg(e.target.value)
  }
  function dateInputHandler(e) {
    setDateInput(e.target.value)
  }
  function kmInputHandler(e) {
    setKm(parseFloat(e.target.value))
  }

  function addHandler() {
    const Scooter = {
      id: regInput,
      busy: 0,
      date: dateInput,
      ride: kmInput
    }
    addScooter(Scooter)
    setReg("")
    setDateInput("")
    setKm(0)
  }



  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
      .then((response) => {
        setScooters(response.data);
      })
  }, [lastUpdate])

  const addScooter = (scooter) => {
    axios.post('http://localhost:3003/scooters', scooter)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const deleteScooter = (id) => {
    axios.delete('http://localhost:3003/scooters/' + id)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const edit = (id, date) => {
    axios.put('http://localhost:3003/scooters/' + id, date)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }



  return (
    <>
      <h1>Welcome to Scooters management window!</h1>
      <div className="inputForm">
        <div className="inputComponent">
          <label>Registracijos numeris</label>
          <input type="text" name="reg" value={regInput} onChange={regInputHandler}></input>
        </div>
        <div className="inputComponent">
          <label>Paskutinio naudojimo data</label>
          <input type="date" name="date" value={dateInput} onChange={dateInputHandler}></input>
        </div>
        <div className="inputComponent">
          <label>Rida</label>
          <input type="number" name="km" value={kmInput} onChange={kmInputHandler}></input>
        </div>
        <div className="inputComponent">
          <button onClick={() => addHandler()}>Submit</button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Registracijos kodas</th>
            <th>Būsena</th>
            <th>Paskutinio naudojimo data</th>
            <th>Rida</th>
            <th>Funkcijos</th>
          </tr>

          <ScootersList scooters={scooters} deleteScooter={deleteScooter} edit={edit} />
        </tbody>
      </table>
    </>
  );
}

export default App;
