import React, { useState, useEffect } from 'react';

export default function Scooter({ scooter, deleteScooter, edit }) {
    const [dateInput, setDate] = useState("");
    const [kmInput, setKm] = useState(0);
    const [editRowStyle, setStyle] = useState("editRow");
    const [isChecked, setChecked] = useState(false);

    useEffect( () => {
        if (scooter.is_busy === 0) {
            setChecked(true)
        } else {
            setChecked(false)
        }

    },[scooter.is_busy])

    function dateConverter(a) {
        let date = new Date(a);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + dt;
    }

    function setStyleHandler() {
        if (editRowStyle === "editRow") {
            setStyle("")
        } else { setStyle("editRow")

        }
    }


    function dateInputHandler(e) {
        setDate(e.target.value)
    }

    function kmInputHandler(e) {
        setKm(parseFloat(e.target.value))
    }

    function editKmTrigger(a, b) {
        edit(a, b)
        setKm(0)
    }

    let busy = "";
    if (scooter.is_busy === 1) {
        busy = "Užimtas";
    } else { busy = "Nenaudojamas"; }

    return (
        <>
            <tr className="scootersList">
                <td>{scooter.registration_code}</td>
                <td className="taken">{busy}</td>
                <td>{dateConverter(scooter.last_use_time)}</td>
                <td>{scooter.total_ride_kilometers}</td>
                <td><button onClick={() => deleteScooter(scooter.registration_code)}>Delete!</button>
                    <button onClick={() => setStyleHandler()}>Edit!</button></td>
            </tr>
            <tr className={editRowStyle}>
                <td></td>
                <td><input type="checkbox" name="isFree" checked={isChecked} onChange={() => edit(scooter.registration_code, { date: dateConverter(scooter.last_use_time), busy: !scooter.is_busy, ride: scooter.total_ride_kilometers })}/><label>Ar paspirtukas laisvas?</label></td>
                <td><input type="date" value={dateInput} onChange={dateInputHandler} />
                    <button className="dateBtn" onClick={() => edit(scooter.registration_code, { date: dateInput, busy: scooter.is_busy, ride: scooter.total_ride_kilometers })}>Submit</button></td>
                <td><input type="number" value={kmInput} onChange={kmInputHandler} />
                    <button onClick={() => editKmTrigger(scooter.registration_code, { date: dateConverter(scooter.last_use_time), busy: scooter.is_busy, ride: kmInput + scooter.total_ride_kilometers })}>Submit</button></td>
                <td></td>
            </tr>
        </>
    )
}
