import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../common/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchData = async (filterValue = "") => {
    try {
      setLoading(true);

      const baseUrl =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const url = filterValue ? `${baseUrl}?filter=${filterValue}` : baseUrl;

      const res = await fetch(url);
      const data = await res.json();

      setItems(data);
      setVisible(8);
    } catch (err) {
      console.error("Error fetching Explore items:", err);
    } finally {
      setLoading(false);
    }
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

  const skeletons = new Array(8).fill(0).map((_, index) => (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
      key={index}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <div className="lazy skeleton-box pp-coll" />
        </div>

        <div className="nft__item_wrap">
          <div className="skeleton-box nft__item_preview" />
        </div>

        <div className="nft__item_info">
          <h4 className="skeleton-box skeleton-text"></h4>
          <div className="nft__item_price skeleton-box skeleton-text small"></div>
          <div className="nft__item_like skeleton-box skeleton-text small"></div>
        </div>
      </div>
    </div>
  ));

  const renderCard = (item) => (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
      key={item.id}
    >
      <div
        className="nft__item"
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          className="author_list_pp"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 5,
          }}
        >
          <Link to={`/author/${item.authorId}`}>
            <img
              className="lazy"
              src={item.authorImage}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "3px solid #fff",
              }}
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        <div
          className="nft__item_wrap"
          style={{
            position: "relative",
            padding: "0",
            marginBottom: "15px",
          }}
        >
          <Link to={`/item-details?nftId=${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px 12px 0 0",
              }}
            />
          </Link>

          {item.expiryDate && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#ffffff",
                border: "2px solid #8358ff",
                borderRadius: "50px",
                padding: "4px 14px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#000",
                zIndex: 10,
              }}
            >
              <Countdown expiryDate={item.expiryDate} />
            </div>
          )}
        </div>

        <div className="nft__item_info" style={{ padding: "10px 5px 20px" }}>
          <Link to={`/item-details?nftId=${item.nftId}`}>
            <h4
              style={{
                margin: "0 0 10px",
                fontWeight: "600",
              }}
            >
              {item.title}
            </h4>
          </Link>

          <div
            className="nft__item_price"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              marginBottom: "6px",
            }}
          >
            <span>{item.price} ETH</span>

            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span style={{ marginLeft: "5px" }}>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-explore">
      <div className="container">
        <div className="row">
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

          <div className="col-md-12">
            <div className="row">
              {loading
                ? skeletons
                : items.slice(0, visible).map((item) => renderCard(item))}
            </div>
          </div>

          {!loading && visible < items.length && (
            <div
              className="col-md-12 text-center mt-4"
              data-aos="fade-up"
            >
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
