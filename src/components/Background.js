import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  background-color: #111;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const CELL_SIZE = 100
const MAX_ATTACHMENTS = 10

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
function resizeCanvas(canvas) {
//   const { width, height } = canvas.getBoundingClientRect();
// //   canvas.width = window.innerWidth;
// // canvas.height = window.innerHeight;
  
//   if (canvas.width !== width || canvas.height !== height) {
  console.log("resizeCanvas")
  const { devicePixelRatio: ratio = 1 } = window;
  const ctx = canvas.getContext('2d')
  console.log(window.innerHeight, window.innerWidth)
  canvas.width = window.innerWidth * ratio
  canvas.height = window.innerHeight * ratio
  canvas.style.width = window.innerWidth + "px"
  canvas.style.height = window.innerHeight + "px"
  ctx.scale(ratio, ratio)
    // return true
  // }

  // return false
}

function getCell(mx, my) {
  const x = Math.floor(mx / CELL_SIZE)
  const y = Math.floor(my / CELL_SIZE)
  return [x,y];
}
function compareCell(xy1, xy2) {
  return xy1[0] === xy2[0] && xy1[1] === xy2[1]
}

let visited = [];
let previousCell = []

export const Background = () => {
  const canvasRef = React.useRef(null)
  const [x, sx] = React.useState(false)
  const [grid, setGrid] = React.useState([])

  console.log(canvasRef.current)
  const canvas = canvasRef.current;

  React.useEffect(() => {
    const wx = window.innerWidth;
    const wy = window.innerHeight;
    const cols = Math.ceil(wx / CELL_SIZE)
    const rows = Math.ceil(wy / CELL_SIZE)
    console.log({ cols, rows })
    const grid = new Array(cols).fill(0).map(() => {
      return new Array(Math.ceil(rows)).fill(0);
    })
    console.log({ grid })
    setGrid(grid);
  }, [])

  React.useEffect(() => {
    if (canvas) resizeCanvas(canvas)
  }, [canvas])

  const draw = React.useCallback((e) => {
    if (canvas) {
      const ctx = canvas.getContext("2d")

      const wx = window.innerWidth;
      const wy = window.innerHeight;
      const mx = e.clientX;
      const my = e.clientY;

      if (mx > wx || my > wy) return

      ctx.clearRect(0,0,canvas.width, canvas.height);
      grid.forEach((_,col) => {
        _.forEach((_,row) => {
          ctx.fillStyle = "#DDD"
          const x = col * CELL_SIZE
          const y = row * CELL_SIZE
          // console.log({ x, y })
          // ctx.fillRect(x - 1, y, 5, 5);

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#444';
          ctx.fill();
        })
      })
      
      const cell = getCell(mx, my)
      if (!compareCell(cell, previousCell)) {
        visited.push(cell);
        if (visited.length > MAX_ATTACHMENTS) {
          visited = visited.slice(-MAX_ATTACHMENTS);
          console.log(JSON.stringify(visited))
        }
      }
      previousCell = cell

      visited.map((xy, index) => {
        const topLeftCorner = [xy[0] * CELL_SIZE, xy[1] * CELL_SIZE]
        const topRightCorner = [topLeftCorner[0] + CELL_SIZE, topLeftCorner[1]]
        const bottomLeftCorner = [topLeftCorner[0], topLeftCorner[1] + CELL_SIZE]
        const bottomRightCorner = [topLeftCorner[0] + CELL_SIZE, topLeftCorner[1] + CELL_SIZE]
        
        ;[topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner].forEach(corner => {        
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255,255,255,${index / MAX_ATTACHMENTS})`
          ctx.lineWidth = 1
          ctx.moveTo(corner[0],corner[1]);
          ctx.lineTo(mx, my);
          ctx.stroke();
        })
      })

      

    }
  }, [canvas, grid])

  const leave = React.useCallback(() => {
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0,0,canvas.width, canvas.height);
      visited = [];
    }
  }, [canvas])

  React.useEffect(() => {
    document.addEventListener("mousemove", draw);
    document.addEventListener("mouseleave", leave)
    // return () => document.removeEventListener("mousemove", draw)
  }, [draw, leave])

  React.useEffect(() => {
    sx(true)
  }, [])

  return <Canvas ref={canvasRef} />
}

