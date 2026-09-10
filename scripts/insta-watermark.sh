#!/bin/bash

cd ./scripts/newPhotos/gallery

for filename in *.jpeg; do
  # portrait
  if [[ "$filename" == p* ]]; then
    colour=$( [[ "${filename:1:1}" == "b" ]] && echo "black" || echo "white" )
    height=$( [[ "${filename:2:1}" == "t" ]] && echo "north" || echo "south" )
    width=$( [[ "${filename:3:1}" == "l" ]] && echo "west" || echo "east" )
    new_filename=$(echo "${filename:5}");

    image_width=$(identify -format "%w" "$filename")
    watermark_scale=$(echo "scale=3; ($image_width / 26000)*100" | bc -l)

    echo "$new_filename P $colour $height $width $image_width $watermark_scale";

    convert ../../watermarks/watermark.png -scale $watermark_scale% miff:- | composite -gravity $height$width - "$filename" "$new_filename"
  fi

  # landscape
  if [[ "$filename" == l* ]]; then
    colour=$( [[ "${filename:1:1}" == "b" ]] && echo "black" || echo "white" )
    height=$( [[ "${filename:2:1}" == "t" ]] && echo "north" || echo "south" )
    width=$( [[ "${filename:3:1}" == "l" ]] && echo "west" || echo "east" )
    new_filename=$(echo "${filename:5}");

    image_height=$(identify -format "%h" "$filename")
    watermark_scale=$(echo "scale=3; ($image_height / 26000)*100" | bc -l)

    echo "$new_filename L $colour $height $width $image_height $watermark_scale";

    convert ../../watermarks/watermark.png -scale $watermark_scale% miff:- | composite -gravity $height$width - "$filename" "$new_filename"
  fi
done
