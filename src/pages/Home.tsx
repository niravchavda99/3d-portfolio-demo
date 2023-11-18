import {Canvas} from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import {Loader} from "../components/Loader.tsx";
import {Island} from "../models/Island.tsx";
import {Sky} from "../models/Sky.tsx";
import {Bird} from "../models/Bird.tsx";
import {Plane} from "../models/Plane.tsx";
import {HomeInfo} from "../components/HomeInfo.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import sakura from '../assets/sakura.mp3';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import soundOn from '../assets/icons/soundon.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import soundOff from '../assets/icons/soundoff.png';

export function Home() {
    const audioRef = useRef(new Audio(sakura));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [currentStage, setCurrentStage] = useState<number>(1);

    useEffect(() => {
        if (isPlayingMusic) {
            audioRef.current.play();
        }

        return () => {
            audioRef.current.pause();
        };
    }, [isPlayingMusic]);

    const adjustIslandForScreenSize = () => {
        const isSmallScreen = window.innerWidth < 768;
        const scale = isSmallScreen ? [0.9, 0.9, 0.9] : [1, 1, 1];
        const position = [0, -6.5, -43];
        const defaultRotation = [0.1, 4.7, 0];
        return [scale, position, defaultRotation];
    }

    const adjustPlaneForScreenSize = () => {
        const isSmallScreen = window.innerWidth < 768;
        const scale = isSmallScreen ? [1.5, 1.5, 1.5] : [3, 3, 3];
        const position = isSmallScreen ? [0, -1.5, 0] : [0, -4, -4];
        const defaultRotation = [0, 20, 0];
        return [scale, position, defaultRotation];
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition, placeRotation] = adjustPlaneForScreenSize();

    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage}/>}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                    camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader/>}>
                    <directionalLight position={[1, 1, 1]} intensity={2}/>
                    <ambientLight intensity={0.5}/>
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-expect-error*/}
                    <hemisphereLight skyColor={"#B1E1FF"} groundColor={"#000000"} intensity={1}/>

                    <Bird/>
                    <Sky isRotating={isRotating}/>
                    <Island
                        scale={islandScale}
                        position={islandPosition}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}/>
                    <Plane
                        scale={planeScale}
                        position={planePosition}
                        rotation={placeRotation}
                        isRotating={isRotating}/>
                </Suspense>
            </Canvas>
            <div className='absolute bottom-2 left-2'>
                <img
                    src={isPlayingMusic ? soundOn : soundOff}
                    alt="Sound Icon"
                    className='w-10 h-10 cursor-pointer object-contain'
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                />
            </div>
        </section>
    );
}