import React from 'react';
import Scooter from './Scooter';


export default function ScootersList({scooters, deleteScooter, edit}) {
    return (
        <>
            {scooters.map((scooter) => <Scooter key={scooter.registration_code} scooter={scooter} deleteScooter={deleteScooter} edit={edit}/>)}
        </>
    );
}
