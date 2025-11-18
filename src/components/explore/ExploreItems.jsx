import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../common/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchData = async (filterValue = "") => {
    setLoading(true);

    const baseUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    const url = filterValue
      ? `${baseUrl}?filter=${filterValue}`
      : baseUrl;

    const res = await fetch(url);
    const data = await res.json();

    console.log("EXPLORE DATA:", data);
    setItems(data);
    setVisible(8);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    fetchData(value);
  };

  const loadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const skeletons = new Array(8).fill(0).map((_, i) => (
    <div
      key={i}
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block" }}
    >
      <div className="nft__item skeleton-loading">
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  ));

  return (
    <section id="section-explore">
      <div className="container">
        <div className="row">

          {/* Filter Dropdown */}
          <div className="col-md-12 mb-4">
            <select
              id="filter-items"
              value={filter}
              onChange={handleFilter}
            >
              <option value="">Default</option>
              <option value="price_low_to_high">Price, Low to High</option>
              <option value="price_high_to_low">Price, High to Low</option>
              <option value="likes_high_to_low">Most liked</option>
            </select>
          </div>

          {/* Items */}
{/* Items */}
<div className="col-md-12">
  <div className="row">
    {loading
      ? skeletons
      : items.slice(0, visible).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block" }}
          >
            <div className="nft__item">

              {/* Author */}
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {/* Countdown */}
              <Countdown expiryDate={item.expiryDate} />

              {/* Item Image */}
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.id}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>

              {/* Info */}
              <div className="nft__item_info">
                <Link to={`/item-details/${item.id}`}>
                  <h4>{item.title}</h4>
                </Link>

                <div className="nft__item_price">{item.price} ETH</div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
  </div>
</div>


          {/* Load More Button */}
          {visible < items.length && (
            <div className="col-md-12 text-center mt-4">
              <button className="btn-main lead" onClick={loadMore}>
                Load more
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ExploreItems;
