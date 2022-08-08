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
  width: 100vw !important;
  padding:0;
  margin:auto;
  overflow:hidden;
  display:flex!important;
  justify-content: center;
  align-items:center;
  box-sizing: border-box;
  position:relative;
  background: black;

  &  img, &  video{
    height:100%;
    max-height:100%;
    max-width:100%;
  }

`

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif)$/.test(url);
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
  // const [timestamp, setTimestamp] = useState(Date.now());
  const sliderRef = useRef();
  const [loop, setLoop] = useState(false);

  /* -------------------------------------------------------------------------- */
  const handleAfterChange = (slide) => { 
    // const videoElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${slide}"]`).querySelector(`video`);
    // if(videoElement != null) {
    //   videoElement.play();
    //   setSpeed(videoElement.duration*1000);
    // } else{
    //   setSpeed(slideshow[slide].duration * 1000);
    // }
    
    //console.log("la slide corrente e: "+slide);
  };

  /* -------------------------------------------------------------------------- */
  const handleBeforeChange = (oldSlide, newSlide) => {
    // console.log("dalla "+oldSlide+" alla "+newSlide);
    // console.log("oldSlide: "+oldSlide+" newslide vale: "+newSlide+" length vale: "+slideshow.length);
    
    const videoElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${newSlide}"]`).querySelector(`video`);
    if(videoElement != null) {
      //console.log('e un video');
      videoElement.play();
      videoElement.muted = false;
      setSpeed(videoElement.duration*1000);
    } else{
      //console.log(slideshow[newSlide]);
      setSpeed(slideshow[newSlide].duration * 1000);
    } 

    console.log(loop);
    if (oldSlide === 0 && loop)
    {
      console.log("update");
      setTimeout("location.reload(true);",50);
      // setTimestamp(Date.now());
      setLoop(false);
    }

    if (oldSlide === 0 && !loop) setLoop(true);
  };
  return (
    <Layout>
      <div /* key={timestamp} */>
        <Slider
          ref={sliderRef}
          touchMove={false}
          dots={false}
          autoplay={true}
          infinite={true}
          arrow={false}
          autoplaySpeed={speed}
          pauseOnHover={false}
          // afterChange={handleAfterChange}
          beforeChange={handleBeforeChange}
        >
          {
            slideshow
            .filter(onlyDisplaySlide)
            .map((item) => {
              return (
                <Slide key={item.slide} interval={item.duration * 1000} data-start={item.start} data-end={item.end}>
                  {
                    (isImage(item.slide)) ? <img src={item.slide} alt=""/> : <video muted playsInline src={item.slide}/>
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