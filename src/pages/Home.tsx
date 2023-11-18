import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Loader} from "../components/Loader.tsx";
import {Island} from "../models/Island.tsx";
import {Sky} from "../models/Sky.tsx";

export function Home() {
    const adjustIslandForScreenSize = () => {
        const screenScale = getScreenScale();
        const screenPosition = [0, -6.5, -43];
        const defaultRotation = [0.1, 4.7, 0];
        return [screenScale, screenPosition, defaultRotation];
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

    return (
        <section className='w-full h-screen relative'>
            <Canvas className='w-full h-screen bg-transparent'
                    camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader/>}>
                    <directionalLight position={[1, 1, 1]} intensity={2}/>
                    <ambientLight intensity={0.5}/>
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-expect-error*/}
                    <hemisphereLight skyColor={"#B1E1FF"} groundColor={"#00000"} intensity={1}/>

                    <Sky/>
                    <Island scale={islandScale} position={islandPosition} rotation={islandRotation}/>
                </Suspense>
            </Canvas>
        </section>
    );
}

const getScreenScale = () => {
    if (window.innerWidth < 768) {
        return [0.9, 0.9, 0.9];
    }
    return [1, 1, 1];
}