# npm i
npm run build-only
zip -r Archive.zip ./build
scp Archive.zip ubuntu@13.48.46.87:/var/www/app.odysea.finance
now=$(date +'%m.%d.%Y:%H:%M-bakup')
ssh ubuntu@13.48.46.87 "cd /var/www/app.odysea.finance && sudo mv public $now && sudo unzip Archive.zip -d ./ && mv build public && rm Archive.zip"
rm Archive.zip
rm -rf ./build