import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CourseDetails = () => {

  const {id} = useParams()

  const [courseData,setCourseData] = useState(null)

  const {allCourses} = useContext(AppContext)


  const fetchCourseData = ()=>{
   const findCourse = allCourses.find(course => course._id ===id)
   setCourseData(findCourse)
  }

  useEffect(() => {
   fetchCourseData( )
  }, [])
  
  return (
    <div>
      <h1>course details  page</h1>
    </div>
  )
}

export default CourseDetails
