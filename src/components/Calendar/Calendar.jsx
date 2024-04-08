import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import "./sass/styles.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { DateLocalizer } from "react-big-calendar/lib/localizer";
import { Popup } from "reactjs-popup";

const EventCalendar = (props) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const ref = useRef()

  const closeModal = () => setOpen(false);

  console.log(props.eventList);

  let calendarItem = {};
  let tempArray = [];

  const arrMap = () => {
    if (props.eventList[0]) {
      props.eventList.map((item, index) => {
        const startDate = new Date(parseInt(item.startAt * 1000));
        const endDate = new Date(parseInt(item.endAt * 1000));

        calendarItem = {
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

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );


  return (
    <>
      {calendarEvents[0] ? (
        <Calendar
          localizer={localizer}
          dayLayoutAlgorithm={"no-overlap"}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={() => setOpen((o) => !o)}
          popup
        />
      ) : (
        "Loading Map..."
      )}
      <Popup ref={ref} open={open} position='right center' closeOnDocumentClick onClose={closeModal}>
        <div className="modal" style={{backgroundColor: "red", width: "30vw"}}>
          {" "}
          <a className="close" onClick={closeModal}>
            {" "}
            &times;{" "}
          </a>{" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia,
          voluptate ea, accusamus excepturi deleniti ratione sapiente!
          Laudantium, aperiam doloribus. Odit, aut.{" "}
        </div>
      </Popup>
    </>
  );
};
EventCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  // onSelectEvent: PropTypes.instanceOf("Test")
};

export default EventCalendar;
