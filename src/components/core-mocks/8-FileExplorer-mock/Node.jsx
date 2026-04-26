import React, {useMemo} from 'react'

const Node = ({node, toggle, expanded, level}) => {
  const isFolder = !!node.children;
  const isOpen = expanded.has(node.id)

  // sorting
    const sortedNodes = useMemo(() => {
        if(!node.children) return [];

        if (node.children) {
            const folders = []
            const files = []

            for (const child of node.children) {
                if (child.children) folders.push(child)
                else files.push(child)
            }

            folders.sort((a, b) => a.name.localeCompare(b.name))
            files.sort((a, b) => a.name.localeCompare(b.name))

            return [...folders, ...files]
        }
    }, [node.children])

    const onClickFolder = () => {
        if(isFolder) toggle(node.id)
    }


  return (
    <div style={{paddingLeft:`${level}rem`, marginTop: '5px'}}>
        {/* folder or file ui */}
        <div 
        onClick={onClickFolder}
        style={{cursor: isFolder ? 'pointer' : ''}}
        >
            {isFolder ? (isOpen ? '📁 [-]' : '📁 [+]') : '📄'} {node.name}
        </div>

        {/* recursive */}
        {isFolder && isOpen && (
            <div>
                {sortedNodes.map(child => (
                    <Node 
                    key={child.id}
                    toggle={toggle}
                    expanded={expanded}
                    level={level + 1}
                    node={child}
                    />
                ))}
            </div>
        )}
    </div>
  )
}

export default React.memo(Node)