import React from "react";
import styled from "styled-components";

const USE_FOUR_CORNERS = false

const Canvas = styled.canvas`
  position: fixed;
  background-color: #111;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overscroll-behaviour: contain;
`

const search = new URLSearchParams(window.location.search);
const maxAttachmentsQuery = Number(search.get("x"))

const MAX_ATTACHMENTS = maxAttachmentsQuery || 8

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

const integerize = USE_FOUR_CORNERS ? Math.floor : Math.round


function compareCell(xy1, xy2) {
  return xy1[0] === xy2[0] && xy1[1] === xy2[1]
}

let visited = [];
let previousCell = []

export const Background = () => {
  const canvasRef = React.useRef(null)
  const [x, sx] = React.useState(false)
  const [grid, setGrid] = React.useState([])
  const [offset, setOffset] = React.useState([0,0])
  const [CELL_SIZE, setCellSize] = React.useState(80)

  console.log(canvasRef.current)
  const canvas = canvasRef.current;

  function getCell(mx, my) {
    const x = integerize((mx + offset[0]) / CELL_SIZE) 
    const y = integerize((my + offset[1]) / CELL_SIZE) 
    return [x,y];
  }

  React.useEffect(() => {
    const wx = window.innerWidth;
    const wy = window.innerHeight;
    const CELL_SIZE = wx > 600 ? 80 : 64
    setCellSize(CELL_SIZE)
    const cols = Math.ceil(wx / CELL_SIZE)
    const rows = Math.ceil(wy / CELL_SIZE)
    const grid = new Array(cols).fill(0).map(() => {
      return new Array(Math.ceil(rows)).fill(0);
    })
    setGrid(grid);
    const calcOffset = (dim) => (dim % CELL_SIZE) * 0.5
    const offset = [calcOffset(wx), calcOffset(wy)]
    setOffset(offset);
  }, [])

  

  const drawGrid = React.useCallback(() => {
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0,0,canvas.width, canvas.height);
      grid.forEach((_,col) => {
        _.forEach((_,row) => {
          ctx.fillStyle = "#DDD"
          const x = col * CELL_SIZE + offset[0]
          const y = row * CELL_SIZE + offset[1]
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#444';
          ctx.fill();
        })
      })
    }
  }, [canvas, grid])

  React.useEffect(() => {
    if (canvas) {
      resizeCanvas(canvas)
      drawGrid()
    }
  }, [canvas])

  const draw = React.useCallback((evt) => {
    console.log("DRAW")
    if (canvas) {
      const ctx = canvas.getContext("2d");

      drawGrid();

      const wx = window.innerWidth;
      const wy = window.innerHeight;
      const mx = evt.changedTouches?.length ? evt.changedTouches[0].clientX : evt.clientX;
      const my = evt.changedTouches?.length ? evt.changedTouches[0].clientY : evt.clientY;

      if (mx > wx || my > wy) return
      
      const cell = getCell(mx, my)
      if (!compareCell(cell, previousCell)) {
        visited.push(cell);
        if (visited.length > MAX_ATTACHMENTS) {
          visited = visited.slice(-MAX_ATTACHMENTS);
        }
      }
      previousCell = cell

      visited.map((xy, index) => {
        const topLeftCorner = [xy[0] * CELL_SIZE + offset[0], xy[1] * CELL_SIZE + offset[1]]
        const topRightCorner = [topLeftCorner[0] + CELL_SIZE, topLeftCorner[1]]
        const bottomLeftCorner = [topLeftCorner[0], topLeftCorner[1] + CELL_SIZE]
        const bottomRightCorner = [topLeftCorner[0] + CELL_SIZE, topLeftCorner[1] + CELL_SIZE]

        // const corners = [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner];
        // const corners = [topLeftCorner];
        const corners = USE_FOUR_CORNERS ? [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner] : [topLeftCorner]

        const opacity = 1 - ((visited.length - index) / MAX_ATTACHMENTS)
        
        corners.forEach(corner => {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255,255,255,${opacity})`
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
      drawGrid();
      visited = [];
    }
  }, [canvas])

  React.useEffect(() => {
    document.addEventListener("mousemove", draw);
    document.addEventListener("touchmove", draw)
    document.addEventListener("mouseleave", leave)
    // return () => document.removeEventListener("mousemove", draw)
  }, [draw, leave])

  React.useEffect(() => {
    sx(true)
  }, [])

  return <Canvas ref={canvasRef} />
}

