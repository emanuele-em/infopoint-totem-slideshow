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

function onlyDisplaySlide(slideshow) {
  return (Date.parse(slideshow.start) < Date.now() && Date.parse(slideshow.end) > Date.now());
}



/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */

const IndexPage = ({ data, pageContext }) => {
  const sliderRef = useRef();
  const { slideshow } = pageContext;
  const [speed, setSpeed] = useState(3000);
  const [timestamp, setTimestamp] = useState(Date.now());

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // const [loop, setLoop] = useState(false);

  /* -------------------------------------------------------------------------- */
  const handleAfterChange = (slide) => {
    const videoElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${slide}"]`).querySelector(`video`);
    if(videoElement != null) {
      videoElement.play();
      setSpeed(videoElement.duration*1000);
    } else{
      setSpeed(slideshow[slide].duration * 1000);
    }

  };

  /* -------------------------------------------------------------------------- */
  const handleBeforeChange = (oldSlide, newSlide) => {
    const videoElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${newSlide}"]`).querySelector(`video`);
    if (videoElement != null) {
      videoElement.play();
      //videoElement.muted = false;
      setSpeed(videoElement.duration * 1000);
    } else {
      //console.log(slideshow[newSlide]);
      setSpeed(slideshow[newSlide].duration * 1000);
    }

    if (oldSlide === slideshow.length - 1 /* && state.loop */) {
      console.log("update");
      window.location.reload();
      setTimestamp(Date.now());
      // setLoop(false);
    }
  };

    
  return (
    
    <Layout >
      {console.log(slideshow)}
      <div  key={timestamp}>
        <Slider
        ref={sliderRef}
        touchMove={false}
        dots={false}
        autoplay={true}
        infinite={true}
        arrow={false}
        autoplaySpeed={speed}
        pauseOnHover={false}
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


export default IndexPage;

/* -------------------------------------------------------------------------- */
/*                                    query                                   */
/* -------------------------------------------------------------------------- */

export const pageQuery = graphql`
        query IndexPage {
          markdownRemark {
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
        `;