const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// CREATE new workout
const createWorkout = async (req, res) => {
    const {title, load, reps, notes} = req.body

    let invalidFields = []
    if (!title) {
        invalidFields.push('title')
    }

    if (!load) {
        invalidFields.push('load')
    }

    if (!reps) {
        invalidFields.push('reps')
    }

    if (invalidFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', invalidFields})
    }

    // If negative load/reps are inputted

    if (reps < 0 && load < 0) {
        invalidFields.push('load')
        invalidFields.push('reps')
    } else if (reps < 0) {
        invalidFields.push('reps')
    } else if (load < 0) {
        invalidFields.push('load')
    }

    if (invalidFields.length > 0) {
        return res.status(400).json({error: 'Please enter valid load and reps', invalidFields})
    }

    // If title only contains numbers

    let isNum = /^-?\d*\.?\d+$/.test(title);
    let isAlphaNumeric = /^[a-zA-Z0-9\s]+$/.test(title);

    if (isNum || !isAlphaNumeric) {
        invalidFields.push('title')
        return res.status(400).json({error: 'Please enter a valid workout', invalidFields})
    }



    try {
        const workout = await Workout.create({title, load, reps, notes})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}