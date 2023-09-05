
#update repository
git pull
yarn
yarn tsc
yarn assets:server
pm2 restart ./pm2.json
