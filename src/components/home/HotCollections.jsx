import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        const normalized = data.map((item) => ({
          ...item,
          nftId: item.nftId ?? item.nftid ?? item.id,
          authorImage: item.authorImage,
          nftImage: item.nftImage,
          price: item.price ?? item.currentPrice ?? 0,
          title: item.title,
          code: item.code ?? 721
        }));

        setCollections(normalized);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching HotCollections:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">

          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
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
                  1024: { slidesPerView: 4 }
                }}
              >
                {collections.map((item) => (
                  <SwiperSlide key={item.nftId}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details?nftId=${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            alt={item.title}
                            className="lazy img-fluid"
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt="author"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to={`/item-details?nftId=${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
