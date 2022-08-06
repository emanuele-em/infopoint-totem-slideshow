import React, { useState, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

const checkWindowSize = () => {
  alert("test");
  return;
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
    if(slide==0)
      setTimestamp(Date.now());
  };





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
        >
          {
            slideshow
              .filter(function (item) {
                return (Date.parse(item.start) < Date.now() && Date.parse(item.end) > Date.now());
              })
              .map((item) => (
                <div key={item.slide.id} interval={item.duration * 1000} data-start={item.start} data-end={item.end}>
                  <GatsbyImage image={getImage(item.slide)} alt="" />
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
        slide {
          childImageSharp {
          gatsbyImageData(layout: FIXED)
              }
        id
            }
          }
        }
      }
    }
  }
}
        `;