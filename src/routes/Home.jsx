import { useEffect, useState } from 'react'
import ShowCard from '../ui/ShowCard.jsx'

function Home(){
    
  // Define a state variable to hold photos
  const [Show, setShows] = useState([])

  // Get API Url from environment variables
  const apiUrl = import.meta.env.VITE_SHOWS_API_URL
  const apiBase = apiUrl ? apiUrl.replace(/\/$/, '') : apiUrl

  // Fetch photos from API when component mounts
  useEffect(() => { 
    const getShows = async () => { 
      const endpoint = apiBase || apiUrl
      console.log('Fetching shows from:', endpoint)
      const response = await fetch(endpoint) 
      const result = await response.json() 
        
      if(response.ok) { 
          setShows(result)
        } else {
          console.error('Failed fetching shows:', response.status, result)
        }
      } 
    
      getShows()
    console.log(Show)
  }, [])

  return(
    <>
      <div className="show-grid">
        {
          Show.length > 0 && (
            Show.map(Show => (
                <div key={Show.ShowId}>
                    <ShowCard ShowId={Show.ShowId} Filename={Show.Filename} ShowTitle={Show.Title} className="img-fluid" />
                </div>
              ))                    
          )
        }
      </div>
    </>
    )
}

export default Home