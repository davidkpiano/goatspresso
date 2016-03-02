
npm run build

rm -rf build/svg
rm -rf build/views

mkdir build/svg
mkdir build/views

cp -r public/svg/* build/svg/
cp -r public/views/* build/views/

firebase deploy
