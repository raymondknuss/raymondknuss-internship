import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ethIcon from "../images/ethereum.svg";

const ITEM_DETAILS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const Skeleton = () => {
  return (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <div
              className="bg-light rounded mb-sm-30"
              style={{ width: "100%", height: "500px", opacity: 0.6 }}
            />
          </div>

          <div className="col-md-6">
            <div className="item_info">
              <div
                className="bg-light rounded mb-3"
                style={{ width: "60%", height: "32px", opacity: 0.6 }}
              />
              <div className="d-flex mb-4" style={{ gap: "10px" }}>
                <div
                  className="bg-light rounded-pill"
                  style={{ width: "90px", height: "32px", opacity: 0.6 }}
                />
                <div
                  className="bg-light rounded-pill"
                  style={{ width: "90px", height: "32px", opacity: 0.6 }}
                />
              </div>

              <div
                className="bg-light rounded mb-2"
                style={{ width: "100%", height: "14px", opacity: 0.6 }}
              />
              <div
                className="bg-light rounded mb-2"
                style={{ width: "90%", height: "14px", opacity: 0.6 }}
              />
              <div
                className="bg-light rounded mb-4"
                style={{ width: "80%", height: "14px", opacity: 0.6 }}
              />

              <div className="d-flex flex-row mb-4">
                <div className="mr40">
                  <div
                    className="bg-light rounded mb-2"
                    style={{ width: "70px", height: "16px", opacity: 0.6 }}
                  />
                  <div className="item_author d-flex align-items-center">
                    <div
                      className="bg-light rounded-circle"
                      style={{ width: "48px", height: "48px", opacity: 0.6 }}
                    />
                    <div
                      className="bg-light rounded ms-3"
                      style={{ width: "120px", height: "18px", opacity: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              <div className="spacer-40" />

              <div
                className="bg-light rounded mb-2"
                style={{ width: "70px", height: "16px", opacity: 0.6 }}
              />
              <div className="item_author d-flex align-items-center mb-4">
                <div
                  className="bg-light rounded-circle"
                  style={{ width: "48px", height: "48px", opacity: 0.6 }}
                />
                <div
                  className="bg-light rounded ms-3"
                  style={{ width: "120px", height: "18px", opacity: 0.6 }}
                />
              </div>

              <div className="spacer-40" />

              <div
                className="bg-light rounded mb-2"
                style={{ width: "60px", height: "16px", opacity: 0.6 }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "150px", height: "40px", opacity: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ItemDetails = () => {
  const [searchParams] = useSearchParams();
  const nftId = searchParams.get("nftId");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!nftId) {
      setLoading(false);
      setError("Missing nftId in URL.");
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        const response = await fetch(
          `${ITEM_DETAILS_ENDPOINT}?nftId=${encodeURIComponent(nftId)}`
        );

        if (!response.ok) {
          if (!cancelled) setNotFound(true);
          return;
        }

        const text = await response.text();

        if (!text || text.trim() === "") {
          if (!cancelled) setNotFound(true);
          return;
        }

        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch {
          if (!cancelled) setNotFound(true);
          return;
        }

        if (!parsed || Object.keys(parsed).length === 0) {
          if (!cancelled) setNotFound(true);
          return;
        }

        if (!cancelled) setItem(parsed);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Error fetching item details.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [nftId]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <section className="container py-5">
        <h2>Item not available</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (notFound || !item) {
    return (
      <section className="container py-5">
        <h2>Item not found</h2>
        <p>We couldn't load this NFT.</p>
      </section>
    );
  }

  const {
    title,
    tag,
    description,
    nftImg,
    nftImage,
    image,
    ownerName,
    ownerId,
    ownerImage,
    creatorName,
    creatorId,
    creatorImage,
    price,
    likes,
    views,
  } = item;

  const displayImage = nftImg || nftImage || image;

  return (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={displayImage}
              alt={title}
              className="img-fluid img-rounded mb-sm-30 nft-image"
            />
          </div>

          <div className="col-md-6">
            <div className="item_info">
              <h2>
                {title} {tag && `#${tag}`}
              </h2>

              <div className="item_info_counts">
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {likes}
                </div>
              </div>

              <p>{description}</p>

              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${ownerId}`}>
                        <img
                          className="lazy"
                          src={ownerImage}
                          alt={ownerName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${ownerId}`}>{ownerName}</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spacer-40"></div>

              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Link to={`/author/${creatorId}`}>
                    <img
                      className="lazy"
                      src={creatorImage}
                      alt={creatorName}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to={`/author/${creatorId}`}>{creatorName}</Link>
                </div>
              </div>

              <div className="spacer-40"></div>

              <h6>Price</h6>
              <div className="nft-item-price">
                <img src={ethIcon} alt="ETH" />
                <span>{price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
