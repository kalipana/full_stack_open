const Filter = (props) => (
    <div>
        Filter shown with <input value={props.newSearch} onChange={props.handleSearchChange} />
    </div>
)

export default Filter