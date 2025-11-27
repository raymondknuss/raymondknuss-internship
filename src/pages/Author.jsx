import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Countdown from "../components/common/Countdown";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  console.log("AUTHOR ID FROM URL:", id);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        const data = await res.json();

        console.log("AUTHOR API RESULT:", data);

        setAuthor(data);
      } catch (err) {
        console.error("Error fetching author:", err);
        setAuthor(null);
      }

      setLoading(false);
    };

    if (id) {
      fetchAuthor();
    }

    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="container">
          <h2>Loading author...</h2>
        </div>
      </section>
    );
  }

  if (!author) {
    return (
      <section>
        <div className="container">
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

        {/* AUTHOR HEADER */}
        <div className="row">
          <div className="col-md-3 text-center">
            <img
              src={author.authorImage}
              alt={author.authorName}
              className="img-fluid img-rounded mb-3"
            />
          </div>

          <div className="col-md-9">
            <h2>{author.authorName}</h2>
            <p>@{author.tag}</p>

            {/* ✅ API uses "address" for the wallet */}
            <p>Wallet: {author.address}</p>

            <h4>Followers: {author.followers}</h4>

            <button onClick={handleFollow} className="btn-main">
              {followed ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>

        <div className="spacer-40"></div>
        <h3>Their NFTs</h3>

        {/* NFT COLLECTION */}
        <div className="row">
          {author.nftCollection && author.nftCollection.length > 0 ? (
            author.nftCollection.map((nft) => (
              <div
                key={nft.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <div className="nft__item">

                  {/* Author Bubble */}
                  <div className="author_list_pp">
                    <Link to={`/author/${id}`}>
                      <img className="lazy" src={nft.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {/* Countdown */}
                  <Countdown expiryDate={nft.expiryDate} />

                  {/* NFT Image */}
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${nft.id}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.id}`}>
                      <h4>{nft.title}</h4>
                    </Link>

                    <div className="nft__item_price">{nft.price} ETH</div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No NFTs found.</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Author;
