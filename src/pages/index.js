import React, { useState } from 'react'
import {Link, graphql} from 'gatsby'
import {GatsbyImage, getImage } from "gatsby-plugin-image";
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

const IndexPage = ({data}) => {
  const slideshow = data.allMarkdownRemark.edges[0].node.frontmatter.slideshow;
  const [speed, setSpeed] = useState(3000); //initial state here represents the interval for first image.

  const handleAfterChange = (slide) => {
      setSpeed(slideshow[slide].duration*1000);//controllo che corrisponda a quello giusto
  };

  const handleBeforeChange = (slide) => {
      const start = Date.parse(slideshow[slide].start)/1000;
      const end = Date.parse(slideshow[slide].end)/1000;
      console.log(Date.now()+" corrisponde ad ora mentre "+start+" Corrisponde all inziio")
  };

  return (
    <Layout>
      <Slider
        dots={false}
        autoplay={true}
        infinite={true}
        arrow={false}
        autoplaySpeed= {speed}
        pauseOnHover={false}
        afterChange={handleAfterChange}
        beforeChange={handleBeforeChange}
      >
        {slideshow.map((item) => (
          <div key={item.slide.id} interval={item.duration*1000} data-start={item.start} data-end={item.end}>
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