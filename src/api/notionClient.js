// notionClient.js
const { Client } = require('@notionhq/client');
const { NOTION_API_KEY } = require('./config');

// Initialize Notion client
const notion = new Client({ auth: NOTION_API_KEY });

// Example function to get page content
async function getPageContent(pageId) {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    throw error;
  }
}

async function exportPageBlocks(blockId) {
  try {
    const blocks = await notion.blocks.children.list({ block_id: blockId });
    return blocks.results;
  } catch (error) {
    console.error('Error exporting Notion blocks:', error);
    throw error;
  }
}

module.exports = {
  getPageContent,
  exportPageBlocks
};
