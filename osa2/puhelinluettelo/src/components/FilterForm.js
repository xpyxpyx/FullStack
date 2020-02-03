import React from 'react'

const FilterForm = (props) => {
    return (
        <form>
            <div>name: <input
                value={props.filterName}
                onChange={props.handleFilterChange} /></div>
            <div><button onClick={() => props.setShowAll(!(props.showAll))}>
                {props.showAll ? 'filter' : 'all'}</button></div>
        </form>
    )
}

export default FilterForm