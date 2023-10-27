import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

async function bookUser(credentials) {
  return fetch('http://bff:3002/book', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
      .then(data => data.json())
}

const Book = () => {
  const [room, setRoom] = useState();
  const [date, setDate] = useState();
  const [time_s, setTime_s] = useState();
  const [time_e, setTime_e] = useState();
  const userTokenObj =  sessionStorage.getItem('token');
  const userToken = JSON.parse(userTokenObj);
  const employee_id = userToken?.token

  const handleSubmit = async e => {
      e.preventDefault();
      const token = await bookUser({
          employee_id,
          room,
          date,
          time_s,
          time_e
      });
      console.log(room)
      console.log(date)
      console.log(time_s)
      console.log(time_e)

  }

    return [
      <div className="book-box">
      <form onSubmit={handleSubmit}>
      <div class="field-box">
        <select name='room' id='room' onChange={e => setRoom(e.target.value)}>
        <option value="--"></option>
        <option value="Frontend Developers">Frontend Developers</option>
        <option value="Backend Developers">Backend Developers</option>
        <option value="Systems Engineers">Systems Engineers</option>
        <option value="DevOps Engineers">DevOps Engineers</option>
        <option value="Sales">Sales</option>
          </select><br></br><br></br>
          <label>Room:</label>
          </div>
          <div class="field-box">
      <input type='date' name='date' id='date' onChange={e => setDate(e.target.value)}></input><br></br><br></br>
      <label for='date'>Date</label>
     </div>
     <div class="field-box">
      <input type='time' name='time_s' id='time_s' min="08:00:00" max="18:00:00" step="3600" onChange={e => setTime_s(e.target.value)}></input><br></br><br></br>
      <label for='time_s'>Starting time</label>
      </div>
      <div class="field-box">
      <input type='time' name='time_e' id='time_e' min="09:00" max="19:00"step='3600' onChange={e => setTime_e(e.target.value)}></input><br></br><br></br>
      <label for='time_e'>Ending time</label>
      </div>
       
                    <button type="submit">Submit </button>
                
      </form>
      
      </div>
    ];
  
};

export default Book;
