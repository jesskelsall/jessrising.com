#!/bin/bash

cd ./scripts/newPhotos/gallery

watermark_proportion="0.9"
watermark_opacity="20"

for filename in *.jpeg; do
  image_width=$(identify -format "%w" "$filename")
  image_height=$(identify -format "%h" "$filename")
  short_dimension=$(($image_width < $image_height ? $image_width : $image_height))

  watermark_scale=$(echo "scale=3; (($short_dimension * $watermark_proportion) / 3000)*100" | bc -l)
  echo "$filename $image_width $image_height $watermark_scale";

  convert ../../watermarks/watermark.png -scale $watermark_scale% miff:- | composite -dissolve "$watermark_opacity" -gravity center - "$filename" "P_$filename"
done
