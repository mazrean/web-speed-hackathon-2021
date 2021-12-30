import { PUBLIC_PATH } from './paths';
import { promises as fs } from 'fs';
import path from 'path';
import { ffmpeg } from './ffmpeg';

(async () => {
  const movieDir = path.join(PUBLIC_PATH, 'movies');
  const files = await fs.readdir(movieDir);
  for (const file of files) {
    if (path.extname(file) !== '.gif') continue
    const name = `${path.basename(file, '.gif')}.webm`;
    const filePath = path.resolve(PUBLIC_PATH, `./movies/${path.basename(file, '.gif')}.webm`);
    console.log(filePath);

    try {
      await fs.access(filePath);
    } catch (err) {
      const fp = path.join(movieDir, file);

      const cropOptions = ["'min(iw,ih)':'min(iw,ih)'", `scale=320:320`]
        .filter(Boolean)
        .join(',');

      if (ffmpeg.isLoaded() === false) {
        await ffmpeg.load();
      }

      const data = await fs.readFile(fp)
      ffmpeg.FS('writeFile', 'file', new Uint8Array(data))
      await ffmpeg.run('-i', 'file', '-movflags', 'faststart', '-pix_fmt', 'yuv420p', '-row-mt', '1', '-vf', `crop=${cropOptions}`, name);
      const exported = ffmpeg.FS('readFile', name)
      await fs.writeFile(filePath, exported, 'binary')
    }
  }
})();
