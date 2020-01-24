import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  max-width: 90vw;
  width: 100%;
  margin-top: -50px;
`

const Heading1 = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 50px;
`

const Heading2 = styled.h2`
  margin: 0;
  font-weight: 300;
  font-size: 40px;
  color: #ccc;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  & > a:not(:first-child) {
    margin-left: 15px;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Content>
        <Heading1>Josh Dronsfield</Heading1>
        <Heading2>Software developer.</Heading2>
        <Buttons>
          <Button as="a" href="/Josh Dronsfield CV 2019.pdf" download>
            DOWNLOAD CV
          </Button>
          <Button
            as="a"
            href="https://www.linkedin.com/in/joshdronsfield"
            target="_blank"
          >
            LINKEDIN
          </Button>
          <Button
            as="a"
            href="https://www.instagram.com/dronz_/"
            target="_blank"
          >
            INSTAGRAM
          </Button>
        </Buttons>
      </Content>
    </Container>
  </Layout>
)

export default IndexPage
