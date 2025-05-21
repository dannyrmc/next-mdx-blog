import fs from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

export async function getLocalImage(src: string) {
  const publicDir = path.join(process.cwd(), "public");
  const imageBuffer = await fs.readFile(path.join(publicDir, src));

  const {
    metadata: { height, width },
    base64,
  } = await getPlaiceholder(imageBuffer, { size: 10 });

  return {
    base64,
    img: { src, height, width },
  };
}
