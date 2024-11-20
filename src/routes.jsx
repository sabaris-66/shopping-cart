import App from "./components/App";
import CartPage from "./components/CartPage";
import ErrorPage from "./components/ErrorPage";
import ShopPage from "./components/ShopPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shopPage",
    element: <ShopPage />,
  },
  {
    path: "cartPage",
    element: <CartPage />,
  },
];

export default routes;
