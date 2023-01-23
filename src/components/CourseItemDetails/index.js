import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {course: {}, status: apiStatus.initial}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({status: apiStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        status: apiStatus.success,
        course: formattedData,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  success = () => {
    const {course} = this.state

    return (
      <div className="su-container">
        <div className="card-container">
          <img src={course.imageUrl} alt={course.name} />
          <div>
            <h1 className="su-head">{course.name}</h1>
            <p className="su-para">{course.description}</p>
          </div>
        </div>
      </div>
    )
  }

  failure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderCourseItem = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.success()
      case apiStatus.failure:
        return this.failure()
      case apiStatus.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="item-container">{this.renderCourseItem()}</div>
      </>
    )
  }
}
export default CourseItemDetails
