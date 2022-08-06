import React from "react"
import styled from "styled-components";

// const Slideshow = styled.div`
// margin: 0 auto;
// width: 100vw;
// height: 100vh;
// background: red;
// `

export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}