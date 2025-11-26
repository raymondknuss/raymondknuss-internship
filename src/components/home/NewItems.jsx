import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "../common/Countdown";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import authors from "../../data/authors.json";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const normalized = data.map((item) => ({
          ...item,

          nftId: item.nftId ?? item.id,
          ownerId: item.ownerId ?? item.authorId ?? null,
          creatorId: item.creatorId ?? null,
          expiryDate: item.expiryDate ?? null,
        }));

        setItems(normalized);
      } catch (err) {
        console.error("Error loading new items:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNewItems();
  }, []);

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">

          {/* HEADER */}
          <div className="col-lg-12 text-center mb-3">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {loading ? (
            <div className="col-12"><p>Loading...</p></div>
          ) : (
            <div className="col-12">

              <Swiper
                modules={[Navigation]}
                navigation
                loop={true}
                speed={600}
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  568: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {items.map((item) => {

                  const owner = authors.find(
                    (auth) => auth.authorId === item.ownerId
                  );

                  return (
                    <SwiperSlide key={item.nftId}>
                      <div
                        className="rounded bg-white shadow-sm p-3 position-relative"
                        style={{ cursor: "pointer" }}
                      >

                        {/* AUTHOR BADGE */}
                        {owner && (
                          <Link
                            to={`/author/${owner.authorId}`}
                            className="position-absolute"
                            style={{
                              top: "10px",
                              left: "10px",
                              zIndex: 2,
                            }}
                          >
                            <img
                              src={owner.authorImage}
                              alt={owner.authorName}
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
                              fontWeight: 600,
                            }}
                          >
                            <Countdown expiryDate={item.expiryDate} />
                          </div>
                        )}

                        {/* IMAGE */}
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            alt={item.title}
                            className="img-fluid rounded mb-3"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
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
                    </SwiperSlide>
                  );
                })}
              </Swiper>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default NewItems;
