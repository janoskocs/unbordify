import React from 'react'
import { useEffect, useState } from 'react'


const Form = () => {
    const [activity, setActivity] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('')


    const controller = new AbortController()
    const signal = controller.signal
    let url = 'http://www.boredapi.com/api/activity/'

    const getCategory = (value) => {
        setCategory(value)
    }
    const fetchIdea = () => {
        if (category !== '') {
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
                    <button value='education' onClick={(e) => getCategory(e.target.value)}>Education</button>
                    <button value='recreational' onClick={(e) => getCategory(e.target.value)}>Recreational</button>
                    <button value='social' onClick={(e) => getCategory(e.target.value)}>Social</button>
                    <button value='diy' onClick={(e) => getCategory(e.target.value)}>DIY</button>
                    <button value='charity' onClick={(e) => getCategory(e.target.value)}>Charity</button>
                    <button value='cooking' onClick={(e) => getCategory(e.target.value)}>Cooking</button>
                    <button value='relaxation' onClick={(e) => getCategory(e.target.value)}>Relaxation</button>
                    <button value='music' onClick={(e) => getCategory(e.target.value)}>Music</button>
                    <button value='busywork' onClick={(e) => getCategory(e.target.value)}>Busywork</button>
                </div>
            </div>
            <button onClick={fetchIdea}>Mmmm, give me another idea!</button>
        </div>
    )
}

export default Form