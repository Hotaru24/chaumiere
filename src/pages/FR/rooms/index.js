import * as React from "react";

import PageHeaderImage from "../../../components/PageHeaderImage";

import Layout from "../../../components/Layout/Layout";
import RoomsList from "../../../components/RoomsList/RoomsList";

const RoomsIndexPage = () => {
  const image =  {url: '/img/Chambre-gite-1-min.jpg' };

  return (
    <Layout>
      <div style={{ background: `url('/img/Chambre-gite-1.jpg')` }}>
         <PageHeaderImage
          img={image}
          title={ 'Nos gite & chambres' }
         />
      </div>
      <section className="page-body">
        <RoomsList />
      </section>
    </Layout>
  );
}

export default RoomsIndexPage;
