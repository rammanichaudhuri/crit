'use client';

import { useState, useEffect } from 'react';
import Button from '../Button';
import './navbar.css';

const NAV_LINKS = [
    { label: 'Library',    href: '/library' },
    { label: 'Critique',   href: '/critique' },
    { label: 'Challenges', href: '/challenges' },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className='nav'>
            <div className='inner'>
                {/* logo */}
                <a href="/" className='logo' style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <img src="/images/logo8.svg" width={40} height={40} />
                    crit.
                </a>

                {/* links */}
                <div className='links'>
                    {NAV_LINKS.map(link => (
                        <a key={link.href} href={link.href} className='link'>
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* actions */}
                <div className='actions'>
                    <Button href="/login" height={60} width={120} className='glass'>
                        log in
                    </Button>
                    <Button href="/signup" height={60} width={120} className='glass'>
                        get started
                    </Button>
                </div>
            </div>
        </nav>
    );
};
