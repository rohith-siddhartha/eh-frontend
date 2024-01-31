import { useParams } from "react-router-dom";
import yoga from './../assets/yoga.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { backend } from "../utility/backendUrl";
import { getDateInTextFormat, getDates, getDayInTextFormat } from "../utility/dateUtil";
import { darkTheme } from "../utility/themes";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { mediumTextStyle } from "../styles/styles";

export function PackagePage(){

    const {packageId} = useParams();

    return (
        <div className="page" style={{backgroundColor:"#fffaf5", display:"flex", flexDirection:"column", width:"96%", padding:"2%"}}>
            <h1 style={{fontFamily:"sans-serif", fontSize:"21px", fontWeight:"normal", color:"#516371"}}>Yoga for Mind</h1>
            <img style={{borderRadius:"8px", objectFit:"cover", width:"100%", height:"200px", margin:"10px 0px"}} src={yoga}></img>
            <h1 style={{fontFamily:"sans-serif", fontSize:"21px", fontWeight:"normal", color:"#516371"}}>What is Yoga for Mind?</h1>
            <p style={{color:"#b0b0b0", fontFamily:"sans-serif", fontSize:"16px", fontWeight:"100"}}>The Yoga for Mind sessions involve
            minimal physical movement and relies on techniques such as pranayama and meditation.
            Suited for women who cannot perform more physical forms of yoga and are looking for relief from
            concerns such as stress, anxiety, low mood etc.</p>
            <PackagePurchaseDetails packageId={packageId} />
        </div>
    );
}

export function PackagePurchaseDetails({packageId}){

    const [packageItem, setPackageItem] = useState(null);

    useEffect(function() {
        axios.get(`${backend}package/${packageId}`,{withCredentials:"true", headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
            setPackageItem(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });
    },[packageId]);

    return (
        <div className="flex-column full-width" style={{backgroundColor:"#fffaf5", margin:"20px 0px"}}>
            <div className="flex-column" style={{display:"flex", flexDirection:"column"}}>
                <div className="flex-row center" style={{justifyContent:"space-between"}}>
                    <h1 style={mediumTextStyle}>Yoga for Mind</h1>
                    { packageItem && <h1 style={{fontFamily:"sans-serif", marginLeft:"auto", fontSize:"19px", fontWeight:"normal", color:"#1d8686"}}>
                        &#x20B9;{packageItem.sellingPrice}</h1>}
                </div>
                <div className="flex-row center" style={{justifyContent:"space-between"}}>
                    <p style={{color:"#b0b0b0", fontFamily:"sans-serif", fontSize:"16px", fontWeight:"100"}}>5 days a week Change plan</p>
                    { packageItem && <h1 style={{fontFamily:"sans-serif", marginLeft:"auto", fontSize:"19px", fontWeight:"normal",
                    textDecoration:"line-through", color:"#b0b0b0"}}>&#x20B9;{packageItem.price}</h1>}
                </div>
                <SelectStartDateComponent />
                <SelectTimeSlotComponent />
                <ThemeProvider theme={darkTheme}>
                <Button sx={{flexGrow:"0", fontFamily:"sans-serif", fontSize:"12px", fontWeight:"400", margin:"10px auto 10px 5%", borderRadius:"20px"}}
                    size="small" variant="contained">Buy Package
                </Button>
                </ThemeProvider>
            </div>
        </div>
    );
}

function SelectStartDateComponent() {

    const dates = getDates(new Date());
    const [selectedDate, setSelectedDate] = useState(0);
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft -= 50;
        }
      };
    
      const scrollRight = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft += 50;
        }
      };

    return (
        <div style={{display:"flex", margin:"10px 0px", flexDirection:"column", justifyContent:"space-between"}}>
            <div style={{display:"flex", margin:"5px 0px", flexDirection:"column", justifyContent:"space-between"}}>
                <h1 style={{fontFamily:"sans-serif", fontSize:"16px", fontWeight:"normal", color:"#516371"}}>Pick a start date</h1>
                <p style={{color:"#b0b0b0", fontFamily:"sans-serif", fontSize:"15px", fontWeight:"100"}}>Dates are vailable for next two weeks</p>
            </div>
            <div style={{display:"flex", margin:"10px 0px", flexDirection:"row", alignItems:"center"}}>
                <div style={{cursor:"pointer"}} onClick={scrollLeft}>
                    <KeyboardArrowLeftIcon sx={{color:"#fa7878"}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}} ref={scrollContainerRef} className="scroll-container">
                    {dates.map((date, index) => {
                        return <SelectDateButton date={date} isSelected={selectedDate==index} key={index}
                                index={index} setSelectedDate={setSelectedDate} />
                    })}
                </div>
                <div style={{cursor:"pointer"}} onClick={scrollRight}>
                    <KeyboardArrowRightIcon sx={{color:"#fa7878"}} />
                </div>
            </div>
        </div>
    );
}

function SelectDateButton({date, isSelected, index, setSelectedDate}) {

    const bgColor = isSelected?"#1d8686":"white";
    const textColor = isSelected?"white":"#516371";

    function handleSelectDate(){
        setSelectedDate(index);
    }

    return (
        <div className="flex-column center" onClick={handleSelectDate} style={{cursor:"pointer", borderRadius:"10px", backgroundColor:bgColor,
            padding:"5px 20px", margin:"0px 10px 0px 0px", border:"1px solid #516371"}}>
            <h4 style={{fontFamily:"sans-serif", fontSize:"9px", fontWeight:"normal", color:textColor, margin:"2px 0px"}}>
                {getDateInTextFormat(date)} </h4>
            <h4 style={{fontFamily:"sans-serif", fontSize:"9px", fontWeight:"normal", color:textColor, margin:"2px 0px"}}>
                {getDayInTextFormat(date)} </h4>
        </div>
    );
}



function SelectTimeSlotComponent() {

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(-1);

    useEffect(function() {
        axios.get(`${backend}timeslots`,{withCredentials:"true", headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
            setTimeSlots(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });
    },[]);

    return (
        <div className="flex-column" style={{margin:"10px 0px",justifyContent:"space-between"}}>
            <h1 style={{fontFamily:"sans-serif", margin:"10px 0px", fontSize:"16px", fontWeight:"normal", color:"#516371"}}>Select time slot</h1>
            {timeSlots.map((timeSlot,index) => {
                return <SlotDetails timeSlot={timeSlot} key={index} index={index} isSelected={selectedSlot===index} setSelectedSlot={setSelectedSlot} />
            })}
        </div>
    );
}

function SlotDetails({timeSlot, index, isSelected, setSelectedSlot}) {

    const bulletBgColor = isSelected?"#1d8686":"#fffaf5";

    function handleSelectSlot(){
        setSelectedSlot(index);
    }

    return (
        <div className="flex-row full-width center" style={{width:"100%", margin:"5px 0px", display:"flex", flexDirection:"row", alignItems:"center"}}>
            <span style={{backgroundColor:bulletBgColor}} className="dot" onClick={handleSelectSlot} ></span>
            <div className="flex-column full-width" style={{borderRadius:"10px", backgroundColor:"white", padding:"5px 5px", margin:"0px 10px 0px 0px", border:"1px solid #516371"}}>
                <div className="flex-row center" style={{ borderRadius:"10px", backgroundColor:"white"}}>
                    <WatchLaterIcon sx={{fontSize:"15px", margin:"0px", padding:"0px", color:"#516371"}} />
                    <h4 style={{fontFamily:"sans-serif", fontSize:"13px", fontWeight:"normal", color:"#516371", margin:"2px 5px"}}>
                        {timeSlot.startTime} {" - "} {timeSlot.endTime}
                    </h4>
                </div>
                <h4 style={{fontFamily:"sans-serif", fontSize:"10px", fontWeight:"normal", color:"#516371", margin:"2px 0px"}}>
                    MON, TUE, WED, THU, FRI
                </h4>
            </div>
        </div>
    );
}
