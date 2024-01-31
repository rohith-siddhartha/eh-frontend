import { Button, Dialog, OutlinedInput, Checkbox, ThemeProvider } from "@mui/material";
import { darkTheme } from "../utility/themes";
import { useState } from "react";
import flower from './../assets/flower.png';
import axios from "axios";
import { backend } from "../utility/backendUrl";


export function Navbar() {

    const [open, setOpen] = useState(false);

    function handleOpen(){
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
    }

    return (
        <div style={{height:"50px", padding:"0px 40px", display:"flex", flexDirection:"row", backgroundColor:"#1d8686", alignItems:"center", justifyContent:"space-between"}}>
            <h1 style={{fontFamily:"sans-serif", fontSize:"21px", fontWeight:"normal"}} >Eldo Health</h1>
            <ThemeProvider theme={darkTheme}>
                <Button size="small" variant="contained" onClick={handleOpen}>Log In</Button>
            </ThemeProvider>
            <Login open={open} handleClose={handleClose} />
        </div>
    );
}

function Login({open, handleClose}) {

    const [userId, setUserId] = useState("");
    const [isCheckBoxTicked, setIsCheckBoxTicked] = useState(false);
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [otp, setOtp] = useState("");

    function handleUserIdInput(userId){
        setUserId(userId);
    }


    

    function isSubmitDisabled(){
        return userId.length === 0 || isCheckBoxTicked===false;
    }

    function requestOtp() {

        axios.post(`${backend}loginrequest`,{userId:userId,idType:"EMAIL"},{ withCredentials: true })
        .then((response) => {
            setIsOtpRequested(true);
        })
        .catch((error) => {
            console.error('Error Here', error);
        });
    }

    function handleCheckBoxInput(isCheckBoxTicked){
        setIsCheckBoxTicked(isCheckBoxTicked);
    }

    function login() {

        axios.post(`${backend}login`,{userId:userId,otp:otp},{ withCredentials: true })
        .then((response) => {
            setIsCheckBoxTicked(false);
            setUserId("");
            setIsOtpRequested(false);
            setOtp("");
            handleClose();
        })
        .catch((error) => {
            console.error('Error Here', error);
        });
    }

    function handleOtpInput(otp){
        setOtp(otp);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <div style={{width:"400px", height:"260px", backgroundColor:"#fffaf5", backgroundImage:`url(${flower})`, backgroundRepeat:"no-repeat", backgroundPositionX:"0%", backgroundPositionY:"0%", backgroundSize:"100px auto",
             paddingTop:"80px", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h1 style={{fontFamily:"sans-serif", fontSize:"24px", fontWeight:"bold", color:"#516371"}}>Log In to your account</h1>
                { !isOtpRequested &&
                <>
                <ThemeProvider theme={darkTheme}>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        placeholder="Enter Email"
                        sx={{margin:"20px 0px", fontSize:"12px", height:"40px"}}
                        onChange={(e) => handleUserIdInput(e.target.value)}
                        value={userId}
                    />
                </ThemeProvider>
                
                <div style={{display:"flex", flexDirection:"row", margin:"0px 20px"}}>
                    <ThemeProvider theme={darkTheme}>
                        <Checkbox onChange={(e) => handleCheckBoxInput(e.target.checked)}/>
                    </ThemeProvider>
                    
                    <h3 style={{fontFamily:"sans-serif", fontSize:"12px", fontWeight:"normal", color:"#516371"}}>I agree with the <a>Terms and Conditions</a> and <a>Privacy Policy</a> of Elda Health</h3>
                </div>
                <ThemeProvider theme={darkTheme}>
                    <Button variant="contained" size="small" onClick={requestOtp} disabled={isSubmitDisabled()}>Submit</Button>
                </ThemeProvider>
                </> }
                { isOtpRequested &&
                <>
                <ThemeProvider theme={darkTheme}>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        placeholder="Enter OTP"
                        sx={{margin:"20px 0px", fontSize:"12px", height:"40px"}}
                        onChange={(e) => handleOtpInput(e.target.value)}
                        value={otp}
                    />
                </ThemeProvider>

                <div style={{display:"flex", flexDirection:"row", margin:"0px 20px"}}>
                    <h3 style={{fontFamily:"sans-serif", fontSize:"12px", fontWeight:"normal", color:"#516371"}}>Enter the otp sent to your email</h3>
                </div>

                <ThemeProvider theme={darkTheme}>
                    <Button variant="contained" size="small" onClick={login}>Log In</Button>
                </ThemeProvider>
                </> }
            </div>
        </Dialog>
    );
}