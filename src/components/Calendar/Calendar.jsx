import { Calendar, momentLocalizer } from "react-big-calendar";
// import "./Calendar.scss";
import moment from "moment";
const localizer = momentLocalizer(moment)
import '../../../node_modules/react-big-calendar/lib/sass/styles.scss'

const EventCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default EventCalendar;
