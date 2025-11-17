import React, { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from '../types';

interface HeroSliderProps {
    slides: HeroSlide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (slides.length > 1) {
            const slideInterval = setInterval(nextSlide, 5000); // Auto-cycle every 5 seconds
            return () => clearInterval(slideInterval);
        }
    }, [slides.length, nextSlide]);
    
    if (!slides || slides.length === 0) {
        return null; // Don't render anything if there are no slides
    }

    const currentSlide = slides[currentIndex];

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg group">
            {/* Background Image */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <img
                        key={slide.id}
                        src={slide.imageUrl}
                        alt={slide.title}
                        className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            
            {/* Content */}
            <div key={currentSlide.id} className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-2 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                    {currentSlide.title}
                </h2>
                <p className="text-md md:text-lg mb-4 max-w-lg animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                    {currentSlide.subtitle}
                </p>
                <div className="animate-fade-in-slow" style={{ animationDelay: '0.5s' }}>
                    <a
                        href={currentSlide.ctaLink}
                        onClick={(e) => { if (currentSlide.ctaLink === '#') e.preventDefault(); }}
                        className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand-green-dark transition-colors inline-block"
                    >
                        {currentSlide.ctaText}
                    </a>
                </div>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
            )}

            {/* Pagination Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSlider;
