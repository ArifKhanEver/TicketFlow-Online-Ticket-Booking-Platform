'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const PopularDestinations = () => {
    // বর্তমান অ্যাকটিভ স্লাইড ট্র্যাক করার স্টেট
    const [activeIndex, setActiveIndex] = useState(0);

    const destinations = [
        { 
            name: "Cox's Bazar", 
            tagline: "The Longest Sea Beach",
            desc: "Experience the mesmerizing sunset and miles of golden sands at the world's longest unbroken sea beach.",
            route: "Dhaka to Cox's Bazar", 
            price: "$35", 
            img: "https://images.unsplash.com/photo-1585501296541-c2af5630245f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        },
        { 
            name: "Sylhet", 
            tagline: "The Land of Tea Leaves",
            desc: "Immerse yourself in the lush green tea gardens, beautiful waterfalls, and rich cultural heritage.",
            route: "Dhaka to Sylhet", 
            price: "$25", 
            img: "https://images.unsplash.com/photo-1634962546038-b7eddb268dd7?q=80&w=852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        },
        { 
            name: "Sajek Valley", 
            tagline: "Above the Clouds",
            desc: "Wake up to the breathtaking view of rolling hills covered in a thick blanket of morning clouds.",
            route: "Chattogram to Sajek", 
            price: "$40", 
            img: "https://images.unsplash.com/photo-1658383895221-173f07c6a9d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        },
    ];

    // টেক্সট অ্যানিমেশনের ভেরিয়েন্ট (নিচ থেকে স্লাইড করে আসবে)
    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <section className="py-24 bg-white dark:bg-[#111113]">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                        Popular <span className="text-[#F05A28]">Destinations</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Explore our most breathtaking travel routes.</p>
                </div>

                {/* Main Image Slider Wrapper */}
                <div className="relative w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-2xl">
                    
                    <Swiper
                        modules={[Autoplay, EffectFade, Navigation]}
                        effect="fade" // Fade ট্রানজিশন অ্যাপ্লাই করা হলো
                        speed={1000}
                        slidesPerView={1}
                        allowTouchMove={false} // ইউজার সোয়াইপ বন্ধ (শুধুমাত্র অটো বা বাটন দিয়ে চেঞ্জ হবে)
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="w-full h-full absolute inset-0"
                    >
                        {destinations.map((dest, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="w-full h-full relative">
                                    {/* Full Width Background Image */}
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${dest.img})` }}
                                    />
                                    {/* Gradient Overlay (ডান দিকে গাঢ় যাতে টেক্সট পড়া যায়) */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Dynamic Floating Text Content (Right side, Left-aligned) */}
                    {/* z-10 দেওয়া হয়েছে যাতে ইমেজের উপরে থাকে এবং pointer-events-none যাতে ক্লিকে বাধা না দেয় */}
                    <div className="absolute inset-0 z-10 flex items-center justify-start p-8 md:p-16 pointer-events-none">
                        
                        {/* ডান পাশে নির্দিষ্ট উইডথ নিয়ে টেক্সট ব্লক */}
                        <div className="w-full max-w-lg pointer-events-auto text-left">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex} // কী চেঞ্জ হলে অ্যানিমেশন রি-ট্রিগার হবে
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={textVariants}
                                    className="bg-black/20 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl"
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#039855]/80 text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                                        <FiMapPin /> {destinations[activeIndex].route}
                                    </div>
                                    
                                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                                        {destinations[activeIndex].name}
                                    </h3>
                                    
                                    <h4 className="text-[#F05A28] font-bold text-lg mb-4">
                                        {destinations[activeIndex].tagline}
                                    </h4>
                                    
                                    <p className="text-zinc-200 text-sm leading-relaxed mb-8">
                                        {destinations[activeIndex].desc}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">Starting from</p>
                                            <p className="text-3xl font-black text-[#039855]">
                                                {destinations[activeIndex].price}
                                            </p>
                                        </div>
                                        
                                        <button className="h-12 px-6 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all flex items-center gap-2 group">
                                            Book Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Custom Slider Navigation (Optional UI detail) */}
                    <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                        {destinations.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === idx ? "w-8 bg-[#039855]" : "w-2 bg-white/30"}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;