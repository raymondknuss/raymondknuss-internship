import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Countdown from "../components/common/Countdown";
import bannerImage from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        console.error("Error fetching author:", err);
        setAuthor(null);
      }
      setLoading(false);
    };

    fetchAuthor();
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopy = () => {
    if (author?.address) navigator.clipboard.writeText(author.address);
  };

  const handleFollow = () => {
    setFollowed((prev) => !prev);
    setAuthor((prev) => ({
      ...prev,
      followers: prev.followers + (followed ? -1 : 1),
    }));
  };

  if (loading) {
    return (
      <section aria-label="section">
        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "#eee",
          }}
        ></div>

        <div className="container">
          <div className="spacer-single"></div>

          <h3 style={{ marginTop: "40px" }}>Their NFTs</h3>

          <div className="row">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ marginBottom: "30px" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      className="skeleton"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>

                  <div className="nft__item_wrap">
                    <div
                      className="skeleton"
                      style={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "10px",
                      }}
                    ></div>
                  </div>

                  <div className="nft__item_info">
                    <div
                      className="skeleton"
                      style={{
                        width: "70%",
                        height: "20px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{
                        width: "40%",
                        height: "20px",
                        marginTop: "10px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!author) {
    return (
      <section aria-label="section">
        <div className="container">
          <h2>Author not found.</h2>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="section">
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container">
        <div className="spacer-single"></div>

        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src={author.authorImage} alt={author.authorName} />
                  <i className="fa fa-check"></i>

                  <div className="profile_name">
                    <h4>
                      {author.authorName}
                      <span className="profile_username">@{author.tag}</span>
                      <span id="wallet" className="profile_wallet">
                        {author.address}
                      </span>
                      <button
                        id="btn_copy"
                        title="Copy Text"
                        onClick={handleCopy}
                      >
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">
                    {author.followers} followers
                  </div>

                  <button
                    className="btn-main"
                    onClick={handleFollow}
                    style={{ cursor: "pointer" }}
                  >
                    {followed ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="de_tab tab_simple">
          <div className="de_tab_content">
            <div className="tab-1">
              <div className="row">
                {author.nftCollection.map((nft) => (
                  <div
                    key={nft.id}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to={`/author/${id}`}>
                          <img
                            className="lazy"
                            src={author.authorImage}
                            alt={author.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="nft__item_wrap">
                        <Link to={`/item-details?nftId=${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details?nftId=${nft.nftId}`}>
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
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Author;
