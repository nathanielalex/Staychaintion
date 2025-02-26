"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

export default function Scene() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb")

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={group} dispose={null} position={[0, -1, 0]} scale={2}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Duck.geometry}
        material={materials.default}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#4285F4" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  )
}

