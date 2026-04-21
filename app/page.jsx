import './page.css';
import Aurora from '../components/Aurora.jsx';

export default function Home() {
  return (
    <>
      <div className="container">
        <Aurora
          colorTop="#7DAACB"
          colorWave="#E8DBB3"
          speed={1.8}
          amplitude={0.8}
          blend={0}
        />
        <button>Start</button>
      </div>
    </>
  );
}
