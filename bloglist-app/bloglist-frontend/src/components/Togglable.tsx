import React, { useState, useImperativeHandle } from 'react'

interface ToggleProps extends React.PropsWithChildren {
  buttonLabel: string
}
export interface VisibilityHandle {
  toggleVisibility: () => void | null
}
const Togglable = React.forwardRef<VisibilityHandle, ToggleProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      }
    })

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </>
    )
  }
)
Togglable.displayName = 'Togglable'

export default Togglable
