import React from "react";
import { useParams, Link } from "react-router-dom";

import itemDetailsData from "../data/itemDetails.json";
import authors from "../data/authors.json";

const ItemDetails = () => {
  const { nftId } = useParams();

  const item = itemDetailsData.find(
    (entry) => String(entry.nftId) === String(nftId)
  );

  if (!item) {
    return (
      <section className="container py-5">
        <h2>Item not found</h2>
        <p>The item you're looking for doesn't exist.</p>
      </section>
    );
  }

  const owner = authors.find((auth) => auth.authorId === item.ownerId);
  const creator = authors.find((auth) => auth.authorId === item.creatorId);

  return (
    <section className="container py-5">
      <div className="row g-5 align-items-start">

        {/* IMAGE */}
        <div className="col-lg-7">
          <img
            src={item.nftImage}
            alt={item.title}
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-lg-5">

          {/* TITLE */}
          <h2 className="fw-bold mb-3">{item.title}</h2>

          {/* ERC CODE */}
          {item.code && (
            <div className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
              {item.code}
            </div>
          )}

          {/* VIEWS + LIKES */}
          <div className="d-flex align-items-center mb-4" style={{ gap: "15px" }}>
            <div className="px-3 py-1 bg-light rounded-pill d-flex align-items-center" style={{ gap: "6px", fontWeight: 500 }}>
              👁‍🗨 {item.views}
            </div>
            <div className="px-3 py-1 bg-light rounded-pill d-flex align-items-center" style={{ gap: "6px", fontWeight: 500 }}>
              ❤️ {item.likes}
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
            {item.description}
          </p>

          {/* OWNER */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2">Owner</h6>

            {owner ? (
              <Link
                to={`/author/${owner.authorId}`}
                className="d-flex align-items-center text-decoration-none"
              >
                <img
                  src={owner.authorImage}
                  alt={owner.authorName}
                  className="rounded-circle"
                  width="48"
                  height="48"
                />
                <div className="ms-3">
                  <span className="fw-bold text-dark">{owner.authorName}</span>
                </div>
              </Link>
            ) : item.ownerName ? (
              <div className="d-flex align-items-center">
                <img
                  src={item.ownerImage}
                  alt={item.ownerName}
                  className="rounded-circle"
                  width="48"
                  height="48"
                />
                <div className="ms-3">
                  <span className="fw-bold">{item.ownerName}</span>
                </div>
              </div>
            ) : (
              <div className="text-muted">Unknown Owner</div>
            )}
          </div>

          {/* CREATOR */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2">Creator</h6>

            {creator ? (
              <Link
                to={`/author/${creator.authorId}`}
                className="d-flex align-items-center text-decoration-none"
              >
                <img
                  src={creator.authorImage}
                  alt={creator.authorName}
                  className="rounded-circle"
                  width="48"
                  height="48"
                />
                <div className="ms-3">
                  <span className="fw-bold text-dark">{creator.authorName}</span>
                </div>
              </Link>
            ) : item.creatorName ? (
              <div className="d-flex align-items-center">
                <img
                  src={item.creatorImage}
                  alt={item.creatorName}
                  className="rounded-circle"
                  width="48"
                  height="48"
                />
                <div className="ms-3">
                  <span className="fw-bold">{item.creatorName}</span>
                </div>
              </div>
            ) : (
              <div className="text-muted">Unknown Creator</div>
            )}
          </div>

          {/* PRICE */}
          <div className="mt-4">
            <h6 className="fw-bold mb-2">Price</h6>
            <div
              className="d-flex align-items-center"
              style={{ fontSize: "1.8rem", fontWeight: 700 }}
            >
              <span style={{ marginRight: "8px" }}>💠</span>
              {item.price} ETH
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
