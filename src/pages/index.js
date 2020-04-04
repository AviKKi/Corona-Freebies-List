import React from "react"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"
import SEO from "../components/seo"

const Description = styled.div`
  width: 100%;
  max-width: 450px;
  height: 320px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  margin: 50px 50px 100px 50px;
  &:hover {
    -webkit-box-shadow: 10px 10px 14px 0px rgba(196, 190, 196, 1);
    -moz-box-shadow: 10px 10px 14px 0px rgba(196, 190, 196, 1);
    box-shadow: 10px 10px 14px 0px rgba(196, 190, 196, 1);
  }

  @media (max-width: 450px) {
    margin: 50px 20px 100px 20px;
    height: 330px;
    &:first-of-type {
      margin-top: 100px;
    }
  }
`
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
  flex-wrap: wrap;
`

const Content = styled.div`
  position: relative;
  bottom: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 450px) {
    bottom: 150px;
    width: inherit;
    left: 0px;
  }
`

const ImageCard = styled(Img)`
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  top: -80px;
  left: -80px;
  @media (max-width: 450px) {
    top: -100px;
    left: 50%;
    right: 50%;
    width: 250px;
    height: 200px;
    transform: translate(-50%);
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding-left: 40px;

  @media (max-width: 450px) {
    width: 100%;
    justify-content: center;
  }
`

const Tag = styled.p`
  margin: 5px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #81dfe3;
  color: black;
  &:hover {
    border: 1px solid #3481fb;
  }
`

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  width: 170px;
  position: absolute;
  right: 0;
  bottom: 30px;

  @media (max-width: 450px) {
    width: 100%;
    margin-top: 30px;
    justify-content: space-around;
  }
`
const CardSubText = styled.p`
  padding-left: 40px;
  color: #444;
  font-size: 0.9em;
  margin-bottom: 0.5em;
`

const CustomLink = styled.a`
  color: #1ca086;
  background-color: #fff;
  background-image: none;
  float: right;
  &:hover {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      #1ca086 1px,
      #1ca086 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }
`

const ItemCard = ({ item, index }) => {
  console.log(item)
  return (
    <Description key={index}>
      <ImageCard fluid={item.frontmatter.show.childImageSharp.fluid} />
      <Content>
        <h2 style={{ marginTop: "70px" }}>{item.frontmatter.site}</h2>
        <CardSubText>{item.frontmatter.description}</CardSubText>
        <Tags>
          {item.frontmatter.tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>
          })}
        </Tags>
        <Links>
          <CustomLink href={item.frontmatter.slug}>Details -></CustomLink>
        </Links>
      </Content>
    </Description>
  )
}

export default ({ data: { allMdx: post, file: bannerimg } }) => {
  return (
    <>
      <Layout width={1500}>
        <SEO
          title="Home"
          description="List of Freebeis due to corona pandemic"
        />
        <Banner>
          <Img
            alt=""
            fluid={bannerimg.childImageSharp.fluid}
            style={{ maxWidth: "500px", width: "100%" }}
          />
          <div>
            <h1 style={{ marginTop: "0px", textAlign: "center" }}>
              Corona Freebeis
            </h1>
            <p>
              One Place to look for all the freebies available when you are
              locked down.
            </p>
          </div>
        </Banner>
        <h1 style={{ textAlign: "center", marginTop: "10%" }}>Freebies List</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "60px",
          }}
        >
          {post.nodes.map((item, index) => (
            <ItemCard item={item} index={index} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___rating, order: ASC }) {
      nodes {
        frontmatter {
          slug
          site
          siteUrl
          tags
          description
          show {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
    file(sourceInstanceName: { eq: "images" }, name: { eq: "designer" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
