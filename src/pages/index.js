import React, { useState, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from "styled-components";
import Layout from "../components/Layout"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* -------------------------------------------------------------------------- */
/*                                    style                                   */
/* -------------------------------------------------------------------------- */

const Slide = styled.div`
  height:100vh;
  width: 100vw;
  padding:0;
  overflow:hidden;
  display:flex;
  justify-content: center;
  align-items:center;

  & > img, & > video{
    max-height:100%;
    max-width:100%;
  }

`

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function onlyDisplaySlide(slideshow){
  return (Date.parse(slideshow.start) < Date.now() && Date.parse(slideshow.end) > Date.now());
}



/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */

const IndexPage = ({ data }) => {
  const slideshow = data.allMarkdownRemark.edges[0].node.frontmatter.slideshow;
  const [speed, setSpeed] = useState(3000); //initial state here represents the interval for first image.
  const [timestamp, setTimestamp] = useState(Date.now());
  const [len, setLen] = useState(0);
  const sliderRef = useRef();

  /* -------------------------------------------------------------------------- */
  const handleAfterChange = (slide) => { //just after transition, current slide si hte one just displayed
    //console.log(sliderRef.current.innerSlider.list.querySelector(`[data-index="${slide}"]`).querySelector(`video`));
    const videoElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${slide}"]`).querySelector(`video`);
    if(videoElement != null) {
      //then is a video
      videoElement.play();
      setSpeed(videoElement.duration*1000);
    } else{
      setSpeed(slideshow[slide].duration * 1000);
    }
  };

  /* -------------------------------------------------------------------------- */
  const handleBeforeChange = (slide) => {
    
    const last = slideshow.filter(onlyDisplaySlide).length-1;
    //console.log("slide is "+slide+" and last is "+last);
    if (slide == last)
      setTimestamp(Date.now());
  }
  /* -------------------------------------------------------------------------- */
  // const handleMetadata = e => {
  //   setSpeed(e.currentTarget.duration * 1000);
  // }

  return (
    <Layout>
      <div key={timestamp}>
        <Slider
          ref={sliderRef}
          touchMove={false}
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
            .filter(onlyDisplaySlide)
            .map((item) => {
              return (
                <Slide key={item.slide} interval={item.duration * 1000} data-start={item.start} data-end={item.end}>
                  {
                    (isImage(item.slide))
                      ? <img src={item.slide} alt="" />
                      : <video muted playsInline src={item.slide} />
                  }
                </Slide>

              )
            })
            
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