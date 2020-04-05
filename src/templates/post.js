import React from "react"
import Layout from "../components/Layout"
import { MDXProvider } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import SEO from "../components/seo"
import Tag from "../components/Tag"

const shortcodes = { Tag }

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        site
        slug
        title
        description
        tags
        siteUrl
      }
      body
      excerpt
    }
  }
`

export default ({ data: { mdx: post } }) => {
  return (
    <Layout width={1300}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />

      <div style={{ marginLeft: "20px" }}>
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.description}</p>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          {post.frontmatter.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        Source:{" "}
        <a href={post.frontmatter.siteUrl} target="_blank">
          {post.frontmatter.siteUrl}
        </a>
      </div>

      <MDXProvider components={shortcodes}>
        <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}
