# npm i
npm run build-only
zip -r Archive.zip ./build
scp Archive.zip ubuntu@3.236.112.249:/var/www/vault.v-wallet-graph.cf
now=$(date +'%m.%d.%Y:%H:%M-bakup')
ssh ubuntu@3.236.112.249 "cd /var/www/vault.v-wallet-graph.cf && sudo mv public $now && sudo unzip Archive.zip -d ./ && mv build public && rm Archive.zip"
rm Archive.zip