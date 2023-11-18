import {useGLTF} from "@react-three/drei";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import skyScene from '../assets/3d/sky.glb';
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

interface SkyProps {
    isRotating: boolean;
}

export const Sky = ({isRotating}: SkyProps) => {
    const ref = useRef();
    const sky = useGLTF(skyScene);

    useFrame((_, delta) => {
        if (isRotating) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref.current.rotation.y += 0.15 * delta;
        }
    });

    return (
        <mesh ref={ref}>
            <primitive object={sky.scene}/>
        </mesh>
    );
};