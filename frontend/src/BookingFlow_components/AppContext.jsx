import React from 'react';
import Confirm from './components_ShowTime/Confirm';
import Showtime from './components_ShowTime/Showtime';
import { BookingProvider } from './Context';

function AppContext() {
  return (
    <BookingProvider>
        <Showtime/>
        
    </BookingProvider>
  );
}

export default AppContext;