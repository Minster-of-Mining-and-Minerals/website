import React from "react";
import { Button } from "../ui/button";

const CardSection = () => {
    return (
        <section className="w-full flex justify-center md:px-4 mb-20">
            <div
                className="relative w-full max-w-7xl md:rounded-3xl  overflow-hidden shadow-xl"
            >
                {/* Background Image */}
                <img
                    src="/home-5.jpg"
                    alt="Factory"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 p-8 lg:p-14 text-white">

                    {/* Left Text */}
                    <div className="">
                        <h2 className="text-lg lg:text-3xl font-bold text-golden-classic mb-4 leading-snug">
                            One of the Best Performing Economies in Ethiopia
                        </h2>

                        <p className="text-sm max-w-2xl lg:text-base text-gray-200 leading-relaxed">
                            Ethiopia has seen astonishing growth in the last ten years.
                            Growing at an average rate of{" "}
                            <span className="font-semibold">9.7%</span> between 2009 and 2019,
                            Ethiopia has consistently been one of Africa’s top performing
                            economies.
                        </p>
                    </div>

                    {/* Right Buttons */}
                    <div className="flex gap-4">
                        <Button className="bg-golden-dark hover:bg-golden-darkHover px-9 py-2">
                            Learn More
                        </Button>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default CardSection;