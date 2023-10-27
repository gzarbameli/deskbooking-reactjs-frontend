
import React from 'react';
import axios from 'axios';

export default class MyReservations extends React.Component {
  state = {
    reservations: []
  }


  componentDidMount() {
    const userTokenObj =  sessionStorage.getItem('token');
    const userToken = JSON.parse(userTokenObj);
    const employee_id = userToken?.token
    //fetch('http://bff:3002/myreservations', {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify({ employee_id: employee_id })
    //  })
    axios.post('http://bff:3002/myreservations', {
        employee_id: employee_id
      },{
        headers: {
          'Content-Type': 'application/json'
      }}) 
      .then(res => {
        var reservations = res.data;
        reservations = reservations.map(reservation => {reservation.date = reservation.date.substring(0,10); return reservation;})
        reservations = reservations.map(reservation => {reservation.starting_time = reservation.starting_time.slice(0,-3); return reservation;})
        reservations = reservations.map(reservation => {reservation.ending_time = reservation.ending_time.slice(0,-3); return reservation;})
        this.setState({ reservations });
      })
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
