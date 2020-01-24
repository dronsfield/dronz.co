/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./header"

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    font-family: IBM Plex Mono, sans-serif;
    height: 100%;
    margin: 0;
    background-color: black;
    color: white;
  }

  #___gatsby, #gatsby-focus-wrapper, main {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }  
`

const Main = styled.main``

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
