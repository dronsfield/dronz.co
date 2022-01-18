import React from "react"
import styled from "styled-components"
import Button from "../components/Button"
import Layout from "../components/layout"
import SEO from "../components/seo"


const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  max-width: 90vw;
  width: 100%;
  margin-top: 5vw;
`

const Heading1 = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 3.2em;
  position: relative;
  @media (max-width: 600px) {
    font-size: 1.8em;
  }
`

const Heading2 = styled.h2`
  margin: 0;
  font-weight: 300;
  font-size: 2.5em;
  color: white;
  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: -0.5em;
  margin-top: 0.7em;

  & > a {
    margin: 0.5em;
  }

  @media (max-width: 600px) {
    font-size: 0.7em;
    flex-wrap: wrap;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Content>
        <Heading1>Josh Dronsfield</Heading1>
        <Heading2>Software developer</Heading2>
        <Buttons>
          {/* <Button as="a" href="/Josh Dronsfield CV 2019.pdf" download>
            DOWNLOAD CV
          </Button> */}
          <Button
            as="a"
            href="https://github.com/dronsfield"
            target="_blank"
          >
            GITHUB
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
