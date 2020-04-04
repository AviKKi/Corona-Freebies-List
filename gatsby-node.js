const path = require("path")
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      posts: allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("failed to create posts", result.errors)
  }

  const posts = result.data.posts.nodes
  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve("./src/templates/post.js"),
      context: {
        slug: post.frontmatter.slug, //this slug will go to query of post
      },
    })
  })
}
