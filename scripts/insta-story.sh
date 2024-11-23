#!/bin/bash

cd ./scripts/newPhotos/gallery

for filename in *.jpeg; do
  convert "$filename" \
  -strip -rotate 90 \
  -resize 1200x1800 +repage \
  -write photo.png \
  -resize 1350x2400^ +repage \
  -gravity center -crop 1350x2400+0+0 +repage \
  -blur 100x100 \
  -fill black -draw "rectangle 65,290 1284,2109" \
  -fill white -draw "rectangle 75,300 1274,2099" \
  -draw "image over 0,0 0,0 photo.png" \
  "$filename";
  rm photo.png;
done
