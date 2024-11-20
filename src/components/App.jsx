import { Link } from "react-router-dom";
import "../styles/app.css";

const App = () => {
  return (
    <div className="homeBody">
      <h1>Welcome to ZamaZon</h1>
      <h2>Shop to your heart's content</h2>
      <Link to="shopPage">
        <button>Start Shopping</button>
      </Link>
    </div>
  );
};

export default App;
