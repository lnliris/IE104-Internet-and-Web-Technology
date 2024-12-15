import React, { useState } from 'react';
import MovieCard from './MoviesCard';
import ScheduleList from './ScheduleList';
import TimeBar from './TimeBar';
import Confirm from './Confirm';
import CinemaSelector from './CinemaSelector';
import ProgressBar from '../component_ProgressBar/ProgressBar';
function Showtime() {
  return (
    <>
    <div style={{marginBottom:'100px'}}> {/* Style cả trang showtime*/}

    <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
      <MovieCard></MovieCard>
      <ProgressBar Progress={0}></ProgressBar>
    </div>

    <div style={{display: 'flex', flexDirection:'row'}}>
      <div id='NhanhBentrai' style={{display: 'flex', flex: '3', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', 
        padding:'10px',marginLeft:'20px', boxSizing:'border-box' }} >
      <TimeBar></TimeBar>
      <ScheduleList></ScheduleList>
      </div>
      <div id='NhanhBenPhai' style={{display: 'flex', flex:'2', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
        <div style={{display:'flex'}}> <CinemaSelector></CinemaSelector> </div>
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
