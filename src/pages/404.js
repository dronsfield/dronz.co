import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"


const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>This route doesn't exist</p>
  </Layout>
)

export default NotFoundPage
