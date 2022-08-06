import React, { useState } from 'react'
import {Link, graphql} from 'gatsby'
import {GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout"
import Slider from "react-slick";
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";

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

const IndexPage = ({data}) => {
  const [intervalz, setIntervalz] = useState(3000); //initial state here represents the interval for first image.

  const handleAfterChange = (index, item) => {
    // if(Date.now() > Date.parse(item.props["data-end"])/1000 || Date.now() > Date.parse(item.props["data-start"])/1000)
    //   setIntervalz(0);
    // else
      setIntervalz(item.props["data-interval"]);
  };

  const slideshow = data.allMarkdownRemark.edges[0].node.frontmatter.slideshow;
  console.log(slideshow);
    var settings = {
      dots: true
    };


  return (
    <Layout>
      <Slider {...settings}>
        {slideshow.map((item) => (
          <div key={item.slide.id} data-interval={item.duration*1000} data-start={item.start} data-end={item.end}>
            <GatsbyImage image={getImage(item.slide)} alt="" />
          </div>

        ))
        }
      </Slider>
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