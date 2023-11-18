// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import birdScene from '../assets/3d/bird.glb';
import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";

export const Bird = () => {
    const ref = useRef();
    const {scene, animations} = useGLTF(birdScene);
    const {actions} = useAnimations(animations, ref);

    useEffect(() => {
        actions['Take 001'].play();
    }, []);

    useFrame(({clock, camera}) => {
        const currentRef: any = ref.current;
        currentRef.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

        if (currentRef.position.x > camera.position.x + 10) {
            currentRef.rotation.y = Math.PI;
        } else if (currentRef.position.x < camera.position.x - 10) {
            currentRef.rotation.y = 0;
        }

        if (currentRef.rotation.y === 0) {
            currentRef.position.x += 0.01;
            currentRef.position.z -= 0.01;
        } else {
            currentRef.position.x -= 0.01;
            currentRef.position.z += 0.01;
        }
    });

    return (
        <mesh ref={ref} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
            <primitive object={scene}/>
        </mesh>
    );
}