import { Box } from '@chakra-ui/react';
import React from 'react'

interface timeProps{
  days: number,
  hours:number,
  minutes:number,
  seconds:number,
  message:string
}

export const TimerContainer = ({days, hours, minutes ,seconds ,message }: timeProps) => {

  let sDays: string = "";
  let sHours: string = "";
  let sMinutes: string = "";
  let sSeconds: string = "";


 if(seconds == 0){
   if( minutes !=0){
    seconds=59;
   }
 }
 if (minutes == 0 ){
    if( hours !=0){
      minutes=59;
    }
 }

  sDays = days < 10 ? "0"+days.toString() : days.toString();
  sHours = hours < 10 ? "0"+hours.toString() : hours.toString();
  sMinutes = minutes < 10 ? "0"+minutes.toString() : minutes.toString();
  sSeconds = seconds < 10 ? "0"+seconds.toString() : seconds.toString();
  
    return (
      <Box mt={"2rem"} mb={"2rem"}>
      {!message ? (
        <div className="payoutDiv">
            <h2 className="margin-bottom: 0px">NFT Payout in</h2>
          <div className="grid">
                <h2>{sDays } D</h2>
                <h2>{sHours} H</h2>
                <h2>{sMinutes } M</h2>
                <h2>{sSeconds } S</h2>
          </div>
        </div>
      ) : (
        <div className="payoutDiv">
          <h2 className="margin-bottom: 0px">NFT Payout</h2>
          <h2 className="margin-bottom: 0px">{message}</h2>
          <h2 className="margin-bottom: 0px">Payments Soon...</h2>
        </div>
      )
    }
    </Box>
  )
}