
npm run build

rm -rf build/public/svg
rm -rf build/public/views

mkdir -p build/public/svg
mkdir -p build/public/views

cp -r public/svg/* build/public/svg/
cp -r public/views/* build/public/views/

firebase deploy
