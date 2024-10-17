cd packages

cd demo-gen
npm run generate
cp artifacts/combined-languages.json ../demo/src/lang/
cd ..

cd demo
npm test
cd ..

cd ..

