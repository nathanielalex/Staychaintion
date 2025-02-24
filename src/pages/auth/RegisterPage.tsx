import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  const particlesInit = useCallback(async (engine: any) => {
    console.log("Particles Engine Loaded");
    await loadSlim(engine);
  }, []);

  return (

    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-200 overflow-hidden">

      {/* Particle Background */}
      <div className="absolute inset-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: { enable: true, speed: 2, direction: "none", out_mode: "out" },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { quantity: 4 },
              },
            },
            detectRetina: true,
          }}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

        <SignUpForm />

    </div>
  );
}
