import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const NavLink = styled(Link)`
  color: #222;
  font-size: 1rem;
  font-weight: ${props => props.fontWeight || "normal"};
  line-height: 1;
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;
  text-decoration: none;
  background-image: none;

  &.current-page {
    border-bottom: 2px solid #222;
  }

  &:last-of-type {
    margin-right: 0;
  }
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "icon" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <header
      css={css`
        background: #fff;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0.5rem calc((100vw - 1000px) / 2); /* for header both side equal margin,this will be of equal width of main */

        @media (max-width: 1000px) {
          padding: 10px 10px 0 10px;
        }
      `}
    >
      <div style={{ display: "flex" }}>
        <Img
          fluid={data.file.childImageSharp.fluid}
          alt=""
          style={{ padding: "0px", width: "70px" }}
        />
        <NavLink to="/" style={{ alignSelf: "center", padding: "0px" }}>
          Corona Freebies
        </NavLink>
      </div>
      <nav
        css={css`
          margin-top: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        `}
      >
        <NavLink to="/" activeClassName="current-page">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="current-page">
          About
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
