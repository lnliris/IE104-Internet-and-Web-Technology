import React, { useState } from 'react';
import MovieCard from './MoviesCard';
import ScheduleList from './ScheduleList';
import TimeBar from './TimeBar';
import Confirm from './Confirm';
import CinemaSelector from './CinemaSelector';
import ggmap from '../assets/img/ggmap.jpg'
function Showtime() {
  return (
    <>
    <div style={{marginBottom:'100px'}}> {/* Style cả trang showtime*/}

    <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
      <MovieCard></MovieCard>
    </div>

    <div style={{display: 'flex', flexDirection:'row'}}>
      <div id='NhanhBentrai' style={{display: 'flex', flex: '3', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', 
        padding:'10px',marginLeft:'20px', boxSizing:'border-box' }} >
      <TimeBar></TimeBar>
      <ScheduleList></ScheduleList>
      </div>
      <div id='NhanhBenPhai' style={{display: 'flex', flex:'2', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
        <div style={{display:'flex'}}> <CinemaSelector></CinemaSelector> </div>
        <div style={{display:'flex', margin:'20px',marginBottom:'1px' ,border:'20px solid rgba(255,255,255,0.2)'}}>
          <img src={ggmap} alt='GG-MAP'/>
        </div>
        <div style={{display:'flex'}}>
          <Confirm></Confirm>
        </div>
      </div>
    </div>
    
    </div>
    </>
  );
}

export default Showtime;
