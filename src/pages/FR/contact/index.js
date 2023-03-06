import React, { useState, useEffect } from "react";
import { navigate } from "gatsby-link";
import { renderToStaticMarkup } from 'react-dom/server';

import Collapse from '@material-ui/core/Collapse';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import 'leaflet/dist/leaflet.css';
import '../../contact.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from "leaflet";

import Layout from "../../../components/Layout/Layout";
import instagram from "../../../img/social/instagram-b.svg";
import facebook from "../../../img/social/facebook-b.svg";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
  const [formComplete, setFormComplete] = React.useState(false);
  const [sendSuccess, setSendSuccess] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);
  const formIsValid = contactForm.name.length > 0 && contactForm.email.length > 0 && contactForm.message.length > 0;
  
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

    if (formIsValid) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...contactForm,
        }),
      })
      .then((e) => e.ok === true ? setSendSuccess(true) : setSendError(true))
      .catch((error) => alert(error));      
    } else {
      setFormComplete(true);
    }
  };

  return (
    <Layout>
      <div className="contact page-body">
        <section>
          <h1>Venir à la Chaumière</h1>
          <span>2630 Rte du Pécanier, 24510 Val de Louyre et Caudeau</span>
          { map }          
        </section>
        <section>
          <h1>Contactez nous</h1>
          <div className="contact-item-list">
            <div className="contact-item">
              <CallIcon />
              33 07 48 11 01 39
            </div>
            <div className="contact-item">
              <img
                src={facebook}
                alt="Facebook"
                className="social-icon"
              />
              facebook
            </div>
            <div className="contact-item">
              <img
                src={instagram}
                alt="Instagram"
                className="social-icon"
              />
              instagram
            </div>
          </div>
          <div className="contact-form-container">
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
                    onChange={() => setContactForm({...contactForm})}
                  />
                </label>
              </div>
              <div>
                <label htmlFor={"name"} hidden>
                  Nom
                </label>
                <div>
                  {/* <input
                    type={"text"}
                    name={"name"}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    id={"name"}
                    required={true}
                  /> */}
                  <TextField
                    type={"text"}
                    name={"name"}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    id={"name"}
                    label="Votre nom"
                    multiline
                  />
                </div>
              </div>
              <div>
                <label htmlFor={"email"} hidden>
                  Email
                </label>
                <div>
                  {/* <input
                    type={"email"}
                    name={"email"}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    id={"email"}
                    required={true}
                  /> */}
                  <TextField
                    type={"text"}
                    name={"email"}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    id={"email"}
                    label="Email"
                    multiline
                  />
                </div>
              </div>
              <div>
                <label htmlFor={"message"} hidden>
                  Message
                </label>
                <div>
                  {/* <textarea
                    name={"message"}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    id={"message"}
                    required={true}
                  /> */}
                  <TextField
                    type={"text"}
                    name={"message"}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    id={"message"}                    
                    label="Message"
                    multiline
                    rows={6}
                  />
                </div>
              </div>
              <div>
                <Button variant="outlined" className="button is-link" type="submit">
                  Envoyer
                </Button>
              </div>
            </form>
            <Collapse in={sendSuccess}>
              <Alert
                severity="success"
                action={
                  (
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSendSuccess(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )
                }
              >
                Message envoyé !
              </Alert>
            </Collapse>
            <Collapse in={formComplete}>
              <Alert
                severity="error"
                action={
                  (
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setFormComplete(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )
                }
              >
                Tous les champs doivent être complétés
              </Alert>
            </Collapse>
            <Collapse in={sendError}>
              <Alert
                severity="error"
                action={
                  (
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSendError(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )
                }
              >
                Une erreur est survenue lors de l'envoi du message. En cas de problème n'hésitez pas à nous contacter par téléphone.
              </Alert>
            </Collapse>
          </div>
        </section>
      </div>

    </Layout>
  );
}

export default Index;
