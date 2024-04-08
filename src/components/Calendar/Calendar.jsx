import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import "./sass/styles.scss";
import { useEffect, useState } from "react";

const EventCalendar = (props) => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  let calendarItem = {};
  let tempArray = [];

  const arrMap = () => {
    if (props.eventList[0]) {

      props.eventList.map((item, index) => {

        const startDate = new Date(parseInt((item.startAt)*1000))
        const endDate = new Date(parseInt((item.endAt)*1000))

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

  console.log(calendarEvents);

  // const testArr = [
  //   {
  //     id: 1,
  //     title: "Long Event",
  //     start: new Date(parseInt(1712605496 * 1000)),
  //     end: new Date(parseInt(1712605496 * 1000)),
  //   },

  //   {
  //     id: 2,
  //     title: "DTS STARTS",
  //     start: new Date(2024, 4, 13, 0, 0, 0),
  //     end: new Date(2024, 4, 20, 0, 0, 0),
  //   },

  //   {
  //     id: 3,
  //     title: "DTS ENDS",
  //     start: new Date(2024, 4, 6, 0, 0, 0),
  //     end: new Date(2024, 4, 13, 0, 0, 0),
  //   },
  // ];

  return (
    <>
      {/* {console.log(testArr)} */}
      {calendarEvents[0] ? (
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EventCalendar;
