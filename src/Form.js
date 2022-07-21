import React from 'react'
import { useEffect, useState } from 'react'


const Form = () => {
    const [activity, setActivity] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [previousBtn, setPreviousBtn] = useState()


    const controller = new AbortController()
    const signal = controller.signal
    let url = 'http://www.boredapi.com/api/activity/'

    const getCategory = (target) => {
        setCategory(target.value)
        target.classList.add('active')
        setPreviousBtn(target)
        if (previousBtn === undefined) {
            return
        } else {
            previousBtn.classList.remove('active')
        }


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
            <h3>Consider doing the following</h3>
            {!isLoading ? <h2>{activity.activity}</h2> : <h2>Loading...</h2>}
            {error && <h3>Something went wrong, please try again later.</h3>}

            <div id="customizeActivity">

                <div id="categories">
                    <p>Select a category you prefer.</p>
                    <button value='education' onClick={(e) => getCategory(e.target)}>Education</button>
                    <button value='recreational' onClick={(e) => getCategory(e.target)}>Recreational</button>
                    <button value='social' onClick={(e) => getCategory(e.target)}>Social</button>
                    <button value='diy' onClick={(e) => getCategory(e.target)}>DIY</button>
                    <button value='charity' onClick={(e) => getCategory(e.target)}>Charity</button>
                    <button value='cooking' onClick={(e) => getCategory(e.target)}>Cooking</button>
                    <button value='relaxation' onClick={(e) => getCategory(e.target)}>Relaxation</button>
                    <button value='music' onClick={(e) => getCategory(e.target)}>Music</button>
                    <button value='busywork' onClick={(e) => getCategory(e.target)}>Busywork</button>
                </div>
            </div>
            <button onClick={fetchIdea}>Mmmm, give me something to do!</button>
        </div>
    )
}

export default Form