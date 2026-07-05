import React, {useState, useCallback} from 'react'
import Node from './Node'

const FileExplorer = ({data}) => {
  // states
  const [expanded, setExpanded] = useState(() => new Set())

  // toggle
  const toggle = useCallback((id) => {
    setExpanded(prev => {
        const next = new Set(prev)
        if(next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }
        return next
    })
  }, [])

  return (
    <div style={{ textAlign: 'left'}}>
        {data?.map(node => (
            <Node 
            key={node.id}
            toggle={toggle}
            expanded={expanded}
            level={0}
            node={node}
            />
        ))}
    </div>
  )
}

export default FileExplorer