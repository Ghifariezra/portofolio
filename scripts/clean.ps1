Remove-Item -Recurse -Force .next;
Remove-Item -Recurse -Force node_modules;
Remove-Item pnpm-lock.yaml;

pnpm install;
pnpm dev;