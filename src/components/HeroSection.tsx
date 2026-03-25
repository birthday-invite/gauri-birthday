import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import happyBirthdayAudio from '../assets/happy_birthday.mp3';



const HeroSection: React.FC = () => {

    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;

        // Flip text after 1 second
        const textTimer = setTimeout(() => {

            // Play audio
            const audio = new Audio(happyBirthdayAudio);
            audio.play().catch(error => console.log("Audio play failed:", error));
        }, 1000);



        return () => {
            clearTimeout(textTimer);

        };
    }, [hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
    };





    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-4 pt-10 pb-0 overflow-hidden">
            {/* Overlay for Autoplay Policy */}
            <AnimatePresence>
                {!hasStarted && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleStart();
                        }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-3xl px-12 py-6 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6)] animate-pulse"
                        >
                            Tap to Open Invitation 🎁
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full h-full justify-center pb-20 gap-8">


            </div>
        </section>
    );
};

export default HeroSection;
