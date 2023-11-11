import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import FilterCarCard from "../FilterCarCard";

const FilterCar = () => {
  const [overlayBgOn, setOverlayBgOn] = useState(false);
  const [carList, setCarList] = useState([]);
  const [nameCar, setNameCar] = useState("");
  const [categoryCar, setCategoryCar] = useState("");
  const [availableCar, setAvailableCar] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    handleGetCarList(nameCar, categoryCar, availableCar, minPrice, maxPrice);
  }, []);

  const handleGetCarList = (inputName, inputCategory, inputAvailable, inputMin, inputMax) => {
    axios
      .get(
        `https://api-car-rental.binaracademy.org/customer/v2/car?page=1&pageSize=10&name=${inputName}&category=${inputCategory}&isRented=${inputAvailable}&minPrice=${inputMin}&maxPrice=${inputMax}`
      )
      .then((res) => {
        setCarList(res.data.cars);
        console.log("API Car List", res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameCar = (e) => {
    setNameCar(e.target.value);
  };

  const handleCategoryCar = (e) => {
    setCategoryCar(e.target.value);
  };
  const handlePriceCar = (e) => {
    const priceValue = e.target.value;

    let minPrice = 0;
    let maxPrice = 0;

    switch (priceValue) {
      case "0-349999":
        minPrice = 0;
        maxPrice = 349999;
        break;
      case "350000-500000":
        minPrice = 350000;
        maxPrice = 500000;
        break;
      case "500001-9999999999":
        minPrice = 500001;
        maxPrice = 9999999999;
        break;
      default:
        minPrice = 0;
        maxPrice = 9999999999;
        break;
    }

    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const handleAvailableCar = (e) => {
    const availableValue = e.target.value;
    setAvailableCar(availableValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleOverlayOn = () => {
    if (!overlayBgOn) {
      setOverlayBgOn(true);
    }
  };

  const handleOverlayOff = () => {
    if (overlayBgOn) {
      setOverlayBgOn(false);
    }
  };

  const handleSubmit = () => {
    handleGetCarList(nameCar, categoryCar, availableCar, minPrice, maxPrice);

    setIsSubmit(true);

    // console.log(nameCar, categoryCar, minPrice, maxPrice, availableCar);
  };

  const handleReset = () => {
    setNameCar("");
    setCategoryCar("");
    setAvailableCar(false);
    setMinPrice(0);
    setMaxPrice(9999999999);
    handleGetCarList("", "", false, "", "");
    setIsSubmit(false);
  };

  return (
    <>
      {overlayBgOn && <div onClick={handleOverlayOff} className="overlay-bg"></div>}

      <div onClick={handleOverlayOn} className="container wrapper-filter-car">
        <div className="row d-flex align-items-end" id="filter-car">
          <div className="col d-flex flex-column py-2">
            <label htmlFor="name">Nama Mobil</label>
            <input
              onKeyPress={handleKeyPress}
              onChange={handleNameCar}
              autoComplete="off"
              id="name"
              placeholder="Ketik nama/tipe mobil"
              value={nameCar}
            />
          </div>
          <div className="col d-flex flex-column py-2">
            <label htmlFor="categories">Kategori</label>
            <select onChange={handleCategoryCar} name="categories" id="categories" value={categoryCar}>
              <option value="">Masukan Kapasitas Mobil</option>
              <option value="small">2 - 4 Orang</option>
              <option value="medium">4 - 6 Orang</option>
              <option value="large">6 - 8 Orang</option>
            </select>
          </div>
          <div className="col d-flex flex-column py-2">
            <label htmlFor="price">Harga</label>
            <select onChange={handlePriceCar} name="price" id="price" value={`${minPrice}-${maxPrice}`}>
              <option value="0-9999999999">Masukan Harga Sewa per Hari</option>
              <option value="0-349999">&lt; Rp. 350.000</option>
              <option value="350000-500000">Rp 350.000 - Rp 500.000</option>
              <option value="500001-9999999999">&gt; Rp. 500.000</option>
            </select>
          </div>
          <div className="col d-flex flex-column py-2">
            <label htmlFor="status">Status</label>
            <select onChange={handleAvailableCar} name="status" id="status" value={availableCar}>
              <option value="true">Disewa</option>
              <option value="false">Tersedia</option>
            </select>
          </div>
          <button
            onClick={() => {
              if (isSubmit) {
                handleReset();
              } else {
                handleSubmit();
              }
              handleOverlayOff();
            }}
            className={`btn border-0 ${isSubmit ? "btn-danger" : "btn-success"}`}
          >
            {isSubmit ? "Reset" : "Cari Mobil"}
          </button>
        </div>
      </div>
      <div className="container mb-5" id="car-list">
        <div className="row flex-wrap">
          {carList.length > 0 ? (
            carList.map((data, id) => <FilterCarCard key={id} all={data} />)
          ) : (
            <h1 className="text-center p-5">Mobil belum tersedia</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterCar;
