
import React from 'react';
import axios from 'axios';

export default class MyReservations extends React.Component {
  state = {
    reservations: []
  }


  async componentDidMount() {
    const userTokenObj =  sessionStorage.getItem('token');
    const userToken = JSON.parse(userTokenObj);
    const employee_id = userToken?.token

    fetch(`http://bff-desk-reservation-app.example.com/myreservations?employee_id=${employee_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()) // Parsa la risposta come JSON
      .then(data => {
        // Esegui la conversione dei dati e l'aggiornamento dello stato
        const reservations = data.map(reservation => ({
          ...reservation,
          date: reservation.date.substring(0, 10),
          starting_time: reservation.starting_time.slice(0, -3),
          ending_time: reservation.ending_time.slice(0, -3)
        }));
        this.setState({ reservations });
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
      });
  }

    render() {

    return [
      <div className="res-box">
        <table >
         <tbody>
         <tr>
          <th>Id Room</th>
          <th>Date</th>
          <th>Starting Time</th>
          <th>Ending Time</th>

  </tr>
         {this.state.reservations.map((item,i)=>
          <tr id={i}>
            <td style={{textAlign:'center'}}>{item.room_id}</td>
            <td style={{textAlign:'center'}}>{item.date}</td>
            <td style={{textAlign:'center'}}>{item.starting_time}</td>
            <td style={{textAlign:'center'}}>{item.ending_time}</td>
          </tr>
         )}
         </tbody>
        </table>
       </div>
    ]
  }
}
