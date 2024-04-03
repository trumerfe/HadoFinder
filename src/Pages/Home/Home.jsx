import './Home.scss'
import MonthPicker from "../../components/MonthPicker/MonthPicker"
import Map from "../../components/Map/Map"
import { useState, useEffect } from 'react'

const Home = () => {

  const [location, setLocation] = useState([])

  function error() {
    console.log('Unable to retrieve your location')
  }

  function success(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const location = [lat, lon]
    setLocation(location)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  },[])

  return (
    <main>
      <MonthPicker />
      <Map location={location} />
    </main>
  )
}

export default Home