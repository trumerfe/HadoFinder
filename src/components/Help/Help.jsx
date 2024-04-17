import React from "react";
import "./Help.scss";

const Help = (props) => {
  const handleHelp = () => {
    props.setHelp(false);
  };

  return (
    <section className="help">
      <button onClick={handleHelp} className="help__close">
        close
      </button>
      <h3 className="help__heading">What is HadoFinder?</h3>
      <p className="help__copy">
        HadoFinder is a tool designed to help fighting game players find
        tournaments in their area. It includes a map view that shows tournaments
        in their locations, and a calendar.
      </p>
      <h3 className="help__heading">How to use:</h3>
      <p className="help__copy">
        Allowing HadoFinder to access your location will automatically center
        the map where you are and get the tournament data for that area. If you
        prefer to not share your location, clicking on the map will set that
        location as the one to be used. To change location just click on a
        different place on the map.
      </p>
      <p className="help__copy">
        Clicking on any map marker or calendar event will show the general
        information of the event, as well as the link to its start.gg page.
      </p>
      <p className="help__copy">
        You can set the radius of your search from the center point using the
        drop-down menu, as well as filter tournaments by month.
      </p>
      <p className="help__copy">
        Note: When filtering by month, you will have to change the month in the
        calendar manually.
      </p>
      <p className="help__copy">
        If a calendar cell says there are more events that day, clicking on that
        text will show them.
      </p>
      <p className="help__copy">
        You can also filter tournaments by game using the search bar. It will
        recommend responses so you don't need to worry about misspelling the
        name of the game. To clear your search, press the "Reset Search" button.
      </p>
      <p className="help__copy">
        Clicking on an event in the calendar will filter the map to only show
        that event. the "Reset Search" button will also reset this filter.
      </p>
      <h3 className="help__heading">Credit:</h3>
      <p className="help__copy">
        Creator and Software Engineer:{" "}
        <a target="blank" href="https://github.com/trumerfe">
          Trumerfe
        </a>
      </p>
      <a href='https://ko-fi.com/K3K661YXZ' target='_blank'><img height='36' style={{border: "0px", height: "36px"}} src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
    </section>
  );
};

export default Help;
