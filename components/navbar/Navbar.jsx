'use client';

import { useState, useEffect } from 'react';
import Button from '../Button';
import './navbar.css';
import Link from 'next/link';

const NAV_LINKS = [
    { label: 'Library', href: '/library' },
    { label: 'Critique', href: '/critique' },
    { label: 'Challenges', href: '/challenges' },
    { label: 'Community', href: '/community' },
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
                <Link href="/" className='logo' style={{ display: "flex", alignItems: "center", gap: "3px", zIndex: 10 }}>
                        <img src="/images/logo8.svg" as="image" width={40} height={40} />
                        <span className='link'>crit.</span>
                </Link>

                {/* links */}
                <div className='links'>
                    {NAV_LINKS.map(link => (
                        <Link key={link.href} href={link.href} className='link'>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* actions */}
                <div className='actions'>
                    <Link href='/login'>
                        <Button height={60} width={120} className='glass'>
                            log in
                        </Button>
                    </Link>
                    <Link href='/signup'>
                        <Button height={60} width={120} className='glass'>
                            get started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
