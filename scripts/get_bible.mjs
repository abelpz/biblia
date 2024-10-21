import JSZip from "jszip";
import { parse } from "yaml";

export const forEachBookInBible = async ({ bibleData, onBook, onReleaseMetadata }) => {
  console.log("Loading Bible from internet");
  try {
    const { latestRelease, latestVersion, releaseDate, ...data } = await getBibleMetadata(bibleData);
    const bibleFiles = await getBibleFiles(latestRelease.zipball_url);
    
    await Promise.all([
      onReleaseMetadata({ ...data, version: latestVersion, date: releaseDate }),
      processBookFiles(bibleFiles, { onBook, releaseDate, latestVersion })
    ]);

    console.log("Bible processing completed");
  } catch (error) {
    console.error("Error processing Bible data:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

const getBibleMetadata = async ({ owner, languageCode, bibleId }) => {
  const latestRelease = await getLatestBibleRelease({ owner, languageCode, bibleId });
  const { version: latestVersion, ...data } = await getDataFromTag(
    owner,
    `${languageCode}_${bibleId}`,
    latestRelease.tag_name
  );
  const releaseDate = latestRelease.door43_metadata?.released;
  return { latestRelease, latestVersion, releaseDate, ...data };
};

const getBibleFiles = async (zipballUrl) => {
  return await getZipFiles(zipballUrl);
};

const processBookFiles = async (bibleFiles, { onBook, releaseDate, latestVersion }) => {
  const bookPromises = Object.entries(bibleFiles)
    .filter(([fileName]) => fileName.match(/\d{2}-([1-3A-Z]{3}).usfm$/))
    .map(async ([fileName, file]) => {
      try {
        const bookName = fileName.match(/\d{2}-([1-3A-Z]{3}).usfm$/)[1];
        const content = await file.async("string");
        await onBook({ name: bookName, content, releaseDate, version: latestVersion });
      } catch (error) {
        console.error(`Error processing book ${fileName}:`, error);
      }
    });

  await Promise.all(bookPromises);
};

export const getLatestRelease = async ({owner, repoName}) => {
  try {
    const response = await fetch(
      `https://git.door43.org/api/v1/repos/${owner}/${repoName}/releases/latest`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching latest release for ${owner}/${repoName}:`, error);
    throw error;
  }
};

export const getLatestBibleRelease = async ({owner, languageCode, bibleId}) => {
  const release = await getLatestRelease({ owner, repoName: languageCode + "_" + bibleId });
  if (release?.door43_metadata?.subject === "Bible") {
    return release;
  }
  console.error(release);
  throw new Error("Not a Bible release.");
}

export const getDataFromTag = async (owner, repoName, tagName) => {
  const tagManifest = await (
    await fetch(
      `https://git.door43.org/api/v1/repos/${owner}/${repoName}/raw/manifest.yaml?ref=${tagName}`
    ).catch((e) => console.warn(e))
  )?.text();

  const data = getDataFromYamlManifest(tagManifest);

  return data;
};

const getDataFromYamlManifest = (yaml) => {
  const manifest = parse(yaml);
  const { version, rights, contributor, publisher, description, title, creator, language } = manifest["dublin_core"];
  const { checking_entity: checkingEntity, checking_level: checkingLevel } = manifest["checking"];
  return {
    version,
    contributor,
    publisher,
    description,
    title,
    creator,
    language,
    checkingEntity,
    checkingLevel,
    rights
  };
};

const getZipFiles = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.arrayBuffer();
    const zip = new JSZip();
    await zip.loadAsync(data);
    return zip.files;
  } catch (error) {
    console.error("Error fetching or processing zip file:", error);
    throw error;
  }
};

// Remove or comment out this section if it's just for testing
