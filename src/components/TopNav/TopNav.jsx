import "./TopNav.scss"
import map from '../../assets/icons/TopNav-Map.svg'
import upload from '../../assets/icons/TopNav-Upload.svg'
import calendar from '../../assets/icons/TopNav-Calendar.svg'


const TopNav = () => {
  return (
    <header className="topNav">
      <h1 className="topNav__title">FGFinder</h1>
      <div className="topNav__div">
        <img className="topNav__iconMap" src={map} alt="map icon" />
        <img className="topNav__iconCalendar" src={calendar} alt="calendar icon" />
        <img className="topNav__iconUpload" src={upload} alt="upload icon" />
        {/* <p>map</p>
        <p>calendar</p>
        <p>upload</p> */}
      </div>
    </header>
  )
}

export default TopNav