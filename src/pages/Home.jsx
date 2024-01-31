import img1 from './../assets/1.png';
import img2 from './../assets/2.png';
import img3 from './../assets/3.png';
import { Grid, ThemeProvider } from '@mui/material';
import {Button} from '@mui/material';
import { darkTheme } from './../utility/themes';
import { useNavigate } from 'react-router-dom';
import { greenMediumTextStyle, mediumTextStyle, paraTextStyle, planButtonStyle, planDescriptionTextStyle, planIconStyle, underLinedLinkStyle } from '../styles/styles';

export function HomePage(){

    return (
        <div className="flex-column" style={{width:"96%", padding:"2%"}}>
          <div className="flex-row full-width">
            <div style={{width:"50%", backgroundColor:"white"}}>
              <h1 style={mediumTextStyle}>Yoga for Mind</h1>
              <p style={paraTextStyle}>Watch Our Lead Yoga Therapist, Ms Uma Subramaniam explain <br></br> Yoga for Mind</p>
            </div>
            <div style={{width:"50%", backgroundColor:"white"}}>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/XuufDIFhlbo?si=aRrqsO7VlrWA-1kl"
                title="YouTube video player" frameBorder="0" style={{borderRadius:"5px"}}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <Plans />
        </div>
      )
}

function Plans() {
  return (
    <div className="flex-column full-width">
      <h1 style={greenMediumTextStyle}>Is this for you?</h1>
      <Grid container>
          <Grid item xs={3}>
            <TrialCard/>
          </Grid>
          <Grid item xs={1.5}>
          </Grid>
          <Grid item xs={3}>
            <ProductCard/>
          </Grid>
          <Grid item xs={1.5}>
          </Grid>
          <Grid item xs={3}>
            <QueryCard/>
          </Grid>
      </Grid>
    </div>
  );
}

function TrialCard(){
    return (
      <div>
        <img src={img1} style={planIconStyle}></img>
        <p style={planDescriptionTextStyle}> Hard to feel calm or sleep because to stress </p>
        <ThemeProvider theme={darkTheme}>
          <Button sx={{...planButtonStyle, margin:"40px 40px 40px auto"}} size="small" variant="outlined">Book trial @ 99</Button>
        </ThemeProvider>
      </div>
    );
  }
  
  function ProductCard(){

    const navigate = useNavigate();

    function navigateToProductPage(){
      navigate('/product');
    }

    return (
      <div>
        <img src={img2} style={planIconStyle}></img>
        <p style={planDescriptionTextStyle}> Hard to feel calm or sleep because to stress </p>
        <ThemeProvider theme={darkTheme}>
          <Button sx={ {margin:"40px auto", ...planButtonStyle}} size="small" variant="contained" onClick={navigateToProductPage}>I want to buy</Button>
        </ThemeProvider>
      </div>
    );
  }
  
  function QueryCard(){
    return (
      <div>
        <img src={img3} style={planIconStyle}></img>
        <p style={planDescriptionTextStyle}> Hard to feel calm or sleep because to stress </p>
        <h1 style={underLinedLinkStyle}>I have a question</h1>
      </div>
    );
  }