import {Canvas} from "@react-three/fiber";
import {Suspense, useState} from "react";
import {Loader} from "../components/Loader.tsx";
import {Island} from "../models/Island.tsx";
import {Sky} from "../models/Sky.tsx";
import {Bird} from "../models/Bird.tsx";
import {Plane} from "../models/Plane.tsx";

export function Home() {
    const [isRotating, setIsRotating] = useState<boolean>(false);
    const [currentStage, setCurrentStage] = useState<number>(1);

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
                    <Sky isRotating={isRotating} />
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
        </section>
    );
}