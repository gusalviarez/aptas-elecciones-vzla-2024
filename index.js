import fs from "fs/promises"

// curl -s "https://static.resultadosconvzla.com/021274_444248_2024-07-29-0001.jpg" --output "./actas/021274_444248_2024-07-29-0001.jpg"
// curl -s "https://avatars.githubusercontent.com/u/97401756?v=4" --output "./actas/image.jpeg"

const ci = process.env.CI

const getFilenames = async (ci) => {
    try {
        const filenamesUrl = `https://gdp.theempire.tech/api/data?cdi=v${ci}`;
        const res = await fetch(filenamesUrl)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const data = await getFilenames(ci)
const filename = data.acta.DO_DS_NAME

const targetFolder = './actas';
const imageUrl = "https://static.resultadosconvzla.com/" + filename

async function downloadImage() {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create target folder if it doesn't exist
    await fs.mkdir(targetFolder, { recursive: true });

    await fs.writeFile(`${targetFolder}/${filename}`, buffer);

    console.log(`Image downloaded successfully: ${filename}`);
  } catch (error) {
    console.error('Error downloading image:', error.message);
  }
}

downloadImage();

