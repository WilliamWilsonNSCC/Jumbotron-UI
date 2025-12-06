import { Link } from 'react-router-dom'
import NavBar from '../ui/NavBar.jsx'

function Events() {
    const categories = [
        { id: 'concerts', name: 'Concerts', description: 'Live music performances' },
        { id: 'live-events', name: 'Live Events', description: 'Theater, comedy, and more' },
        { id: 'sports', name: 'Sports', description: 'Games and athletic events' }
    ]

    return (
        <>
            <NavBar />
            <div className="container mt-4">
                <h1>Event Categories</h1>
                <div className="row">
                    {categories.map(category => (
                        <div key={category.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                    <p className="card-text">{category.description}</p>
                                    <Link to={`/events/${category.id}`} className="btn btn-primary">
                                        Browse {category.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Events
