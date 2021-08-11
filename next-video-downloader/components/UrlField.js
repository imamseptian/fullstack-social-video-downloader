import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UrlField = ({ urlChange, getVideo, videoURL, logo, placeholder }) => {
  return (
    <div className="flex-form">
      <div className="test-icon">
        <FontAwesomeIcon icon={["fab", logo]} size="2x" />
      </div>

      <input
        type="search"
        placeholder={placeholder}
        value={videoURL}
        onChange={(e) => urlChange(e.target.value)}
      />
      <button
        className="get-button"
        onClick={(e) => {
          e.preventDefault();
          getVideo();
        }}
      >
        Get Video
      </button>
    </div>
  );
};

export default UrlField;
