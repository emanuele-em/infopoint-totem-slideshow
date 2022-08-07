import React, { useState, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* -------------------------------------------------------------------------- */
/*                                    style                                   */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}



/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */

const IndexPage = ({ data }) => {
  const slideshow = data.allMarkdownRemark.edges[0].node.frontmatter.slideshow;
  const [speed, setSpeed] = useState(3000); //initial state here represents the interval for first image.
  const [timestamp, setTimestamp] = useState(Date.now());
  const sliderRef = useRef();
  const handleAfterChange = (slide) => {
    setSpeed(slideshow[slide].duration * 1000);//controllo che corrisponda a quello giusto
  };

  /* -------------------------------------------------------------------------- */
  const handleBeforeChange = (slide) => {
    console.log("slide value: " + slide + " slideshow lenght valu: " + slideshow.length);
    if (slide == slideshow.length - 1)
      setTimestamp(Date.now());
  }
  /* -------------------------------------------------------------------------- */
  const handleMetadata = e => {
    setSpeed(e.currentTarget.duration * 1000);
  }

  return (
    <Layout>
      <div key={timestamp}>
        <Slider
          ref={sliderRef}
          dots={false}
          autoplay={true}
          infinite={true}
          arrow={false}
          autoplaySpeed={speed}
          pauseOnHover={false}
          afterChange={handleAfterChange}
          beforeChange={handleBeforeChange}
        >
          {
            slideshow
              .filter(function (item) {
                return (Date.parse(item.start) < Date.now() && Date.parse(item.end) > Date.now());
              })
              .map((item) => (
                <div key={item.slide} interval={item.duration * 1000} data-start={item.start} data-end={item.end}>
                  {
                    (isImage(item.slide))
                      ? <img src={item.slide} alt="" />
                      : <video autoPlay muted playsInline src={item.slide} onLoadedMetadata={handleMetadata} />
                  }
                </div>

              ))
          }
        </Slider>
      </div>
    </Layout>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    query                                   */
/* -------------------------------------------------------------------------- */

export default IndexPage

export const pageQuery = graphql`
        query slideShow {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  slideshow {
                    duration
                    end
                    start
                    slide
                  }
                }
              }
            }
          }
        }
        `;