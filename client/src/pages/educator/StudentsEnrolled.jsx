import React, { useEffect } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'

const StudentsEnrolled = () => {
 const [enrolledStudents, setEnrolledStudents] = useState(null)

 const fetchEnrolledStudents = async ()=>{
  setEnrolledStudents(dummyStudentEnrolled)
 }

 useEffect(() => {
    
 fetchEnrolledStudents()
   
 }, [])
 
  return (
    <div>
      <h1>StudentsEnrolled page</h1>
    </div>
  )
}

export default StudentsEnrolled
