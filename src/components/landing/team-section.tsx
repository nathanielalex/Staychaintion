"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
            className="flex justify-center items-center h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white"
          >
            <ThreeScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ThreeScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    sceneRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Main Sphere
    const mainSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        color: "#4285F4",
        roughness: 0.2,
        metalness: 0.8,
      })
    );
    scene.add(mainSphere);

    // Orbiting Small Spheres
    const orbitingSpheres: THREE.Mesh[] = [];
    const orbitRadius = 2;
    for (let i = 0; i < 5; i++) {
      const smallSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshStandardMaterial({
          color: "#4285F4",
          roughness: 0.3,
          metalness: 0.7,
        })
      );
      orbitingSpheres.push(smallSphere);
      scene.add(smallSphere);
    }

    // Animation Loop
    let frameId: number;
    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);

      // Rotate Main Sphere
      mainSphere.rotation.y += 0.005;

      // Move Orbiting Spheres
      orbitingSpheres.forEach((sphere, i) => {
        const angle = (time / 1000) * (0.5 + i * 0.1);
        sphere.position.x = Math.cos(angle) * orbitRadius;
        sphere.position.z = Math.sin(angle) * orbitRadius;
        sphere.position.y = Math.sin(time / 1000 + i) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle Resize
    const handleResize = () => {
      if (sceneRef.current) {
        const newWidth = sceneRef.current.clientWidth;
        const newHeight = sceneRef.current.clientHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={sceneRef} className="w-full h-full" />;
}
