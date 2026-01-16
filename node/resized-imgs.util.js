const fs = require('fs').promises;
const path = require('path');
const resizeImg = require('resize-img'); // npm i resize-img

const imgSizes = [
    { width: 1200, height: 1200 },
    { width: 768, height: 768 },
    { width: 128, height: 128 },
    { width: 64, height: 64 },
];

/**
 * 
 * @param sizes { width: number, height: number }[]
 */
async function resizedImgs(sizes = []) {
    try {
        const filename = process.argv[process.argv.length - 1].trim();
        const filenameWithoutExt = path.basename(filename, path.extname(filename));

        const pathBaseDirectory = path.join(process.cwd() || __dirname, 'img', filenameWithoutExt);

        await fs.mkdir(pathBaseDirectory, { recursive: true });

        const resizePromises = sizes.map(({ width, height }) =>
            (async () => {
                const img = await fs.readFile(filename);
                const imgResized = await resizeImg(img, { width, height });
                const outputPath = path.join(pathBaseDirectory, `${filename}_${width}x${height}`);
                await fs.writeFile(outputPath, imgResized);
            })()
        );

        return await Promise.allSettled(resizePromises);
    } catch (error) {
        throw error;
    }
}

resizedImgs(imgSizes)
    .then(results => 
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.error(
                    `Error redimensionando ${sizes[index].width}x${sizes[index].height}:`,
                    result.reason
                );
            }
        })
    )
    .catch(console.log.bind(console, '[ERROR]'));
