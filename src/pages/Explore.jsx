import React, { useEffect } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div id="content" className="no-bottom no-top">
        <div id="top"></div>

        {/* SUBHEADER */}
        <section
          id="subheader"
          className="text-light"
          style={{
            background: `url("${SubHeader}") top`,
            backgroundSize: "cover",
          }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE ITEMS */}
        <section aria-label="section">
          <ExploreItems />
        </section>
      </div>
    </div>
  );
};

export default Explore;
