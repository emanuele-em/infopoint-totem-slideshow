const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
//const { fmImagesToRelative } = require('gatsby-remark-relative-images');

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

    const page = result.data.allMarkdownRemark.edges;
    
   
    //const images = pages.filter(page => Date.parse(page.node.frontmatter.slideshow.start) < Date.now() && Date.parse(page.node.frontmatter.slideshow.end) > Date.now());

   page.forEach((edge) => {
    const id = edge.node.id;
    const slideshow = edge.node.frontmatter.slideshow;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/pages/templates/indexTemplate.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          slideshow
        },
      })
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