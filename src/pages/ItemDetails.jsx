import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Countdown from "../components/common/Countdown";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);

      const res = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?id=${id}`
      );
      const data = await res.json();

      console.log("ITEM DETAILS DATA:", data);

      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="container">
          <h2>Loading item...</h2>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section>
        <div className="container">
          <h2>Item not found.</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="item-details">
      <div className="container">
        <h2>{item.title}</h2>

        {/* Countdown */}
        <Countdown expiryDate={item.expiryDate} />

        <img
          src={item.nftImage}
          alt={item.title}
          style={{ maxWidth: "400px", marginTop: "20px" }}
        />

        <p>Price: {item.price} ETH</p>
        <p>Likes: {item.likes}</p>

        <h3>Author</h3>
        <p>{item.authorName}</p>

        <h3>Description</h3>
        <p>{item.description}</p>

        {/* You will later add:
            - Bids section
            - More styling
            - Buttons (Buy Now, Share, etc.)
        */}
      </div>
    </section>
  );
};

export default ItemDetails;
