import React, {useEffect, useState} from "react";
import { graphql, navigate } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

import Layout from "../components/Layout/Layout";
import './prices.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


// eslint-disable-next-line
export const PricesPageTemplate = ({
  title,
  description,
  image,
  rows,
  nightCols,
  weekCols,
  romance,
  reverie,
  songe,
  cocon
}) => {
  const [locale, setLocale] = useState('FR');
  const bgImage = getImage(image) || image;

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
    
  }, []);

  const createData = (type, name, night, week) => {
    return { type, name, night, week };
  }

  const tableRows = [
    createData(rows.room, 'Romance', romance.night, romance.week),
    createData(rows.room, 'Reverie', reverie.night, reverie.week),
    createData(rows.room, 'Songe', songe.night, songe.week),
    createData(rows.cottage, 'Cocon', cocon.night, cocon.week)
  ];

  return (
    <div className="prices" 
      style={{
        background: `url(${bgImage.images?.fallback?.src})  no-repeat center center`,
        backgroundSize: 'cover'
      }}
    >
      <div className="card-container">
        <Card>
          <div className="price-card-body">
            <header>
              <h1>{title} {new Date().getFullYear()}</h1>
            </header>
            <section>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        <div className="th-container">
                          <span className="th-heading">{ nightCols.heading }</span>
                          <span className="th-subheading">({ nightCols.subheading })</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="th-container">
                          <span className="th-heading">{ weekCols.heading }</span>
                          <span className="th-subheading">({ weekCols.subheading })</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={() => {navigate(`/${locale}/rooms/${row.name?.toLowerCase()}`)}}
                      >
                        <TableCell scope="row">{row.type}</TableCell>
                        <TableCell scope="row" ><span className="room-name">{row.name}</span></TableCell>
                        <TableCell align="right">{row.night}</TableCell>
                        <TableCell align="right">{row.week}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="outlined" className="booking-button">{ locale === 'FR' ? 'Réserver' : 'Booking' }</Button>
            </section>
          </div>
        </Card>        
      </div>

    </div>
  );
};

PricesPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  rows: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  nightCols: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  weekCols: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  romance: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  reverie: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  songe: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  cocon: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const PricesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PricesPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        rows={frontmatter.rows}
        nightCols={frontmatter.nightCols}
        weekCols={frontmatter.weekCols}
        romance={frontmatter.romance}
        reverie={frontmatter.reverie}
        songe={frontmatter.songe}
        cocon={frontmatter.cocon}
      />
    </Layout>
  );
};

PricesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default PricesPage;

export const pricesPageQuery = graphql`
  query PricesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              quality: 100
              layout: CONSTRAINED
            )

          }
        }
        rows {
          room
          cottage
        }
        nightCols {
          heading
          subheading
        }
        weekCols {
          heading
          subheading
        }
        romance {
          night
          week
        }
        reverie {
          night
          week
        }
        songe {
          night
          week
        }
        cocon {
          night
          week
        }
      }
    }
  }
`;
