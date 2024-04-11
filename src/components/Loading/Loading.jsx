import "./Loading.scss";

const Loading = () => {
  return (
    <section className="loading">
      <p className="loading__text">LOADING</p>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default Loading;
