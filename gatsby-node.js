const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
                slideshow {
                    duration
                    start
                    end
                    slide
                }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const page = result.data.allMarkdownRemark.edges[0];
    const id = page.node.id;
    const slideshow = page.node.frontmatter.slideshow;
   
  console.log(slideshow);
      createPage({
        path: page.node.fields.slug,
        component: path.resolve(
          `src/pages/index.js`
        ),
        context: {
          id,
          slideshow
        },
      })

  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}