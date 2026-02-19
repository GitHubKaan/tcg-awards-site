import { ReactNode, useEffect, useRef, useState } from "react";
import Blub from "../assets/background/blue_blub.svg";
import Blub2 from "../assets/background/blue_blub_2.svg";
import "./background.component.css";

//Settings
const blobConcentration = 900; //Every x pixel blobs will spawn
const blobOpacity = 0.03; //0 to 1 (can be a double number)

const dotsConcentration = 450; //Every x pixel dots will spawn
const dotsSize = { min: 70, max: 170 }; //From x to y
const dotsYVariation = 100; //From -x to x (check "dotsConcentration" and "dotsSize" for overlap)
const dotsOpacity = 0.03; //0 to 1 (can be a double number)

//Do not edit
let finalSeed: number; //Automatic seed if no seed is set

/**
 * @param seed Randomizer seed
 * @param className Further class names
 * @param children Main site content
 * @param key Further keys
 * @return Background component
 */
function Background(
    props: Readonly<{
        seed?: number,

        className?: string,
        children?: ReactNode,
        [key: string]: any
    }>
) {
    const { seed, className, children, ...overflowProps } = props;

    const finalSeedRef = useRef(seed ?? randomNumber(10000, 99999));
    finalSeed = finalSeedRef.current;

    const randomBinary = randomNumber(0, 1, finalSeed);

    const [scrollHeight, setScrollHeight] = useState<number>(0);
    useEffect(() => {
        const updateHeight = () => {
            setScrollHeight(document.documentElement.scrollHeight);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    
    return <div className="background-component">
        <div className={`background-component-container ${className ?? ""}`} {...overflowProps}>
            {children} {/* Main site content */}

            {scrollHeight !== 0 && <> {/* Let main page render first to calculate total height */}
                <div className="background-component-elements no-select">
                    {/* Blubs */}
                    {[...Array(Math.ceil(document.documentElement.scrollHeight / blobConcentration))].map((_, i) => {
                        const rng = mulberry32(finalSeed);
                        const rotation = rng() * 360;
                        const useBlub2 = rng() > 0.5;

                        const positionRight = (randomBinary ? !(i % 2) : i % 2);

                        return (
                            <img
                                key={i}
                                alt="background-component-blub"
                                src={useBlub2 ? Blub2 : Blub}
                                style={{
                                    top: i * blobConcentration,
                                    opacity: blobOpacity,
                                    ...(positionRight ? {
                                        right: 0,
                                        transform: `translateX(200px) rotate(${rotation}deg)`,
                                    } : {
                                        left: 0,
                                        transform: `translateX(-200px) rotate(${rotation}deg)`,
                                    }),
                                }}
                            />
                        );
                    })}

                    {/* Dots */}
                    {[...Array(Math.ceil(document.documentElement.scrollHeight / dotsConcentration) - 1)].map((_, i) => {
                        const rng = mulberry32(finalSeed);
                        
                        const fullSize = dotsSize.min + rng() * (dotsSize.max - dotsSize.min);
                        const dotSize = fullSize / 9;
                        const yPos = rng() * 100;
                        const yVariation = (rng() * 2 - 1) * dotsYVariation;

                        return <div
                            className="background-component-dots"
                            key={i}
                            style={{
                                top: i * dotsConcentration + dotsConcentration,
                                width: fullSize,
                                height: fullSize,
                                left: `calc(${yPos}% - ${fullSize}px / 2)`,
                                transform: `translateY(${yVariation}px)`
                            }}
                        >
                            <div>
                                {[...Array(3)].map((v2, i2) =>
                                    <div key={i2}>
                                        {[...Array(3)].map((v3, i3) =>
                                            <div key={i3} style={{ width: dotSize, height: dotSize, opacity: dotsOpacity }} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>;
                    })}
                </div>
            </>}
        </div>
    </div>
}

export default Background;

/**
 * @param min From
 * @param max To
 * @param seed
 * @returns Random number
 */
function randomNumber(min: number, max: number, seed?: number) {
    if (seed) {
        const x = Math.sin(seed) * 10000;
        const normalized = x - Math.floor(x);
        return min + Math.floor(normalized * (max - min + 1));
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param seed 
 * @returns Mulberry32 "random" value using a seed
 */
function mulberry32(seed: number) {
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
