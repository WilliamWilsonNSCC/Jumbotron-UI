import { useParams } from 'react-router-dom'
import NavBar from '../ui/NavBar.jsx'

function Category() {
    const { category } = useParams()

    const categoryInfo = {
        'concerts': { title: 'Concerts', description: 'Live music performances and tours' },
        'live-events': { title: 'Live Events', description: 'Theater, comedy, and entertainment' },
        'sports': { title: 'Sports', description: 'Games and athletic events' }
    }

    const info = categoryInfo[category]

    if (!info) {
        return (
            <>
                <NavBar />
                <div className="container mt-4">
                    <h1>Category Not Found</h1>
                    <p>The category "{category}" does not exist.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="container mt-4">
                <h1>{info.title}</h1>
                <p className="lead">{info.description}</p>
                <hr />
                {/* TODO: Fetch and display events for this category */}
                <p>Events for {info.title} will be displayed here.</p>
            </div>
        </>
    )
}

export default Category