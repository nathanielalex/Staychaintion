"use client"

import { useEffect, useRef } from "react"

export default function GradientWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawWave = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)") // blue-500 with 10% opacity
      gradient.addColorStop(0.5, "rgba(37, 99, 235, 0.1)") // blue-600 with 10% opacity
      gradient.addColorStop(1, "rgba(29, 78, 216, 0.1)") // blue-700 with 10% opacity

      ctx.fillStyle = gradient

      ctx.beginPath()

      const waveHeight = 50
      const frequency = 0.01
      const speed = 0.005

      for (let x = 0; x <= canvas.width; x += 1) {
        const y = Math.sin(x * frequency + time * speed) * waveHeight + canvas.height / 2
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      animationFrameId = requestAnimationFrame(drawWave)
    }

    drawWave(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

