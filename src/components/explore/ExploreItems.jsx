import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Countdown from "../common/Countdown";
import itemsData from "../../data/itemDetails.json";
import authors from "../../data/authors.json";

const ExploreItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(itemsData);
  }, []);

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Explore Items</h2>

      <div className="row g-4">
        {items.map((item) => {
          const creator = authors.find(
            (auth) => auth.authorId === item.creatorId
          );

          return (
            <div
              key={item.nftId}
              className="col-lg-3 col-md-4 col-sm-6 d-flex"
            >
              <div
                className="rounded shadow-sm bg-white position-relative w-100 p-3"
                style={{ transition: "0.3s", cursor: "pointer" }}
              >
                {/* CREATOR BADGE */}
                {creator && (
                  <Link
                    to={`/author/${creator.authorId}`}
                    className="position-absolute"
                    style={{
                      top: "10px",
                      left: "10px",
                      zIndex: 2
                    }}
                  >
                    <img
                      src={creator.authorImage}
                      alt={creator.authorName}
                      width="45"
                      height="45"
                      className="rounded-circle shadow"
                      style={{ border: "2px solid white" }}
                    />
                  </Link>
                )}

                {/* COUNTDOWN */}
                {item.expiryDate && (
                  <div
                    className="position-absolute bg-white px-2 py-1 rounded-pill shadow-sm"
                    style={{
                      top: "10px",
                      right: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600
                    }}
                  >
                    <Countdown expiryDate={item.expiryDate} />
                  </div>
                )}

                {/* NFT IMAGE */}
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "auto", marginBottom: "15px" }}
                  />
                </Link>

                {/* TITLE */}
                <Link
                  to={`/item-details/${item.nftId}`}
                  className="text-decoration-none"
                >
                  <h5 className="fw-bold mb-2" style={{ color: "#000" }}>
                    {item.title}
                  </h5>
                </Link>

                {/* PRICE + LIKES */}
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="fw-bold"
                    style={{ fontSize: "0.95rem", color: "#000" }}
                  >
                    {item.price} ETH
                  </div>

                  <div
                    className="text-muted d-flex align-items-center"
                    style={{ fontSize: "0.9rem", gap: "6px" }}
                  >
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreItems;
