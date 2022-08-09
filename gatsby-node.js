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


    const id = page.node.id
    const slideshow = page.node.frontmatter.slideshow
    createPage({
      path: page.node.fields.slug,
      component: path.resolve(
        `src/templates/indexTemplate.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        slideshow: slideshow
      }
    })
  })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  //fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}