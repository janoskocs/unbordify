import React from 'react'
import { useEffect, useState } from 'react'


const Form = () => {
    const [activity, setActivity] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('')


    const controller = new AbortController()
    const signal = controller.signal
    const url = 'http://www.boredapi.com/api/activity/'

    const fetchIdea = () => {
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
        }).then(data => setActivity(data))
    }

    useEffect(() => {
        fetchIdea()
    }, [])



    return (
        <div id="activity">
            <h2>Consider doing the following</h2>
            {!isLoading ? <h3>{activity.activity}</h3> : <h3>Loading</h3>}
            {error && <h3>Something went wrong, please try again later.</h3>}

            <div id="customizeActivity">
                <div id="price-selector">
                    <label htmlFor="priceSelection">Select price for desired activity</label>
                    <input type="range" id="priceSelection" min="0" max="1" step="0.05" />
                </div>

                <div id="categories">
                    <button>Education</button>
                    <button>Recreational</button>
                    <button>Social</button>
                    <button>DIY</button>
                    <button>Charity</button>
                    <button>Cooking</button>
                    <button>Relaxation</button>
                    <button>Music</button>
                    <button>Busywork</button>
                </div>
            </div>
            <button onClick={fetchIdea}>Mmmm, give me another idea!</button>
        </div>
    )
}

export default Form