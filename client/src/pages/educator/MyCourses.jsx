import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const MyCourses = () => {
  const {currency,allCourses} = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = ()=>{
    setCourses(allCourses)
  }

  useEffect(() => {
    
  fetchEducatorCourses()
    
  }, [])
  
  return (
    <div>
     
    </div>
  )
}

export default MyCourses
