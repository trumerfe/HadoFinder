import { useEffect, useState } from "react";
// import { MonthPicker } from "react-lite-month-picker";
import { MonthPicker } from './MonthPicker/MonthPicker.jsx'
// moved MonthInput to local so I can edit styles
import { MonthInput } from './MonthInput/MonthInput.jsx'

const DatePicker = (props) => {
  const date = new Date();
  const actualDate = date.toLocaleDateString();
  const currDateArr = actualDate.split("/");

  const [selectedMonthData, setSelectedMonthData] = useState({
    month: currDateArr[0],
    year: currDateArr[2],
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    props.setFirstDay(
      new Date(selectedMonthData.year, selectedMonthData.month - 1, 1)
    );
    props.setLastDay(
      new Date(selectedMonthData.year, selectedMonthData.month, 1)
    );
  }, [selectedMonthData]);

  return (
    <>
      <div>
        <MonthInput
          selected={selectedMonthData}
          setShowMonthPicker={setIsPickerOpen}
          showMonthPicker={isPickerOpen}
        />
        {isPickerOpen ? (
          <MonthPicker
            className="monthPicker"
            setIsOpen={setIsPickerOpen}
            selected={selectedMonthData}
            onChange={setSelectedMonthData}
          />
        ) : null}
      </div>
    </>
  );
};

export default DatePicker;
