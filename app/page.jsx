'use client'

import './page.css';
import Aurora from '../components/Aurora.jsx';
import Button from '../components/Button';
import PixelTrail from '../components/PixelTrail';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from "@/components/navbar/Navbar";
import Wave from 'react-wavify';
import { useScroll, motion, useTransform } from 'framer-motion';

export default function Home() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  useEffect(() => {

  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <main>
      <Nav backgroundColor="transparent" />
      <div ref={container} style={{ height: 'calc(200vh - 74px)', position: 'relative' }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "100vh", width: "100dvw" }}>
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
        <motion.div className="container sticky top-[74px] min-w-screen border-none relative" style={{ scale: scale }} >
          <Aurora
            colorTop="#304c89"
            colorWave="#648de5"
            speed={1.4}
            amplitude={0.5}
            blend={0}
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
            <div style={{ position: "relative", zIndex: 3 }}>
              <Link href="/signup">
                <Button>
                  <span style={{ fontSize: "24px" }}>Get started!</span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        <div className='second-container'>
          <Wave
            fill="#ffc4e5"
            paused={false}
            style={{ display: 'flex', position: "absolute", top: "0", left: 0, height: "100%", width: "100dvw" }}
            options={{
              height: 30,
              amplitude: 70,
              speed: 0.18,
              points: 4
            }}
          />
        </div>
      </div>
    </main>
  );
}






