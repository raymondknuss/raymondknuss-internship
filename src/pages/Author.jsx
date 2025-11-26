import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Countdown from "../components/common/Countdown";

import authorsData from "../data/authors.json";

const normalizeAuthor = (raw) => {
  if (!raw) return null;

  return {
    id: raw.id,   
    authorId: raw.authorId, 

    authorName: raw.authorName,
    authorImage: raw.authorImage,
    tag: raw.tag,
    address: raw.address,
    followers: raw.followers,

    nftCollection: Array.isArray(raw.nftCollection)
      ? raw.nftCollection.map((nft) => ({
          nftId: nft.nftId,
          title: nft.title,
          nftImage: nft.nftImage,
          price: nft.price,
          likes: nft.likes,
          expiryDate: nft.expiryDate ?? null,

          authorId: raw.authorId,
          authorImage: raw.authorImage,
          authorName: raw.authorName,
        }))
      : [],
  };
};

const Author = () => {
  const { id } = useParams(); 
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const loadAuthor = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        if (!res.ok) throw new Error("API unreachable");

        const apiAuthor = await res.json();
        setAuthor(normalizeAuthor(apiAuthor));
      } catch (err) {
        console.warn("Using local authors.json fallback:", err);

        const local = authorsData.find(
          (a) => a.id.toString() === id.toString()
        );

        setAuthor(local ? normalizeAuthor(local) : null);
      }

      setLoading(false);
    };

    loadAuthor();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="container py-5">
          <h2>Loading author...</h2>
        </div>
      </section>
    );
  }

  if (!author) {
    return (
      <section>
        <div className="container py-5">
          <h2>Author not found.</h2>
        </div>
      </section>
    );
  }

  const handleFollow = () => {
    setFollowed((prev) => !prev);
    setAuthor((prev) => ({
      ...prev,
      followers: prev.followers + (followed ? -1 : 1),
    }));
  };

  return (
    <section id="author-page">
      <div className="container">

        {/* HEADER */}
        <div className="row align-items-center mb-5">
          <div className="col-md-3 text-center">
            <img
              src={author.authorImage}
              alt={author.authorName}
              className="img-fluid rounded-circle shadow"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "4px solid white",
              }}
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold">{author.authorName}</h2>
            <p className="text-muted">@{author.tag}</p>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span
                className="px-3 py-1 bg-light rounded-pill text-muted"
                style={{
                  fontSize: "0.9rem",
                  maxWidth: "280px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {author.address}
              </span>

              <button className="btn btn-sm btn-outline-secondary">
                Copy
              </button>
            </div>
          </div>

          <div className="col-md-3 text-md-end text-center mt-4 mt-md-0">
            <div className="fw-bold mb-2">
              {author.followers} followers
            </div>

            <button className="btn-main" onClick={handleFollow}>
              {followed ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        {/* NFT GRID */}
        <h3 className="fw-bold mb-4">Their NFTs</h3>

        <div className="row g-4">
          {author.nftCollection.map((nft) => (
            <div key={nft.nftId} className="col-lg-3 col-md-4 col-sm-6 d-flex">
              <div className="rounded bg-white shadow-sm p-3 position-relative w-100">

                {/* AUTHOR BADGE */}
                <Link
                  to={`/author/${author.id}`}
                  className="position-absolute"
                  style={{ top: "10px", left: "10px", zIndex: 2 }}
                >
                  <img
                    src={nft.authorImage}
                    alt={nft.authorName}
                    width="45"
                    height="45"
                    className="rounded-circle shadow"
                    style={{ border: "2px solid white" }}
                  />
                </Link>

                {/* COUNTDOWN */}
                {nft.expiryDate && (
                  <div
                    className="position-absolute bg-white px-2 py-1 rounded-pill shadow-sm"
                    style={{
                      top: "10px",
                      right: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <Countdown expiryDate={nft.expiryDate} />
                  </div>
                )}

                {/* IMAGE */}
                <Link to={`/item-details/${nft.nftId}`}>
                  <img
                    src={nft.nftImage}
                    alt={nft.title}
                    className="img-fluid rounded mb-3"
                  />
                </Link>

                {/* TITLE */}
                <Link
                  to={`/item-details/${nft.nftId}`}
                  className="text-decoration-none"
                >
                  <h5 className="fw-bold mb-2" style={{ color: "#000" }}>
                    {nft.title}
                  </h5>
                </Link>

                {/* PRICE & LIKES */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold">{nft.price} ETH</div>
                  <div
                    className="text-muted d-flex align-items-center"
                    style={{ gap: "6px" }}
                  >
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Author;
