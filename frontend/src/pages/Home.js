import { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import Searchbar from '../components/Searchbar'
import MostRecent from '../components/MostRecent'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const [searchTerm, setSearchTerm] = useState('')
    const [reversed, setReversed] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    const filteredWorkouts = workouts ? workouts.filter(workout =>
        workout.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    ) : [];

    const displayedWorkouts = reversed ? filteredWorkouts.reverse() : filteredWorkouts;

    return (
        <div className="home">
            <div className="workouts">
                <div className = "searchbar-container">
                    <Searchbar setSearchTerm={setSearchTerm}/>
                    <MostRecent reversed = {reversed} setReversed = {setReversed} />
                </div>
                {filteredWorkouts && filteredWorkouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home