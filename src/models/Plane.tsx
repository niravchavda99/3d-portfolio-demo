// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import placeScene from '../assets/3d/plane.glb';
import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef} from "react";

interface PlaneProps {
    scale: number[];
    position: number[];
    rotation: number[];
    isRotating: boolean;
}

export const Plane = ({isRotating, ...props}: PlaneProps) => {
    const ref = useRef();
    const {scene, animations} = useGLTF(placeScene);
    const {actions} = useAnimations(animations, ref);

    useEffect(() => {
        if(isRotating) {
            actions['Take 001'].play();
        } else {
            actions['Take 001'].stop();
        }
    }, [actions, isRotating]);

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <mesh {...props} ref={ref}>
            <primitive object={scene} />
        </mesh>
    );
}