import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        console.log("TOP SELLERS DATA:", data);
        setSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Top Sellers:", error);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const skeletons = new Array(12).fill(0).map((_, index) => (
    <li key={index}>
      <div className="author_list_pp">
        <div className=" skeleton-box pp-author"></div>
      </div>
      <div className="author_list_info">
        <div className="skeleton-box skeleton-text" style={{ width: "80px" }} />
        <div className="skeleton-box skeleton-text small" style={{ width: "50px" }} />
      </div>
    </li>
  ));

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          {/* Section header */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* List */}
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? skeletons
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className=" pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
