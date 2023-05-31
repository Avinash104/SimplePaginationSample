import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [showList, setShowList] = useState(true);
  const [productList, setProductList] = useState([]);
  const [listSelect, setListSelect] = useState({
    start: 0,
    end: 10
  });

  const nextPrpoductListSelection = () => {
    if (listSelect.end === productList.length) return;
    setListSelect((prev) => ({
      ...listSelect,
      start: prev.start + 10,
      end: prev.end + 10
    }));
  };
  const prevPrpoductListSelection = () => {
    if (listSelect.start === 0) return;
    setListSelect((prev) => ({
      ...listSelect,
      start: prev.start - 10,
      end: prev.end - 10
    }));
  };

  const fetchProducts = async () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductList(data.products));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <button onClick={() => setShowList((prev) => !prev)}>Show List</button>
      {showList && (
        <div>
          {productList.slice(listSelect.start, listSelect.end).map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </div>
      )}
      <div>
        <button onClick={prevPrpoductListSelection}> Prev </button>
        <button onClick={nextPrpoductListSelection}> Next </button>
      </div>
    </div>
  );
}
