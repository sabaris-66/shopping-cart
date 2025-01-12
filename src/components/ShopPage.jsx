import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/shopStyles.css";

const ShopPage = () => {
  // all the fetches were triggered in parallel
  // const [test, setTest] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(15);

  useEffect(() => {
    const key = setInterval(() => {
      setLoadingTime((count) => count - 1);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      // waiting for allthethings in parallel
      const result = (
        await Promise.all([
          fetch("https://fakestoreapi.com/products/1"),
          fetch("https://fakestoreapi.com/products/2"),
          fetch("https://fakestoreapi.com/products/3"),
          fetch("https://fakestoreapi.com/products/4"),
          fetch("https://fakestoreapi.com/products/5"),
          fetch("https://fakestoreapi.com/products/6"),
          fetch("https://fakestoreapi.com/products/7"),
          fetch("https://fakestoreapi.com/products/8"),
          fetch("https://fakestoreapi.com/products/9"),
          fetch("https://fakestoreapi.com/products/10"),
          fetch("https://fakestoreapi.com/products/11"),
          fetch("https://fakestoreapi.com/products/12"),
          fetch("https://fakestoreapi.com/products/13"),
          fetch("https://fakestoreapi.com/products/14"),
          fetch("https://fakestoreapi.com/products/15"),
          fetch("https://fakestoreapi.com/products/16"),
          fetch("https://fakestoreapi.com/products/17"),
          fetch("https://fakestoreapi.com/products/18"),
          fetch("https://fakestoreapi.com/products/19"),
          fetch("https://fakestoreapi.com/products/20"),
        ])
      ).map((r) => r.json());

      // and waiting a bit more - fetch API is cumbersome
      const finalResult = await Promise.all(result);

      let temp = finalResult.map((obj) => {
        const { title, price, image } = obj;
        return { title, price, image, count: 0 };
      });
      // when the data is ready, save it to state
      setData(temp);
      setLoading(false);
    };

    dataFetch();
  }, []);

  // const handleTest = () => {
  //   setTest((prev) => prev + 1);
  // };
  // show loading state while waiting for all the data
  if (!data) return "loading";

  const addToCart = (index, id) => {
    let input = document.querySelector(`#${id}`);
    let temp = data;
    temp[index].count += parseInt(input.value);
    setData([...temp]);
    console.log(data);
  };

  const removeFromCart = (index, id) => {
    let input = document.querySelector(`#${id}`);
    let temp = data;
    temp[index].count = 0;
    setData([...temp]);
    console.log(data);
  };

  const handlePlus = (index, id) => {
    let input = document.querySelector(`#${id}`);
    if (input.value < 20) {
      input.value = parseInt(input.value) + 1;
    }

    // let temp = data;
    // temp[index].count += 1;
    // setData([...temp]);
  };

  const handleMinus = (index, id) => {
    let input = document.querySelector(`#${id}`);
    if (input.value > 0) {
      input.value = parseInt(input.value) - 1;
    }
    // let temp = data;
    // temp[index].count -= 1;
    // setData([...temp]);
  };

  const totalCount = data.reduce((accumulator, item) => {
    return (accumulator += parseInt(item.count));
  }, 0);

  const totalPrice = data.reduce((accumulator, item) => {
    return (accumulator += item.count * item.price);
  }, 0);

  const loadingMessage =
    "Sorry, this is taking longer than expected. 15 seconds for the back-end api to generate data.";

  // render the actual app here and pass data from state to children
  return (
    <>
      <div className="header">
        <div className="headerLeft">
          <Link to="/">Back to Home Page</Link>
        </div>
        <div className="headerRight">
          <Link to="../cartPage">
            <div>
              <div>To Cart</div>
              <div>No of items: {totalCount}</div>
              <div>Total Price: $ {Math.floor(totalPrice * 100) / 100}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="shoppingCards">
        {loading && (
          <>
            <div style={{ color: "red", fontSize: "20px" }}>
              {loadingMessage}
            </div>
            <br />
            <div style={{ color: "red", fontSize: "25px" }}>{loadingTime}</div>
          </>
        )}
        {data &&
          data.map((d, index) => {
            let id = `I${index}`;
            return (
              <div className="card" key={d.title}>
                <div>{d.title}</div>
                <img src={d.image} alt={d.title} />
                <div>
                  <button onClick={() => handleMinus(index, id)}>-</button>
                  <input type="number" id={id} max={20} min={0} value={0} />
                  <button onClick={() => handlePlus(index, id)}>+</button>

                  <div>Price: ${d.price}</div>
                  <div>In Cart: {d.count}</div>
                  <button onClick={() => addToCart(index, id)}>
                    Add to cart
                  </button>
                  {d.count > 0 && (
                    <button onClick={() => removeFromCart(index, id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* <Sidebar data={sidebar} />
      <Issue comments={comments} issue={issue} /> */}
    </>
  );
};

export default ShopPage;
