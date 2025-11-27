import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Countdown from "../common/Countdown";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
      } catch (error) {
        console.error("Error fetching NewItems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const items = newItems.map((item) => (
    <div
      className="nft__item"
      key={item.id}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Author Avatar */}
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

      {/* NFT Image + Countdown Bubble */}
      <div
        className="nft__item_wrap"
        style={{
          position: "relative",
          padding: "0",
          marginBottom: "15px",
        }}
      >
        <Link to={`/item-details/${item.nftId}`}>
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

        {/* Countdown Build */}
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

      {/* Title + Price + Likes */}
      <div className="nft__item_info" style={{ padding: "10px 5px 20px" }}>
        <Link to={`/item-details/${item.nftId}`}>
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
  ));

  const skeletons = new Array(7).fill(0).map((_, index) => (
    <div className="nft__item" key={index}>
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
  ));

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          {/* Section Title */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Content */}
          <div className="col-12 p-0" style={{ position: "relative" }}>
            {loading ? (
              <div className="row">
                {skeletons.map((skel, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    {skel}
                  </div>
                ))}
              </div>
            ) : (
              <AliceCarousel
                mouseTracking
                infinite
                disableDotsControls
                disableSlideInfo
                slideBy={1}
                responsive={{
                  0: { items: 1 },
                  568: { items: 2 },
                  1024: { items: 4 },
                }}
                items={items}
                renderPrevButton={() => (
                  <button
                    style={{
                      position: "absolute",
                      left: "-25px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#fff",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                      cursor: "pointer",
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    ‹
                  </button>
                )}
                renderNextButton={() => (
                  <button
                    style={{
                      position: "absolute",
                      right: "-25px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#fff",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                      cursor: "pointer",
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    ›
                  </button>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
