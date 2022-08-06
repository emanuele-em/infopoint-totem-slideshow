import React, { useState } from 'react'
import {Link, graphql} from 'gatsby'
import {GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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

  const onChange = (index, item) => {
    setIntervalz(item.props["data-interval"]);
  };

  const slideshow = data.allMarkdownRemark.edges[0].node.frontmatter.slideshow;
  console.log(slideshow);



  return (
    <Layout>
      <Carousel
        onChange={onChange}
        autoPlay
        interval={intervalz}
        infiniteLoop={true}
        showThumbs={false}
      >
        {slideshow.map((item) => (
          <div key={item.slide.id} data-interval={item.duration*1000}>
            <GatsbyImage image={getImage(item.slide)} alt="" />
          </div>

        ))
        }
      </Carousel>
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