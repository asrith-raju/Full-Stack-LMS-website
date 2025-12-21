import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { data, useParams } from 'react-router-dom'

const CoursesList = () => {
  const { navigate } = useContext(AppContext)

  const {input}= useParams()
  return (
    <>
      <div>
        <div>
          <div>
            <h1>Course List</h1>
            <p className='text-gray-500'>
              <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>Home</span> / <span>Course List</span></p>
          </div>
        <SearchBar data={data}/>
        </div>
      </div>
    </>
  )
}

export default CoursesList
