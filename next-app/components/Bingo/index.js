import { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Cell from './Cell'

const N = 5

function copy(doubleArr) {
  const arr = []
  for (let i = 0; i < N; i++) {
    arr[i] = []
    for (let j = 0; j < N; j++) {
      arr[i][j] = doubleArr[i][j]
    }
  }
  return arr
}

export default function Bingo() {
  const arr = []
  for (let i = 0; i < N; i++) {
    arr[i] = []
    for (let j = 0; j < N; j++) {
      arr[i][j] = ''
    }
  }

  const [ mode, setMode ] = useState(true)
  const [ grid, setGrid ] = useState(arr)
  const [ selected, setSelected ] = useState(arr)

  function changeGridAtIJ(i, j) {
    return e => {
      const val = e.target.value
      const cpy = copy(grid)
      cpy[i][j] = val
      setGrid(cpy)
    }
  }

  function selectAtIJ(i, j) {
    return e => {
      const cpy = copy(selected)
      cpy[i][j] = !cpy[i][j]
      setSelected(cpy)
    }
  }

  return (
    <>
    <FormGroup>
    <center>
      <FormControlLabel
        control={
          <Switch
            checked={mode}
            onChange={e => setMode(e.target.checked)}
            inputProps={{'aria-label': 'controlled'}}
          />
        }
        label="edit"
      />
    </center>
    </FormGroup>


    <div>
      {
        grid && grid.map((row, i) => 
          <div key={i}>
            {
              row.map((item, j) =>
                <Cell
                  key={j}
                  value={item}
                  onChange={changeGridAtIJ(i, j)}
                  disabled={!mode}
                  selected={selected[i][j]}
                  setSelected={selectAtIJ(i, j)}
                />
              )
            }
          </div>
        )
      }
    </div>
    </>
  )
}

