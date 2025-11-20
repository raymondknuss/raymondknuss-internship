import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const nftId = searchParams.get("nftId");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nftId) return;

    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        if (data) {
          setItem(data);
        }

      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  if (loading) {
    return (
      <section className="container py-5">
        <h2>Loading item details...</h2>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="container py-5">
        <h2>Item not found</h2>
        <p>The item you're looking for doesn't exist.</p>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src={item.nftImage}
            alt={item.title}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* INFO */}
        <div className="col-md-6">
          <h2>{item.title}</h2>
          <p className="text-muted">{item.description}</p>

          <ul className="list-unstyled">
            <li><strong>Price:</strong> {item.price} ETH</li>
            <li><strong>Likes:</strong> {item.likes}</li>
            <li><strong>Views:</strong> {item.views}</li>
            <li><strong>Category:</strong> {item.category}</li>
            <li>
              <strong>Tags:</strong> {item.tags?.join(", ")}
            </li>
            <li>
              <strong>Auction ends:</strong>{" "}
              {item.auctionEndsAt
                ? new Date(item.auctionEndsAt).toLocaleString()
                : "N/A"}
            </li>
          </ul>

          <div className="d-flex align-items-center mt-4">
            <img
              src={item.authorImage}
              alt={item.authorName}
              className="rounded-circle"
              width="50"
              height="50"
            />
            <span className="ms-3 fw-bold">{item.authorName}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ItemDetails;
