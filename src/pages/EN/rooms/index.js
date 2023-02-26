import * as React from "react";

import FullWidthImage from "../../../components/FullWidthImage";

import Layout from "../../../components/Layout/Layout";
import RoomsRoll from "../../../components/RoomsRoll";

const RoomsIndexPage = () => {
  const image =  {url: '/img/Chambre-gite-1.jpg' };

  return (
    <Layout>
      <div style={{ background: `url('/img/Chambre-gite-1.jpg')` }}>
         <FullWidthImage img={image} title={'Accommodation'} />
      </div>
      <section className="page-body">
        <RoomsRoll />
      </section>
    </Layout>
  );
}

export default RoomsIndexPage;
