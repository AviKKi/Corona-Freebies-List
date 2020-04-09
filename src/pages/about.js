import React from "react"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"

const Section = styled.div`
  @media (max-width: 1210px) {
    order: 2;
  }
`

const LinkBlock = styled.div`
  display: flex;
  align-items: start;
`

export default ({ data: { file: image } }) => {
  return (
    <>
      <Layout width={1500}>
        <SEO
          title="About Me"
          description="About me page of Corona Freebies List."
        />
        <div
          style={{
            display: "flex",
            paddingTop: "0px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Section>
            <div>
              <h1 style={{ marginTop: "0px" }}>Hii, i am Atul Yadav</h1>
              <p>
                I developed <b>Corona Freebies</b> in order to list
                <br /> some free stuff you can try out while in the lockdown.
                <br />
                Hope you will like it.
              </p>
              <p>
                Email me at{" "}
                <a
                  href="mailto:atul7555@gmail.com"
                  style={{ color: "#0c9abb" }}
                >
                  atul7555@gmail.com
                </a>
              </p>
            </div>
            <div>
              <LinkBlock>
                <img src="https://img.icons8.com/nolan/50/github.png" alt="" />
                <a
                  href="https://github.com/AviKKi"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  Github
                </a>
              </LinkBlock>
              <LinkBlock>
                <img
                  src="https://img.icons8.com/color/48/000000/stackoverflow.png"
                  alt=""
                />
                <a
                  href="https://stackoverflow.com/users/9046268/avikki"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  StackOverflow
                </a>
              </LinkBlock>
            </div>
          </Section>
          <Img
            fluid={image.childImageSharp.fluid}
            alt=""
            style={{ width: "750px", order: 1 }}
          />
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "code.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
