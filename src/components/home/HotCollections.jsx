import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        console.log("HOT COLLECTION DATA:", data);
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching HotCollections:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = collections.map((item) => (
    <div className="nft_coll" key={item.id}>
      <div className="nft_wrap">
        <Link to={`/item-details/${item.nftId}`}>
          <img src={item.nftImage} className="lazy img-fluid" alt="" />
        </Link>
      </div>
      <div className="nft_coll_pp">
        <Link to={`/author/${item.authorId}`}>
          <img className="lazy pp-coll" src={item.authorImage} alt="" />
        </Link>
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info">
        <Link to="/explore">
          <h4>{item.title}</h4>
        </Link>
        <span>ERC-{item.code}</span>
      </div>
    </div>
  ));

  const skeletons = new Array(4).fill(0).map((_, index) => (
    <div className="nft_coll" key={index}>
      <div className="nft_wrap skeleton-box"></div>

      <div className="nft_coll_pp">
        <div className="lazy pp-coll skeleton-box" />
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <h4 className="skeleton-box skeleton-text"></h4>
        <span className="skeleton-box skeleton-text small"></span>
      </div>
    </div>
  ));

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

export default HotCollections;
