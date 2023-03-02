import React, { useState } from "react";
import { navigate } from "gatsby-link";
import { renderToStaticMarkup } from 'react-dom/server';

import '../../contact.css';

import Layout from "../../../components/Layout/Layout";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from "leaflet";
import 'leaflet/dist/leaflet.css';

import image from '../../../img/map.svg';



const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Index = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const iconMarkup = renderToStaticMarkup(
    <img src={image} alt='localisation' className="map-icon" />
  );
  
  const customMarkerIcon = divIcon({
    html: iconMarkup
  });

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
      <section className="section">
        <h1>Contact</h1>
        <MapContainer style={{width: "50%", height: "250px" }} center={[44.958450, 0.777649]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[44.958450, 0.777649]} icon={customMarkerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
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
    </Layout>
  );
}

export default Index;
