import fs from "fs";
import path from "path";

const downloadFile = async (url: string, outputPath: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error while downloading: ${response.statusText}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`File stored in ${outputPath}`);
};

const main = async () => {
  const url = "https://drive.google.com/uc?export=download&id=190qAgVBiaNTZXUw_bIqXnvUJz0UoUrJB";
  const outputPath = path.join(process.cwd(), "public", "resume.pdf");
  await downloadFile(url, outputPath);
};

main().catch(console.error);
