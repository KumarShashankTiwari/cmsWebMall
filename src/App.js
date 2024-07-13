import React from 'react';
import Router from '../src/app/router';
// import { ToastContainer } from 'react-toastify/dist/react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toggle/style.css';
import 'react-dropdown/style.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
const App = () => {
  return (
    <div className='App'>
      <Router />
      <ToastContainer newestOnTop={true} />
    </div>
  );
};

export default App;
