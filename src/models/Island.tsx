import {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {a} from '@react-spring/three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import islandScene from '../assets/3d/island.glb';

interface IslandProps {
    scale: number[];
    position: number[];
    rotation: number[];
};

export const Island = (props: IslandProps) => {
    const islandRef = useRef();

    const {nodes, materials} = useGLTF(islandScene);
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <a.group ref={islandRef} {...props}>
            <mesh
                geometry={nodes.polySurface944_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface945_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface946_tree2_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface947_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface948_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface949_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.pCube11_rocks1_0.geometry}
                material={materials.PaletteMaterial001}
            />
        </a.group>
    );
}