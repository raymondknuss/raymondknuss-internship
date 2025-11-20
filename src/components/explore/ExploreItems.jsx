import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setItems(data);
      } catch (error) {
        console.error("Error fetching Explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Explore Items</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">

              <div className="nft__item">

                <div className="nft__item_wrap">
                  {/* Corrected property → nftId */}
                  <Link to={`/item-details?nftId=${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      className="lazy nft__item_preview"
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  {/* Corrected property → nftId */}
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

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExploreItems;
