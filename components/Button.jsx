'use client';
import { useRef, useEffect } from 'react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',  
  size = 'md',         
  onClick,
  href,
  style = {},
  className = '',
  height = 100,
  width = 240
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      btn.style.transform = `scale(1.07) translateY(-3px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    };

    const onLeave = () => { btn.style.transform = ''; };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);

    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={`btn glass`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {/* wavy liquid fill */}
      <span className="fillWrap">
        <svg
          className="fillSvg"
          viewBox="0 0 200 24"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,18 C25,6 50,22 75,12 C100,2 125,20 150,10 C170,2 185,16 200,10 L200,24 L0,24 Z" />
        </svg>
      </span>

      {/* label */}
      <span className="label">{children}</span>
    </Tag>
  );
}