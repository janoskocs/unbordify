import React from 'react'
import { useEffect, useState } from 'react'


const Form = () => {
    const [activity, setActivity] = useState('')

    const fetchIdea = () => {
        fetch('http://www.boredapi.com/api/activity/')
            .then(res => res.json())
            .then(data => setActivity(data))
        console.log(activity)
    }
    useEffect(() => {
        fetchIdea()
    }, [])

    return (
        <div id="activity">
            <h2>Consider doing the following</h2>
            <h3>{activity.activity}</h3>
            <button onClick={fetchIdea}>Mmmm, give me another idea!</button>
        </div>
    )
}

export default Form