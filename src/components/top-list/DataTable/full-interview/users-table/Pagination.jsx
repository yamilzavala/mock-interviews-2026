import React from 'react'

const Pagination = ({page, totalPages, onChange}) => {
  return (
    <div>
        <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        >
            Prev
        </button>

            {page} of {totalPages}

        <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        >
            Next
        </button>
    </div>
  )
}

export default React.memo(Pagination)