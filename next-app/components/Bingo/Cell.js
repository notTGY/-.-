import Input from '@mui/material/Input'
import styles from './Cell.module.css'


export default function Cell(props) {
  const { selected, setSelected, ...rest } = props

  function handleKeyup(e) {
    const { code } = e
    if (code === 'Space') {
      tryToToggle()
    }
  }

  function tryToToggle() {
    if (props.disabled) setSelected()
  }

  return (
    <div
      className={
        styles.cell + (selected ? ' ' + styles.selected : '')
      }
      onKeyUp={handleKeyup}
      onClick={tryToToggle}
      tabIndex={props.disabled ? 0 : -1}
    >
      <Input
        inputProps={{ className: styles.input }}
        fullWidth
        multiline
        disableUnderline
        {...rest}
      />
    </div>
  )
}
