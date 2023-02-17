import * as React from "react";

import FullWidthImage from "../../../components/FullWidthImage";

import Layout from "../../../components/Layout/Layout";
import RoomsRoll from "../../../components/RoomsRoll";

const RoomsIndexPage = () => {
  const image =  {url: '/img/chambre5.jpg' };

  return (
    <Layout>
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url('/img/chambre5.jpg')`,
        }}
      >
         <FullWidthImage img={image} title={'Nos gites & chambres'} />
      </div>
      <section className="section">
        <div className="container">
          <div className="content">
            <RoomsRoll />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default RoomsIndexPage;
