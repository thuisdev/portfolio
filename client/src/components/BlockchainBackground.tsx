import { useEffect, useRef } from "react"

interface Cube {
  cx: number
  cy: number
  cz: number
  s: number
  purple: boolean
}

type Vec3 = [number, number, number]

const BlockchainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0
    let animId = 0
    let t = 0
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    // --- Resize ---
    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    // --- Math helpers ---
    const project = (x: number, y: number, z: number) => {
      const fov = Math.min(W, H) * 1.0
      const dist = 7
      const zz = z + dist
      if (zz <= 0) return null
      return {
        sx: (x / zz) * fov + W / 2,
        sy: (y / zz) * fov + H / 2,
      }
    }

    const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number): Vec3 => {
      const x1 = x * Math.cos(ry) + z * Math.sin(ry)
      const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
      const y1 = y * Math.cos(rx) - z1 * Math.sin(rx)
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx)
      return [x1, y1, z2]
    }

    // --- Build cube grid ---
    const gap = 2.9
    const CUBES: Cube[] = []
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -1; iy <= 1; iy++) {
        for (let iz = -1; iz <= 4; iz++) {
          CUBES.push({
            cx: ix * gap,
            cy: iy * gap,
            cz: iz * gap,
            s: 0.88 + Math.random() * 0.24,
            purple: Math.random() > 0.72,
          })
        }
      }
    }

    const FACES = [
      [0,1,2,3],[4,5,6,7],
      [0,1,5,4],[2,3,7,6],
      [0,3,7,4],[1,2,6,5],
    ]

    const getVerts = (s: number): Vec3[] => [
      [-s,-s, s],[s,-s, s],[s,s, s],[-s,s, s],
      [-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],
    ]

    // --- Draw a single cube ---
    const drawCube = (cube: Cube, rx: number, ry: number) => {
      const verts3d = getVerts(cube.s).map(([vx, vy, vz]) =>
        rotatePoint(vx + cube.cx, vy + cube.cy, vz + cube.cz, rx, ry)
      )

      const pts = verts3d.map(([x, y, z]) => project(x, y, z))
      if (pts.some(p => !p)) return

      const avgZ = verts3d.reduce((s, [,, z]) => s + z, 0) / 8
      if (avgZ < -1) return

      const avgSx = pts.reduce((s, p) => s + p!.sx, 0) / 8
      const avgSy = pts.reduce((s, p) => s + p!.sy, 0) / 8

      const depthFade = Math.max(0, Math.min(1, (avgZ + 5) / 9))
      const edgeFadeX = Math.min(1, Math.min(avgSx, W - avgSx) / (W * 0.16))
      const edgeFadeY = Math.min(1, Math.min(avgSy, H - avgSy) / (H * 0.16))
      const finalFade = depthFade * Math.max(0, Math.min(edgeFadeX, edgeFadeY))
      if (finalFade < 0.01) return

      const col = cube.purple ? "180,140,255" : "210,200,255"

      FACES.forEach(fi => {
        const fv = fi.map(i => pts[i]!)
        const f3 = fi.map(i => verts3d[i])
        const ax = f3[1][0] - f3[0][0], ay = f3[1][1] - f3[0][1]
        const bx = f3[2][0] - f3[0][0], by = f3[2][1] - f3[0][1]
        if (ax * by - ay * bx < 0) return

        ctx.beginPath()
        ctx.moveTo(fv[0].sx, fv[0].sy)
        for (let i = 1; i < fv.length; i++) ctx.lineTo(fv[i].sx, fv[i].sy)
        ctx.closePath()

        ctx.fillStyle = `rgba(${col},${0.015 * finalFade})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${col},${0.2 * finalFade})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      })
    }

    // --- Animation loop ---
    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.003

      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04

      // Very slow rotation + subtle mouse parallax
      const rx = -0.18 + Math.sin(t * 0.15) * 0.025 + mouse.y * 0.025
      const ry = 0.25 + Math.sin(t * 0.1) * 0.04 + t * 0.005 + mouse.x * 0.04

      // Sort back to front (painter's algorithm)
      const sorted = [...CUBES].sort((a, b) => {
        const [,, za] = rotatePoint(a.cx, a.cy, a.cz, rx, ry)
        const [,, zb] = rotatePoint(b.cx, b.cy, b.cz, rx, ry)
        return za - zb
      })

      sorted.forEach(c => drawCube(c, rx, ry))
      animId = requestAnimationFrame(animate)
    }

    // --- Mouse events ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = ((e.clientX - rect.left) / W - 0.5) * 2
      mouse.ty = ((e.clientY - rect.top) / H - 0.5) * 2
    }

    const handleMouseLeave = () => {
      mouse.tx = 0
      mouse.ty = 0
    }

    const parent = canvas.parentElement
    parent?.addEventListener("mousemove", handleMouseMove)
    parent?.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", resize)

    resize()
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      parent?.removeEventListener("mousemove", handleMouseMove)
      parent?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block"
    />
  )
}

export default BlockchainBackground