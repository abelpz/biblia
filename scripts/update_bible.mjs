import * as FileSystem from 'expo-file-system';
import { forEachBookInBible } from './get_bible.mjs';
import { BIBLE_DATA } from '../constants';

const OUTPUT_DIR = FileSystem.documentDirectory + 'bible/';

export const updateBible = async (bibleData = BIBLE_DATA) => {
  try {
    // Ensure the output directory exists
    await FileSystem.makeDirectoryAsync(OUTPUT_DIR, { intermediates: true });

    await forEachBookInBible({
      bibleData,
      onBook: async (book) => {
        const fileName = `${book.name}.json`;
        const filePath = OUTPUT_DIR + fileName;
        const bookData = {
          name: book.name,
          content: book.content,
          releaseDate: book.releaseDate,
          version: book.version
        };
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(bookData, null, 2));
        console.log(`Created file: ${fileName}`);
      },
      onReleaseMetadata: async (data) => {
        const fileName = 'release-metadata.json';
        const filePath = OUTPUT_DIR + fileName;
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        console.log(`Created file: ${fileName}`);
      }
    });

    console.log("Bible update completed successfully");
  } catch (error) {
    console.error("Error updating Bible:", error);
    throw error;
  }
};
