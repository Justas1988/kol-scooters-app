import axios from "axios";
import { useEffect, useState } from "react";
import ScootersList from "./components/ScootersList";
import DateConverter from "./components/DateConverter";

function App() {
  const [scooters, setScooters] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [regInput, setReg] = useState(randomID());
  const [dateInput, setDateInput] = useState(DateConverter(Date.now()));
  const [kmInput, setKm] = useState(0);
  const [kmSortState, setkmSortState] = useState(1);
  const [freeSortState, setfreeSortState] = useState(1);

  function randomID() {
    let key = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
      key += characters.charAt(Math.floor(Math.random() *
        characters.length));
    }
    return key;
  }

  /////////////////////sorting functions ////////////////////////////////

  function sortingByKM(a) {
    if (a === 1) {
      const SortedScooters = [...scooters]
      SortedScooters.sort(sorterDSC)
      setScooters(SortedScooters)
      setkmSortState(0)
    } else {
      const SortedScooters = [...scooters]
      SortedScooters.sort(sorterASC)
      setScooters(SortedScooters)
      setkmSortState(1)

    }
  }

  function sortingByfree(a) {
    if (a === 1) {
      const SortedScooters = [...scooters]
      SortedScooters.sort(sorterDSCfree)
      setScooters(SortedScooters)
      setfreeSortState(0)
    } else {
      const SortedScooters = [...scooters]
      SortedScooters.sort(sorterASCfree)
      setScooters(SortedScooters)
      setfreeSortState(1)

    }
  }

  function sorterDSC(a, b) {
    if ((a.total_ride_kilometers) > (b.total_ride_kilometers)) {
      return -1;
    }
    if ((a.total_ride_kilometers) < (b.total_ride_kilometers)) {
      return 1;
    }
    return 0;
  }

  function sorterASC(a, b) {
    if ((a.total_ride_kilometers) > (b.total_ride_kilometers)) {
      return 1;
    }
    if ((a.total_ride_kilometers) < (b.total_ride_kilometers)) {
      return -1;
    }
    return 0;
  }

  function sorterDSCfree(a, b) {
    if ((a.is_busy) > (b.is_busy)) {
      return -1;
    }
    if ((a.is_busy) < (b.is_busy)) {
      return 1;
    }
    return 0;
  }

  function sorterASCfree(a, b) {
    if ((a.is_busy) > (b.is_busy)) {
      return 1;
    }
    if ((a.is_busy) < (b.is_busy)) {
      return -1;
    }
    return 0;
  }

  /////////////////////sorting functions ////////////////////////////////

  function totalRide() {
    let total = 0;
    if (scooters.length > 0) {
      for (let i = 0; i < scooters.length; i++) {
        total = total + scooters[i].total_ride_kilometers;
      } return total;
    } return 0
  }

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
    if (kmInput < 0 || kmInput > 9999.99) {
      return window.alert("netinka paspirtuko RIDA, ??veskite skai??i?? nuo 0 - 9999.99");
    }
    const Scooter = {
      id: regInput,
      busy: 0,
      date: dateInput,
      ride: kmInput
    }
    addScooter(Scooter)
    setReg(randomID())
    setDateInput(DateConverter(Date.now()))
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
          <input type="text" name="reg" value={regInput} onChange={regInputHandler} disabled></input>
        </div>
        <div className="inputComponent">
          <label>Paskutinio naudojimo data</label>
          <input type="date" name="date" value={dateInput} onChange={dateInputHandler}></input>
        </div>
        <div className="inputComponent">
          <label>Rida</label>
          <input type="number" name="km" value={kmInput} onChange={kmInputHandler} min="0" step="0.01" ></input>
        </div>
        <div className="inputComponent">
          <button onClick={() => addHandler()}>Submit</button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Registracijos kodas</th>
            <th>B??sena <button onClick={() => sortingByfree(freeSortState)}>Sort</button></th>
            <th>Paskutinio naudojimo data</th>
            <th>Rida <button onClick={() => sortingByKM(kmSortState)}>Sort</button></th>
            <th>Funkcijos</th>
          </tr>

          <ScootersList scooters={scooters} deleteScooter={deleteScooter} edit={edit} />
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Bendra rida: {totalRide()} km</th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
