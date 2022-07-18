for f in static/weathericons/mono/night/*; do
  cwebp -q 100 "$f" -o "$f"
  mv "$f" "${f%.png}.webp"
done

clear