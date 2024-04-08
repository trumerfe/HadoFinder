import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./sass/styles.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { DateLocalizer } from "react-big-calendar/lib/localizer";
import { Popup } from "reactjs-popup";

const EventCalendar = (props) => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  // Handles opening and closing of modal
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  // Handles text inside the modal
  const [eventName, setEventName] = useState("empty");

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
          start: new Date(startDate),
          end: new Date(endDate),
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
    setEventName(`${event.title} at ${event.location}`);
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
              }}
            >
              {" "}
              <a className="close" onClick={closeModal}>
                {" "}
                &times;{" "}
              </a>{" "}
              {eventName}{" "}
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
