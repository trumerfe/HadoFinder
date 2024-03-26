import './Home.scss'
import MonthPicker from "../../components/MonthPicker/MonthPicker"
import Map from "../../components/Map/Map"
import { useState, useEffect } from 'react'


const Home = () => {

  //TODO geolocation only working sometimes, most of the time location array logs as empty array. State not loading in time?
  const [location, setLocation] = useState([])

  function error() {
    console.log('Unable to retrieve your location')
  }

  function success(position) {
    console.log('Success')
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(lat)
    const location = [lat, lon]
    console.log(location)
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