import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Details(){
    const {id} = useParams()

    // Define a state variable to hold photos
    const [show, setShow] = useState(null)

    // Get API Url from environment variables
    const apiUrl = import.meta.env.VITE_SHOWS_API_URL
    const apiBase = apiUrl ? apiUrl.replace(/\/$/, '') : ''

    useEffect(() => {
        const getShowById = async () => {
            const endpoint = `${apiBase}/${id}`
            console.log('Fetching show endpoint:', endpoint)
            const response = await fetch(endpoint)
            const result = await response.json()

            if(response.ok){
                setShow(result)
            } else {
                console.error('Failed fetching show:', response.status, result)
            }
        }

        getShowById()
    }, [id])

        useEffect(() => {
            console.log('Show data:', show)
        }, [show])

    return (
        <>
            <p><Link to="/">← Back to Home</Link></p>

            <div> 
                {show && (
                    <>
                        <h2>{show.Title || show.ShowTitle || 'Event'}</h2>
                        <img src={show.Filename} alt={show.Title || show.ShowTitle} width="300" />
                        {show.Date && <p><strong>Date:</strong> {show.Date}</p>}
                        {show.Location && <p><strong>Location:</strong> {show.Location}</p>}
                        {show.Description && <p>{show.Description}</p>}
                    </>
                )}
            </div>

            <h3>Purchase</h3>

            <p>If you'd like to buy tickets for this event, click below to open the purchase form.</p>


            <p><Link to={`/purchase/${id}`}>Purchase Tickets →</Link></p>
        </>
    
    )
}

export default Details