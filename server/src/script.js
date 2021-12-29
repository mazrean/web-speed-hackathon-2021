import { PUBLIC_PATH } from './paths';
import { generateSoundMeta } from './converters/convert_sound';
import { promises as fs } from 'fs';
import path from 'path';

(async () => {
  const soundsDir = path.join(PUBLIC_PATH, 'sounds');
  const files = await fs.readdir(soundsDir);
  for (const file of files) {
    const filePath = path.resolve(PUBLIC_PATH, `./sounds/meta/${file}.json`);

    try {
      await fs.access(filePath);
    } catch (err) {
      const fp = path.join(soundsDir, file);
      const data = await fs.readFile(fp)

      const meta = await generateSoundMeta(data.buffer);

      await fs.writeFile(filePath, JSON.stringify(meta));
    }
  }
})();
