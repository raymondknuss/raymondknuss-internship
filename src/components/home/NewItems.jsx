import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "../common/Countdown";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const normalized = data.map((item) => ({
          ...item,
          nftId: item.nftId ?? item.id,
          authorImage: item.authorImage,
          nftImage: item.nftImage,
          expiryDate: item.expiryDate ?? null,
          price: item.price ?? item.currentPrice ?? 0,
          likes: item.likes ?? 0
        }));

        setItems(normalized);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">

          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
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
                {items.map((item) => (
                  <SwiperSlide key={item.nftId}>
                    <div className="nft__item">

                      {item.expiryDate && (
                        <Countdown expiryDate={item.expiryDate} />
                      )}

                      <div className="nft__item_wrap">
                        <Link to={`/item-details?nftId=${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details?nftId=${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>

                        <div className="nft__item_price">
                          {item.price} ETH
                        </div>

                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>

                      <div className="nft__item_author">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="author_thumb"
                            src={item.authorImage}
                            alt="author"
                          />
                        </Link>
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

export default NewItems;
