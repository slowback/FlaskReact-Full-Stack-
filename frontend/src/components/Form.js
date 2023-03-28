import React, { useState, useEffect } from 'react';
import APIService from './APIService';

function From(props) {
  let [name, setNameTitle] = useState('');
  let [mapUrl, setMapUrl] = useState('');
  let [imgUrl, setImgUrl] = useState('');
  let [location, setLocation] = useState('');
  let [seats, setSeats] = useState('');
  let [hasToilet, setHasToilet] = useState(false);
  let [hasWifi, setHasWifi] = useState(false);
  let [hasSockets, setHasSockets] = useState(false);
  let [canTakeCalls, setCanTakCalls] = useState(false);
  let [coffeePrice, setPrice] = useState('');

  useEffect(() => {
    setNameTitle(props.article.name);
    setPrice(props.article.coffee_price);
    setMapUrl(props.article.map_url);
    setImgUrl(props.article.img_url);
    setLocation(props.article.location);
    setCanTakCalls(props.article.can_take_calls);
    setHasSockets(props.article.has_sockets);
    setHasToilet(props.article.has_toilet);
    setHasWifi(props.article.has_wifi);
    setSeats(props.article.seats);
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(props.article.id, {
      name,
      mapUrl,
      imgUrl,
      location,
      hasSockets,
      hasToilet,
      hasWifi,
      canTakeCalls,
      seats,
      coffeePrice,
    })
      .then((resp) => props.updateData(resp))
      .catch((error) => console.error(error));
  };

  const insertArticle = () => {
    APIService.InsertArticle({
      name,
      mapUrl,
      imgUrl,
      location,
      seats,
      hasToilet,
      hasWifi,
      hasSockets,
      canTakeCalls,
      coffeePrice,
    })
      .then((resp) => props.insertedArticle(resp))
      .catch((error) => console.error(error));
  };

  window.scrollTo(0, document.body.scrollHeight);

  return (
    <footer>
      {props.article ? (
        <div className="container mb-3" id="form-input">
          <div className="row">
            <div className="col">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                className="form-control"
                placeholder="Please Enter name"
                onChange={(e) => setNameTitle(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="map_url" className="form-label">
                Map URL
              </label>
              <input
                id="url_map"
                type="url"
                value={mapUrl}
                className="form-control"
                placeholder="Please Enter map(url)"
                onChange={(e) => setMapUrl(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="img_url" className="form-label">
                Image URL
              </label>
              <input
                id="url_image"
                type="url"
                value={imgUrl}
                className="form-control"
                placeholder="Please Enter Image(url)"
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                className="form-control"
                placeholder="Please Enter location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="sockets" className="form-label">
                Sockets
              </label>
              <input
                id="sockets"
                type="text"
                value={hasSockets}
                className="form-control"
                placeholder="Please Enter has socket?"
                onChange={(e) => setHasSockets(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="toilet" className="form-label">
                Toilet
              </label>
              <input
                id="toilet"
                type="text"
                value={hasToilet}
                className="form-control"
                placeholder="Please Enter has toilet?"
                onChange={(e) => setHasToilet(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="wifi" className="form-label">
                Wifi
              </label>
              <input
                id="wifi"
                type="text"
                value={hasWifi}
                className="form-control"
                placeholder="Please Enter has wifi?"
                onChange={(e) => setHasWifi(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="calls" className="form-label">
                Calls
              </label>
              <input
                id="calls"
                type="text"
                value={canTakeCalls}
                className="form-control"
                placeholder="Please Enter has calls?"
                onChange={(e) => setCanTakCalls(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="seats" className="form-label">
                Seats
              </label>
              <input
                id="seats"
                type="text"
                value={seats}
                className="form-control"
                placeholder="Please Enter seat"
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="price" className="form-label">
                Price (default: ฿)
              </label>
              <input
                id="price"
                type="text"
                value={coffeePrice}
                className="form-control"
                placeholder="Please Enter price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : null}
      {props.article.id ? (
        <div className="col-md-12 text-center">
          <button herf="/" className="btn btn-success mt-3 " id="button-input" onClick={updateArticle}>
            update
          </button>
        </div>
      ) : (
        <div className="col-md-12 text-center">
          <button className="btn btn-success mt-3 " id="button-input" onClick={insertArticle}>
            Insert
          </button>
        </div>
      )}
    </footer>
  );
}

export default From;
