const MostRecent = ({ reversed, setReversed }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        setReversed(!reversed)
    }

    return (
        <button className = 'mostRecent' onClick = {handleSubmit}>
            {reversed === true ? "Show Latest Workout" : "Show Oldest Workout"}
        </button>
    )
}

export default MostRecent