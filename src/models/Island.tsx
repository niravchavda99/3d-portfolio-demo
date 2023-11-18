import {useEffect, useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {a} from '@react-spring/three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import islandScene from '../assets/3d/island.glb';
import {useFrame, useThree} from "@react-three/fiber";

interface IslandProps {
    scale: number[];
    position: number[];
    rotation: number[];
    isRotating: boolean;
    setIsRotating: CallableFunction;
    setCurrentStage: CallableFunction;
}

type ModelInteractionEvent = MouseEvent | TouchEvent;

const defaultMouseEventHandler = (e: ModelInteractionEvent) => {
    e.stopPropagation();
    e.preventDefault();
}

export const Island = ({isRotating, setIsRotating, setCurrentStage, ...props}: IslandProps) => {
    const islandRef = useRef();

    const {gl, viewport} = useThree();
    const {nodes, materials} = useGLTF(islandScene);
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    const moveIsland = (offset: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        islandRef.current.rotation.y += offset;
    }

    const handlePointerDown = (e: ModelInteractionEvent) => {
        defaultMouseEventHandler(e);
        setIsRotating(true);
        const clientX: number = (e instanceof TouchEvent) ? e.touches[0].clientX : e.clientX;
        lastX.current = clientX;
    }

    const handlePointerUp = (e: ModelInteractionEvent) => {
        defaultMouseEventHandler(e);
        setIsRotating(false);
    }

    const handlePointerMove = (e: ModelInteractionEvent) => {
        defaultMouseEventHandler(e);
        if (isRotating) {
            const clientX: number = (e instanceof TouchEvent) ? e.touches[0].clientX : e.clientX;
            const delta = (clientX - lastX.current) / viewport.width;
            const difference = delta * 0.01 * Math.PI;
            moveIsland(difference);
            lastX.current = clientX;
            rotationSpeed.current = difference;
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            if (!isRotating) {
                setIsRotating(true);
                moveIsland(0.01 * Math.PI);
            }
        } else if (e.key === 'ArrowRight') {
            setIsRotating(true);
            moveIsland(-(0.01 * Math.PI));
        }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setIsRotating(false);
        }
    }

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;
            if (Math.abs(rotationSpeed.current) <= 0.001) {
                rotationSpeed.current = 0;
            }
            moveIsland(rotationSpeed.current);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const rotation = islandRef.current.rotation.y;
            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
            }
        }
    });

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