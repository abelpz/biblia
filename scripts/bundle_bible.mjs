import fs from 'fs/promises';
import path from 'path';
import { forEachBookInBible } from './get_bible.mjs';
import { BIBLE_DATA } from '../constants';

const OUTPUT_DIR = './assets/bible';

const preBundleBible = async (bibleData) => {
  // Ensure the output directory exists
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