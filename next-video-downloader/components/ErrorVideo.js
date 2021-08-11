import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ErrorVideo = ({ errorStatus, dismissAlert }) => {
  return (
    <div className={`bar-error ${!errorStatus.isError ? `hidden` : null}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={["fas", "exclamation-triangle"]}
          style={{ marginRight: "10px" }}
          color="rgba(255, 204, 0,1)"
        />
        <p>{errorStatus.message}</p>
      </div>
      <a
        href=""
        className="close"
        onClick={(e) => {
          e.preventDefault();
          dismissAlert();
        }}
      >
        X
      </a>
    </div>
  );
};

export default ErrorVideo;
