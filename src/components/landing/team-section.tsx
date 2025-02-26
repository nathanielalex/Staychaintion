"use client"

import React from "react"

import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type * as THREE from "three"

export default function TeamSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm">
              <span className="text-blue-600 font-medium">Meet Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              The Brilliant Minds Behind <span className="text-blue-600">Staychaintion</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-lg">
              Our team of experts combines deep AI knowledge with research expertise to revolutionize how you work with
              academic papers.
            </p>
            <div className="pt-4">
              <a href="/team">
                <Button className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 h-auto text-lg">
                  Meet the Team
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Scene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2.5}
              />
              <Environment preset="studio" />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Scene() {
  return (
    <group>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Main floating sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4285F4" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Orbiting smaller spheres */}
      <OrbitingSpheres count={5} radius={2} />

      {/* Decorative rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#4285F4" opacity={0.2} transparent />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#4285F4" opacity={0.1} transparent />
      </mesh>
    </group>
  )
}

function OrbitingSpheres({ count, radius }: { count: number; radius: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <OrbitingSphere key={i} index={i} radius={radius} speed={0.5 + i * 0.1} offset={(Math.PI * 2 * i) / count} />
      ))}
    </>
  )
}

function OrbitingSphere({
  index,
  radius,
  speed,
  offset,
}: {
  index: number
  radius: number
  speed: number
  offset: number
}) {
  const mesh = React.useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      const angle = state.clock.elapsedTime * speed + offset
      mesh.current.position.x = Math.cos(angle) * radius
      mesh.current.position.z = Math.sin(angle) * radius
      mesh.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5
    }
  })

  return (
    <mesh ref={mesh} scale={0.2}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#4285F4" roughness={0.3} metalness={0.7} />
    </mesh>
  )
}

