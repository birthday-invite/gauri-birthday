import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import happyBirthdayAudio from '../assets/happy_birthday.mp3';

// Sparkle Component
const Sparkle = ({ x, y }: { x: number; y: number }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], rotate: [0, 180] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none text-yellow-300 z-50 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
            style={{
                left: x,
                top: y,
                fontSize: `${Math.random() * 20 + 20}px`
            }}
        >
            ✨
        </motion.div>
    );
};

const HeroSection: React.FC = () => {
    const [isAltText, setIsAltText] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number }[]>([]);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;

        // Flip text after 1 second
        const textTimer = setTimeout(() => {
            setIsAltText(true);
            // Play audio
            const audio = new Audio(happyBirthdayAudio);
            audio.play().catch(error => console.log("Audio play failed:", error));
        }, 1000);

        // Scroll down after text flip (2.5 seconds total delay)
        const scrollTimer = setTimeout(() => {
            handleScrollDown(5000); // 5 seconds duration (very slow)
        }, 2500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(scrollTimer);
        };
    }, [hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
    };

    const handleScrollDown = (customDuration?: number) => {
        const target = document.getElementById('info-section');
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = typeof customDuration === 'number' ? customDuration : 1500;
            let start: number | null = null;

            function step(timestamp: number) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);

                // Easing function (easeInOutCubic)
                const ease = percentage < 0.5
                    ? 4 * percentage * percentage * percentage
                    : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * ease);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }
    };

    const handleTextClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Add sparkles around the click position
        const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + i,
            x: e.clientX + (Math.random() - 0.5) * 300,
            y: e.clientY + (Math.random() - 0.5) * 300
        }));

        setSparkles(prev => [...prev, ...newSparkles]);

        // Clear sparkles after animation
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 1000);

        // Increment click count
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // Toggle text always
        setIsAltText(!isAltText);

        // On 2nd click
        if (newCount >= 2) {
            handleScrollDown();
            setClickCount(0);
        }
    };

    return (
        <section
            onClick={hasStarted ? () => handleScrollDown() : undefined}
            className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-4 pt-10 pb-0 overflow-hidden cursor-pointer"
        >
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

            {/* Sparkles Container */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <AnimatePresence>
                    {sparkles.map(sparkle => (
                        <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full h-full justify-center pb-20 gap-8">


            </div>
        </section>
    );
};

export default HeroSection;
