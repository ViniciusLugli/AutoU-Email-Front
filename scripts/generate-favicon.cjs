const fs = require('fs');
const path = require('path');

const input = path.resolve(__dirname, '../public/o-email.png');
const output = path.resolve(__dirname, '../public/favicon_generated.ico');

try {
  const png = fs.readFileSync(input);

  // ICO header (6 bytes): reserved 0, type 1 (icon), count 1
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (icon)
  header.writeUInt16LE(1, 4); // number of images

  // Directory entry (16 bytes)
  const dir = Buffer.alloc(16);
  dir.writeUInt8(0, 0); // width (0 for 256)
  dir.writeUInt8(0, 1); // height (0 for 256)
  dir.writeUInt8(0, 2); // color palette
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // color planes
  dir.writeUInt16LE(32, 6); // bits per pixel
  dir.writeUInt32LE(png.length, 8); // size of image data
  dir.writeUInt32LE(header.length + dir.length, 12); // offset of image data

  // Compose ICO
  const ico = Buffer.concat([header, dir, png]);

  fs.writeFileSync(output, ico);
  console.log('favicon_generated.ico created at', output);
  process.exit(0);
} catch (err) {
  console.error('Failed to generate ICO:', err);
  process.exit(1);
}
