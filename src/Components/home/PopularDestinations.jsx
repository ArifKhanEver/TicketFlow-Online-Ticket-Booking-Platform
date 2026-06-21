'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PopularDestinations = () => {
    const destinations = [
        { name: "Cox's Bazar", route: "Dhaka to Cox's Bazar", price: "$35", img: "https://images.unsplash.com/photo-1620023617392-411a7a0058b7?q=80&w=800&auto=format&fit=crop" },
        { name: "Sylhet", route: "Dhaka to Sylhet", price: "$25", img: "https://images.unsplash.com/photo-1608928628236-41189bf71f82?q=80&w=800&auto=format&fit=crop" },
        { name: "Barishal", route: "Dhaka to Barishal", price: "$20", img: "https://images.unsplash.com/photo-1662969966113-176b6d51cd55?q=80&w=800&auto=format&fit=crop" },
        { name: "Sajek Valley", route: "Chattogram to Sajek", price: "$40", img: "https://images.unsplash.com/photo-1610996160805-4f7fdbb148d8?q=80&w=800&auto=format&fit=crop" },
        { name: "Bandarban", route: "Dhaka to Bandarban", price: "$30", img: "https://images.unsplash.com/photo-1681284545564-96695dc96726?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#111113]">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Popular <span className="text-[#F05A28]">Destinations</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Explore the most frequently booked routes across the country.</p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="pb-16"
                >
                    {destinations.map((dest, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="group relative h-96 rounded-[32px] overflow-hidden cursor-pointer">
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${dest.img})` }}
                                />
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-[#F05A28] font-black text-xs uppercase tracking-widest mb-1">{dest.route}</p>
                                    <h3 className="text-3xl font-extrabold text-white mb-2">{dest.name}</h3>
                                    <p className="text-zinc-300 text-sm">Starts from <span className="text-[#039855] font-bold text-lg">{dest.price}</span></p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularDestinations;