import yoga from './../assets/yoga.png';
import axios from 'axios';
import { Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../utility/themes';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect } from 'react';
import { backend } from '../utility/backendUrl';
import { useNavigate } from 'react-router-dom';
import { mediumTextStyle, packageDetailsButtonStyle, packageDetailsDivStyle, paraTextStyle } from '../styles/styles';

export function ProductsPage(){
    return (
        <div className="flex-row" style={{width:"96%", padding:"2%"}}>
            <div className="flex-column" style={{width:"50%", margin:"2%"}}>
                            <h1 style={mediumTextStyle}>Yoga for Mind</h1>
                            <img style={{borderRadius:"8px", width:"100%", margin:"4% 0px"}} src={yoga}></img>
                            <h1 style={mediumTextStyle}>What is Yoga for Mind?</h1>
                            <p style={{...paraTextStyle, fontSize:"18px"}}>The Yoga for Mind sessions involve minimal 
                            physical movement and relies on techniques such as pranayama and meditation. 
                            Suited for women who cannot perform more physical forms of yoga and are looking for relief 
                            from concerns such as stress, anxiety, low mood etc.</p>
            </div>
            <div className="flex-column" style={{width:"50%", margin:"2%"}}>
                <h1 style={mediumTextStyle}>Choose your package</h1>
                <PackageList/>
                <h1 style={mediumTextStyle}>What you'll get</h1>
                <div className="flex-row" style={{alignItems:"flex-start", margin:"2% 0%"}}>
                    <WhatsAppIcon sx={{color:"#1d8686"}} />
                    <p style={{...paraTextStyle, margin:"0px 10px"}}>
                        A chat group on the Elda app where you can connect with your trainer and the rest of the Elda Yoga community
                    </p>
                </div>
                <div className="flex-row" style={{alignItems:"flex-start", margin:"2% 0%"}}>
                    <AccessTimeIcon sx={{color:"#1d8686"}}/>
                    <p style={{...paraTextStyle, margin:"0px 10px"}}>
                        Ability to reschedule your class if you miss your session
                    </p>
                </div>
            </div>
        </div>
    );
}


function PackageList(){

    const [packages, SetPackages] = useState([]);

    useEffect(function() {
        axios.get(`${backend}packages`,{withCredentials:"true", headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
            SetPackages(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });
    },[]);

    return(
        <div style={{width:"80%", margin:"2% 0%"}}>
            {
                packages.map((pkg,index) => {
                    return <PackageDetails pkg={pkg} key={index} />
                })
            }
        </div>
    );
}

function PackageDetails({pkg}){

    const navigate = useNavigate();

    function handleClickForBuyNow(){
        navigate(`/product/${pkg.id}`);
    }

    return (
        <div style={{borderRadius:"5px", margin:"2% 0", border:"1px solid #bac2c6", backgroundColor:"white", padding:"2%", width:"100%", display:"flex",
            alignItems:"center", flexDirection:"column"}}>
            <div style={packageDetailsDivStyle}>
                <h1 style={{display:"block", fontFamily:"sans-serif", fontSize:"21px", fontWeight:"normal"}}> {pkg.duration} Months</h1>
                <h4 style={{display:"block", fontFamily:"sans-serif", fontSize:"12px", color:"#b0b0b0", fontWeight:"bolder"}}>
                    {Math.floor(pkg.sellingPrice/pkg.duration)}/month
                </h4>
            </div>
            <div style={packageDetailsDivStyle}>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <h1 style={{fontFamily:"sans-serif", fontSize:"19px", fontWeight:"normal", textDecoration:"line-through",
                        marginRight:"10px", color:"#b0b0b0"}}>
                        &#x20B9;{pkg.price}
                    </h1>
                    <h1 style={{fontFamily:"sans-serif", fontSize:"21px", fontWeight:"normal", color:"#1d8686"}}>
                        &#x20B9;{pkg.sellingPrice}
                    </h1>
                </div>
                <ThemeProvider theme={darkTheme}>
                    <Button sx={packageDetailsButtonStyle} size="small" variant="contained" onClick={handleClickForBuyNow}>Buy now</Button>
                </ThemeProvider>
            </div>
        </div>
    );
}