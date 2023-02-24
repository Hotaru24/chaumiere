import * as React from "react";

import FullWidthImage from "../../../components/FullWidthImage";

import Layout from "../../../components/Layout/Layout";
import RoomsRoll from "../../../components/RoomsRoll";

const RoomsIndexPage = () => {
  const image =  {url: '/img/chambre5.jpg' };

  return (
    <Layout>
      <div style={{ backgroundImage: `url('/img/chambre5.jpg')` }}>
         <FullWidthImage
          img={image}
          title={ 'Nos gites & chambres' }
         />
      </div>
      <section className="page-body">
        <RoomsRoll />
      </section>
    </Layout>
  );
}

export default RoomsIndexPage;
