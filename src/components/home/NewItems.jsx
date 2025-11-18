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
        console.log("NEW ITEMS DATA:", data);
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching New Items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const items = newItems.map((item) => {
    return (
      <div className="nft__item" key={item.id}>
        <div className="author_list_pp">
          <Link to={`/author/${item.authorId}`}>
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        <Countdown expiryDate={item.expiryDate} />

        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId}`}>
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">{item.price} ETH</div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    );
  });

  const skeletons = new Array(4).fill(0).map((_, index) => (
    <div className="nft__item" key={index}>
      <div className="author_list_pp">
        <div className="lazy skeleton-box pp-coll" />
      </div>

      <div className="de_countdown skeleton-box skeleton-text small" />

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
          {/* Section title */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="col-12">
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
            </div>
          ) : (
            <div className="col-12">
              <AliceCarousel
                mouseTracking
                infinite
                items={items}
                disableDotsControls
                slideBy={1}
                responsive={{
                  0: { items: 1 },
                  568: { items: 2 },
                  1024: { items: 4 },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
