import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import authors from "../../data/authors.json";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        const normalized = data.map((item) => ({
          ...item,

          nftId: item.nftId ?? item.id,

          ownerId: item.authorId ?? item.ownerId ?? null,
          creatorId: item.creatorId ?? null,

          code: item.code ? `ERC-${item.code}` : null
        }));

        setCollections(normalized);
      } catch (err) {
        console.error("Error loading HotCollections:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  return (
    <section className="no-bottom" id="section-collections">
      <div className="container">
        <div className="row">

          {/* TITLE */}
          <div className="col-lg-12 text-center mb-3">
            <h2>Hot Collections</h2>
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
                {collections.map((item) => {
                  const owner = authors.find(
                    (auth) => auth.authorId === item.ownerId
                  );

                  return (
                    <SwiperSlide key={item.nftId}>
                      <div
                        className="rounded bg-white shadow-sm p-3 text-center"
                        style={{ cursor: "pointer" }}
                      >
                        {/* NFT IMAGE */}
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            alt={item.title}
                            className="img-fluid rounded mb-3"
                            style={{ width: "100%" }}
                          />
                        </Link>

                        {/* TITLE */}
                        <Link
                          to={`/item-details/${item.nftId}`}
                          className="text-decoration-none"
                        >
                          <h5 className="fw-bold mb-1" style={{ color: "#000" }}>
                            {item.title}
                          </h5>
                        </Link>

                        {/* ERC */}
                        <div
                          className="text-muted mb-3"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {item.code}
                        </div>

                        {/* OWNER BADGE */}
                        <div className="d-flex justify-content-center">
                          {owner && (
                            <Link to={`/author/${owner.authorId}`}>
                              <img
                                src={owner.authorImage}
                                alt={owner.authorName}
                                width="50"
                                height="50"
                                className="rounded-circle shadow"
                                style={{ border: "2px solid white" }}
                              />
                            </Link>
                          )}
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

export default HotCollections;
