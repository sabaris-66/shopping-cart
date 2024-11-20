import { Link } from "react-router-dom";
import "../styles/app.css";

const CartPage = () => {
  return (
    <div className="homeBody">
      <h1>Thank you for shopping with us!</h1>
      <hr />
      <Link to="/">
        <button>Back to Home Page</button>
      </Link>
    </div>
  );
};

export default CartPage;
