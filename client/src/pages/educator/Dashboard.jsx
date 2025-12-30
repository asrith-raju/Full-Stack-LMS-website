import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {

  const {currency} = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async()=>{
    setDashboardData(dummyDashboardData)
  }
  return (
    <div>
      <h1>educator Dashboard</h1>
    </div>
  )
}

export default Dashboard
