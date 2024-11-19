const fs = require('fs/promises');
const path = require('path');
const { forEachBookInBible } = require('./get_bible.js');
const { BIBLE_DATA } = require('../constants/index.js');

const OUTPUT_DIR = './assets/bible';

const preBundleBible = async (bibleData) => {
  // Ensure the output directory exists, remove it if it exists, and create a new one
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  await forEachBookInBible({
    bibleData,
    onBook: async (book) => {
      const fileName = `${book.name}.json`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      const bookData = {
        name: book.name,
        content: book.content,
        releaseDate: book.releaseDate,
        version: book.version
      };
      await fs.writeFile(filePath, JSON.stringify(bookData, null, 2));
      console.log(`Created file: ${fileName}`);
    },
    onReleaseMetadata: async (data) => {
      const fileName = 'release-metadata.json';
      const filePath = path.join(OUTPUT_DIR, fileName);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`Created file: ${fileName}`);
    }
  });
};

preBundleBible(BIBLE_DATA);