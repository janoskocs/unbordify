import React from 'react'
import { useEffect, useState } from 'react'


const Form = () => {
    const [activity, setActivity] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const controller = new AbortController()
    const signal = controller.signal

    const fetchIdea = (category) => {
        let url = ''

        if (category === 'random' || category === undefined) {
            url = 'http://www.boredapi.com/api/activity/'
        } else {
            url = 'http://www.boredapi.com/api/activity' + '?type=' + category
        }
        fetch(url, {
            method: 'get',
            signal: signal
        }).then(function (response) {
            if (response.status === 200) {
                setIsLoading(false)
                return response.json()
            } else {
                setError(true)
                controller.abort()
                setIsLoading(false)
                return false
            }
        }).then(function (data) {
            setActivity(data)
        })
    }

    useEffect(() => {
        fetchIdea()
    }, [])

    return (
        <div id="activity">
            <h3>Consider doing the following</h3>
            {!isLoading ? <h2>{activity.activity}</h2> : <h2>Loading...</h2>}
            {error && <h3>Something went wrong, please try again later.</h3>}
            <div id="categories">
                <p>Select a category you prefer.</p>
                <button value='education' onClick={(e) => fetchIdea(e.target.value)}>Education</button>
                <button value='recreational' onClick={(e) => fetchIdea(e.target.value)}>Recreational</button>
                <button value='social' onClick={(e) => fetchIdea(e.target.value)}>Social</button>
                <button value='diy' onClick={(e) => fetchIdea(e.target.value)}>DIY</button>
                <button value='charity' onClick={(e) => fetchIdea(e.target.value)}>Charity</button>
                <button value='cooking' onClick={(e) => fetchIdea(e.target.value)}>Cooking</button>
                <button value='relaxation' onClick={(e) => fetchIdea(e.target.value)}>Relaxation</button>
                <button value='music' onClick={(e) => fetchIdea(e.target.value)}>Music</button>
                <button value='busywork' onClick={(e) => fetchIdea(e.target.value)}>Busywork</button>
            </div>
            <button value="random" onClick={(e) => fetchIdea(e.target.value)}>Mmmm, give me something to do!</button>
        </div>
    )
}

export default Form