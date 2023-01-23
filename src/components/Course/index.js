import {Link} from 'react-router-dom'

import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li className="list">
      <Link to={`/courses/${id}`} className="link-item">
        <div className="list-container">
          <img src={logoUrl} alt={name} className="logo" />
          <p className="logo-para">{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default Course
