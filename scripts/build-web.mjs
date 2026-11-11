// 把網頁需要的檔案複製到 www/，給 Capacitor 打包進 APK。
// 刻意不複製 sw.js（APK 內資源已在本機，不需要 Service Worker）、README、
// cwmoney-converter.html 與建置相關檔案。
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
const files = ['index.html', 'jsQR.js', 'tailwind.css', 'manifest.webmanifest'];
const dirs = ['icons'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) {
  if (!existsSync(join(root, f))) throw new Error('缺少檔案：' + f);
  cpSync(join(root, f), join(out, f));
}
for (const d of dirs) cpSync(join(root, d), join(out, d), { recursive: true });
console.log('www/ 已更新：' + [...files, ...dirs.map(d => d + '/')].join(', '));
