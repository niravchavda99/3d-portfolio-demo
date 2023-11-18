import {useGLTF} from "@react-three/drei";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import skyScene from '../assets/3d/sky.glb';

export const Sky = () => {
    const sky = useGLTF(skyScene);

    return (
        <mesh>
            <primitive object={sky.scene}/>
        </mesh>
    );
};