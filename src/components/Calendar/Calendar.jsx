import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./sass/styles.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { DateLocalizer } from "react-big-calendar/lib/localizer";
import { Popup } from "reactjs-popup";
import { Link } from 'react-router-dom'

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

  let calendarItem = {};
  let tempArray = [];

  const arrMap = () => {
    // Handles MAP function for populating the calendar
    if (props.eventList[0]) {
      props.eventList.map((item, index) => {
        // startAt * 1000 to convert it to compatible timestamp format (13 digits)
        // console.log(item.id)
        const startDate = new Date(parseInt(item.startAt * 1000));
        const endDate = new Date(parseInt(item.endAt * 1000));

        calendarItem = {
          location: item.venueAddress,
          id: index,
          title: item.name,
          link: item.slug,
          start: new Date(startDate),
          end: new Date(endDate),
          tournamentId: item.id
        };
        tempArray = [...tempArray, calendarItem];
      });
    }
  };

  useEffect(() => {
    arrMap();
    setCalendarEvents(tempArray);
  }, [props.eventList]);

  // Handles modal pop up and modal dynamic text
  const handleSelectEvent = useCallback((event) => {
    props.setCurrentEvent(event.tournamentId)
    setEventLink(`https://start.gg/${event.link}`)
    setEventDate(event.start.toString().split('(')[0])
    setEventName(event.title);
    setEventAddress(event.location)
    setOpen((o) => !o);
  }, []);

  return (
    // <>
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
                padding: "16px"
                
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
              <a target="blank" href={eventLink}>{eventLink}</a>
              {" "}
            </div>
          </Popup>
        }
      </article>
    // </>
  );
};
// Handles more events popup
EventCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

export default EventCalendar;
