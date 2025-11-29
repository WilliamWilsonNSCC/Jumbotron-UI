import { Link } from 'react-router-dom'

function ShowCard(props) {
    const title = props.ShowTitle || props.Title
    const id = props.ShowId || props.id

    return (
        <div className="show-grid-item">
            <Link to={`/details/${id}`}>
                <img src={props.Filename} alt={title} />
                <div className="label">{title}</div>
            </Link>
        </div>
    )
}

export default ShowCard