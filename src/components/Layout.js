import React from "react"
import styled from "styled-components";

const Slideshow = styled.div`
`

export default function Layout({ children }) {
  return (
    <Slideshow>
      {children}
    </Slideshow>
  )
}