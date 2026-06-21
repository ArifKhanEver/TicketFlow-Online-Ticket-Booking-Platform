'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import logo from '@/assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-zinc-50 dark:bg-[#0A0A0C] border-t border-zinc-200 dark:border-zinc-900 pt-20 pb-10">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <Image src={logo} alt="Logo" width={140} height={40} className="dark:invert" />
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Your ultimate ticket booking platform. Experience safe, secure, and instant travel arrangements across the country.
                        </p>
                        <div className="flex gap-4">
                            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-[#039855] hover:border-[#039855] transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-zinc-900 dark:text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            {['About Us', 'All Tickets', 'Destinations', 'Become a Vendor'].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-[#039855] dark:hover:text-[#039855] text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-zinc-900 dark:text-white font-bold mb-6 tracking-wider uppercase text-sm">Support</h4>
                        <ul className="flex flex-col gap-3">
                            {['Help Center', 'Cancellation Policy', 'Terms of Service', 'Privacy Policy'].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-[#039855] dark:hover:text-[#039855] text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-zinc-900 dark:text-white font-bold mb-6 tracking-wider uppercase text-sm">Newsletter</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Subscribe to get special offers and travel updates.</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full h-12 px-4 rounded-xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm outline-none focus:border-[#039855] transition-colors"
                            />
                            <button className="h-12 px-6 bg-[#039855] hover:bg-[#028046] text-white font-bold rounded-xl transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={40} height={20} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={20} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;