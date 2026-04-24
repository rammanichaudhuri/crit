'use client'

import './page.css';
import Aurora from '../components/Aurora.jsx';
import Button from '../components/Button';
import PixelTrail from '../components/PixelTrail';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
    router.refresh();
  }, [router]);

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, height: "100dvh", width: "100dvw" }}>
        <PixelTrail
          gridSize={100}
          trailSize={0.08}
          maxAge={1500}
          interpolate={4}
          color="#ffffff"
          gooeyFilter={{ id: "custom-goo-filter", strength: 10 }}
          gooeyEnabled
          gooStrength={20}
        />
      </div>
      <div className="container">
        <Aurora
          colorTop="#304c89"
          colorWave="#648de5"
          speed={1.8}
          amplitude={0.9}
          blend={0}
          key={router.asPath}
        />
        <div className="glass-container">

          <span style={{ fontSize: "70px", color: "#ddb772", WebkitTextStroke: "2px black", margin: 0, padding: 0, lineHeight: 1 }}>crit.</span>
          <span style={{ fontSize: "24px", fontFamily: "Mansalva", color: "#EDE9E6", textAlign: "center", marginBottom: "6px" }}>
            {/* The fastest way to level up is to
            <br /> */}
            pick art, or upload what you want.
            jot down your thoughts and ideas, assisted with ai.
            <br />get sharper, curate your library, track your progress.
            <br />
          </span>
          <div style={{ position: "relative", zIndex: 100 }}>
            <Link href="/signup">
              <Button>
                <span style={{ fontSize: "24px" }}>Get started!</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}






