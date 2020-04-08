import React, { useState } from "react"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Tag from "../components/Tag"

const TAGS = ["all", "education", "office", "dating","productmanager"]

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
    height: 420px;
    margin: 60px 0px;
    padding: 0;
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
  border-radius: 5px;

  @media (min-width: 450px) {
    background: -webkit-linear-gradient(180deg, #2980b9, #6dd5fa, #ffffff);
    background: linear-gradient(180deg, #2980b9, #6dd5fa, #ffffff);
  }
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

const Pagination = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`

const PageLink = styled.div`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 5px 4px;

  &:hover{
    background-color:#ddd;
    cursor:pointer;
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
    justify-content: flex-start;
    padding: 0 5px;
  }
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  width: 170px;
  position: absolute;
  right: 0;
  bottom: 30px;

  @media (max-width: 450px) {
    bottom: 70px;
    right: -30px;
    justify-content: space-around;
  }
`
const CardSubText = styled.p`
  padding-left: 40px;
  color: #444;
  font-size: 0.9em;
  margin-bottom: 0.5em;

  @media (max-width: 450px) {
    padding: 0 5px;
  }
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

const CustomImg = styled(Img)`
  @media (max-width: 450px) {
    background: -webkit-linear-gradient(180deg, #2980b9, #6dd5fa, #ffffff);
    background: linear-gradient(180deg, #2980b9, #6dd5fa, #ffffff);
  }
  border-radius: 5px;
`

const ItemCard = ({ item, index }) => {
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
  const posts_per_page = 10
  const [page,setPage] = useState(0)
  const [selectedtag, setTag] = useState("all")
  const [filteredData, setFilterData] = useState({ nodes: [] })
  const handleChange = tag_name => {
    const selected_input = tag_name.toLowerCase()
    const filteredData = post.nodes.filter(item => {
      const node = item.frontmatter
      return node.tags
        .join("")
        .toLowerCase()
        .includes(selected_input) //convert tags from an array to str
    })
    setTag(tag_name)
    setFilterData(filteredData)
  }
  const hasSelectedAll = selectedtag === "all"
  const posts = (hasSelectedAll ? post.nodes : filteredData).slice((page*posts_per_page),((page*posts_per_page)+posts_per_page))
  const totalPosts = (hasSelectedAll ? post.nodes.length : filteredData.length)
  const post_divided = (totalPosts / posts_per_page)
  const pages = ((post_divided % 1 === 0) ? [...Array(post_divided).keys()] :  [...Array(Math.floor(post_divided)+1).keys()]).map(i => i+1)

  return (
    <>
      <Layout width={1500}>
        <SEO
          title="Home"
          description="List of Freebeis due to corona pandemic"
        />
        <Banner>
          <CustomImg
            alt=""
            fluid={bannerimg.childImageSharp.fluid}
            style={{
              maxWidth: "500px",
              width: "100%",
            }}
          />
          <div>
            <h1 style={{ marginTop: "0px", textAlign: "center" }}>
              Corona Freebeis
            </h1>
            <p style={{ textAlign: "center" }}>
              One Place to look for all the freebies available when you are
              locked down.
            </p>
          </div>
        </Banner>
        <div>
          <h1 style={{ textAlign: "center", marginTop: "10%" }}>
            Freebies List
          </h1>
          <TagList>
            {TAGS.map((item, index) => {
              return (
                <Tag
                  key={index}
                  style={
                    selectedtag === item
                      ? {
                          backgroundColor: "#3481fb",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }
                  }
                  onClick={() => handleChange(item)}
                >
                  {item}
                </Tag>
              )
            })}
          </TagList>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "60px",
            }}
          >
            {posts.map((item, index) => (
              <ItemCard item={item} index={index} key={index} />
            ))}
          </div>
          <Pagination>
            <PageLink onClick={() => {
              if(page>0){
                setPage(page-1)
              }
            }}>&laquo;</PageLink>
            {
            pages.map((item) => {
            return <PageLink key={item} style={((page+1) === item) ? {backgroundColor:'#3481fb',color:'white'} : {} } onClick={() => setPage(item-1)}>
                {item}
            </PageLink>
            })
           } 
           <PageLink onClick={() => {
              if(page<(pages.length-1)){
                setPage(page+1)
              }
            }}>&raquo;</PageLink>
          </Pagination>
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
