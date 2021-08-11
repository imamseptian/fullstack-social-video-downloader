export default function UrlForm() {
  return (
    <div>
      <form className="flex-form">
        <label htmlFor="from">
          <i className="ion-location" />
        </label>
        <input type="search" placeholder="Where do you want to go?" />
        <input type="submit" defaultValue="Search" />
      </form>
    </div>
  );
}
