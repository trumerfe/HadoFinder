import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./sass/styles.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { DateLocalizer } from "react-big-calendar/lib/localizer";
import { Popup } from "reactjs-popup";
import axios from "axios";

const EventCalendar = (props) => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  // Handles opening and closing of modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // Handles text inside the modal
  const [eventName, setEventName] = useState("empty");
  const [eventAddress, setEventAddress] = useState("empty");
  const [eventDate, setEventDate] = useState("empty");
  const [eventLink, setEventLink] = useState("empty");
  const [eventId, setEventId] = useState("");
  const [eventISOdate, setEventISOdate] = useState("")

  const [favClicked, setFavClicked] = useState(0);
  const [eventNum, setEventNum] = useState('')

  const baseUrl = "http://localhost:8080";

  let calendarItem = {};
  let tempArray = [];

  const arrMap = () => {
    // Handles MAP function for populating the calendar
    if (props.eventList[0]) {
      props.eventList.map((item, index) => {
        // startAt * 1000 to convert it to compatible timestamp format (13 digits)
        const startDate = new Date(parseInt(item.startAt * 1000));
        const endDate = new Date(parseInt(item.endAt * 1000));

        calendarItem = {
          location: item.venueAddress,
          id: index,
          title: item.name,
          link: item.slug,
          start: new Date(startDate),
          end: new Date(endDate),
          tournamentId: item.id,
        };
        tempArray = [...tempArray, calendarItem];
      });
    }
  };

  useEffect(() => {
    arrMap();
    setCalendarEvents(tempArray);
    // console.log(eventDate)
  }, [props.eventList]);

  // Handles modal pop up and modal dynamic text
  const handleSelectEvent = useCallback((event) => {
    console.log(event.start.toString())

    let dateobj = new Date(event.start.toString())
    let ISOdate = dateobj.toISOString()
    let ISOdateUsable = ISOdate.split(".")[0]

    setEventISOdate(ISOdateUsable)

    props.setCurrentEvent(event.tournamentId);
    setEventId(event.tournamentId)
    setEventLink(`https://start.gg/${event.link}`);
    setEventDate(event.start.toString().split("(")[0]);
    setEventName(event.title);
    setEventAddress(event.location);
    setOpen((o) => !o);
  }, []);

  const handleNonLogClick = () => {
    props.setFav(true);
  };

  const postEvent = async () => {
    try {
      await axios.post(`${baseUrl}/events`, {
        name: eventName,
        address: eventAddress,
        date: eventISOdate,
        url: eventLink,
        event_id: eventId
      })
      console.log("New Event Added")
      getEvent()
    } catch (error) {
      console.log(error)
    }
  }

  const getEvent = async () => {
    try {
      const response = await axios.get(`${baseUrl}/events/${eventId}`);
      // console.log(response.data.event_num);
      setEventNum(response.data.event_num)
      postFavorite()
    } catch (error) {
      console.log(`No event found with ID ${eventId}`);
      postEvent()
    }
  };

  const postFavorite = async () => {
    // console.log(eventNum)
    try {
      await axios.post(`http://localhost:8080/favorites`, {
        user: props.userId,
        event: eventNum
      })
      console.log(`Added event ${eventNum}`)
      props.setFavAdded(props.favAdded + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoggedClick = () => {
    setFavClicked(favClicked + 1);
    console.log(eventId)
    getEvent();
  };

  return (
    <article className="calendarDiv">
      {calendarEvents[0] ? (
        <Calendar
          localizer={localizer}
          dayLayoutAlgorithm={"no-overlap"}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "70vh" }}
          onSelectEvent={handleSelectEvent}
          popup
        />
      ) : (
        "Loading Map..."
      )}
      {
        <Popup
          open={open}
          position="right center"
          closeOnDocumentClick
          onClose={closeModal}
        >
          <div
            className="modal"
            style={{
              backgroundColor: "white",
              width: "30vw",
              height: "300px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "black",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            {" "}
            <a className="close" onClick={closeModal}>
              {" "}
              Close{" "}
            </a>{" "}
            <p>{eventName}</p>
            <p>{eventAddress}</p>
            <p>{eventDate}</p>
            <a target="blank" href={eventLink}>
              {eventLink}
            </a>{" "}
            {props.isLoggedIn === true ? (
              <button onClick={handleLoggedClick}>Add Favorite</button>
            ) : (
              <button onClick={handleNonLogClick}>Add Favorite</button>
            )}
          </div>
        </Popup>
      }
    </article>
  );
};
// Handles more events popup
EventCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

export default EventCalendar;
