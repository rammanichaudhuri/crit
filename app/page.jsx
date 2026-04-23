import './page.css';
import Aurora from '../components/Aurora.jsx';
import Noise from '../components/Noise';
import Nav from '../components/navbar/Navbar.jsx';
import Button from '../components/Button';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="container">
        {/* <Noise
          patternSize={250}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={20}
        /> */}
        <Aurora
          colorTop="#304c89"
          colorWave="#648de5"
          speed={1.8}
          amplitude={0.9}
          blend={0}
        />
        <div className="glass-container">
          
          <Button>
            <span style={{ fontSize: "24px" }}>Get started!</span>
          </Button>
          <span style={{ fontSize: "18px", fontFamily: "Mansalva", color: "#EDE9E6", textAlign: "center" }}>
            {/* The fastest way to level up is to 
            <br /> */}
            pick art, or upload what you want. 
            <br /> jot down your thoughts and ideas, assisted with ai. 
            <br />get sharper, and curate your library, track your progress.
            <br />
          </span>
        </div>
      </div>
    </>
  );
}






