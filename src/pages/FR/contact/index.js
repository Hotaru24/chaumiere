import React, { useState, useEffect } from "react";
import { navigate } from "gatsby-link";
import { renderToStaticMarkup } from 'react-dom/server';

import 'leaflet/dist/leaflet.css';
import '../../contact.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from "leaflet";

import Layout from "../../../components/Layout/Layout";
import instagram from "../../../img/social/instagram-b.svg";
import facebook from "../../../img/social/facebook-b.svg";
import CallIcon from '@mui/icons-material/Call';
import image from '../../../img/map.svg';




const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Index = () => {  
  const [map, setMap] = useState(<></>);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const iconMarkup = renderToStaticMarkup(
        <img src={image} alt='localisation' className="map-icon" />
      );
      
      const customMarkerIcon = new L.DivIcon({
        html: iconMarkup
      });

      setMap(
        <MapContainer style={{width: "50%", height: "250px" }} center={[44.958450, 0.777649]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[44.958450, 0.777649]} icon={customMarkerIcon}>
            <Popup>
              La Chaumière - 2630 Rte du Pécanier, 24510 Val de Louyre et Caudeau
            </Popup>
          </Marker>
        </MapContainer>
      )
    }  
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...contactForm,
      }),
    })
    .then(() => navigate(form.getAttribute('action')))
    .catch((error) => alert(error));
  };

  return (
    <Layout>
      <div className="page-body">
        <section>
          <h1>Venir à la Chaumière</h1>
          <span>2630 Rte du Pécanier, 24510 Val de Louyre et Caudeau</span>
          { map }          
        </section>
        <section>
          <h1>Contactez nous</h1>
          <div>
            <span> <CallIcon /> 33 07 48 11 01 39</span>
            <span>
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              facebook
            </span>
            <span>
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              instagram
            </span>
          </div>
          <form
            name="contact"
            method="post"
            action="/FR/contact/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{" "}
                <input
                  name="bot-field"
                  onChange={(e) => setContactForm({...contactForm})}
                />
              </label>
            </div>
            <div>
              <label htmlFor={"name"}>
                Votre nom
              </label>
              <div>
                <input
                  type={"text"}
                  name={"name"}
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  id={"name"}
                  required={true}
                />
              </div>
            </div>
            <div>
              <label htmlFor={"email"}>
                Email
              </label>
              <div>
                <input
                  type={"email"}
                  name={"email"}
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  id={"email"}
                  required={true}
                />
              </div>
            </div>
            <div>
              <label htmlFor={"message"}>
                Message
              </label>
              <div>
                <textarea
                  name={"message"}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  id={"message"}
                  required={true}
                />
              </div>
            </div>
            <div>
              <button className="button is-link" type="submit">
                Envoyer
              </button>
            </div>
          </form>
        </section>
      </div>

    </Layout>
  );
}

export default Index;
