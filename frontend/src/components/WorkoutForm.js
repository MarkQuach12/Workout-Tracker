import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')
    const [invalidFields, setInvalidFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps, notes}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setInvalidFields(json.invalidFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setNotes('')
            setError(null)
            setInvalidFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Exercise Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={invalidFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg)</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={invalidFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={invalidFields.includes('reps') ? 'error' : ''}
            />

            <label>Notes</label>
            <input
                type="text"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
            />

            <button>Add workout</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default WorkoutForm