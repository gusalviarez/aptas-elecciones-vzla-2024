import { writeFile } from "fs"

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

const filePath = './downloaded_image.jpg';
const imagesUrl = "https://static.resultadosconvzla.com/" + filename

console.log(imagesUrl)
// TODO download image from url
