import DateSelect from "../../components/DateSelect/DateSelect"
import './Home.scss'
import MonthPicker from "../../components/MonthPicker/MonthPicker"
import Map from "../../components/Map/Map"

const Home = () => {
  return (
    <main>
      {/* <DateSelect /> */}
      <MonthPicker />
      <Map />
    </main>
  )
}

export default Home