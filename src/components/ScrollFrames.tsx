import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 200;

const getFramePath = (index: number) => {
    const numStr = index.toString().padStart(3, '0');
    // Prefix image paths with the base URL configured in Vite
    return `${import.meta.env.BASE_URL}frames_1/ezgif-frame-${numStr}.jpg`;
};

const ScrollFrames: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const render = (frameIndex: number) => {
            const img = images[frameIndex];
            if (!img) return;

            // Draw image covering the whole canvas (object-cover style)
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image aspect ratio, fit width
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                // Canvas is taller than image aspect ratio, fit height
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            handleScroll();
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const html = document.documentElement;
                    const scrollTop = html.scrollTop || document.body.scrollTop;
                    const maxScrollTop = html.scrollHeight - window.innerHeight;
                    
                    let scrollFraction = scrollTop / maxScrollTop;
                    if (isNaN(scrollFraction)) scrollFraction = 0;
                    scrollFraction = Math.max(0, Math.min(1, scrollFraction));

                    const frameIndex = Math.floor(scrollFraction * (FRAME_COUNT - 1));
                    render(frameIndex);
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial setup
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        handleResize(); // Will also trigger render(0)
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loaded, images]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-sky-100">
            <canvas ref={canvasRef} className="w-full h-full" />
            
            {/* Loading Indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-party-blue font-party text-3xl z-10 backdrop-blur-sm bg-white/50">
                    Loading Fun...
                </div>
            )}
        </div>
    );
};

export default ScrollFrames;
