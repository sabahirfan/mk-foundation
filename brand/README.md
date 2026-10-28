# Logo source

The MK Foundation mark was traced from the original artwork into `shapes.json`
(four shapes: the lifting sweep, the child's arms, the head and the star).
`build_logo.py` recolours it to the site palette, outlines the wordmark in
Literata, and writes the logo set to `public/brand/` and the favicon.

To rebuild after changing colours or layout:

```bash
python3 -m venv .venv && .venv/bin/pip install fonttools brotli uharfbuzz
npm run build   # so the Literata font file exists in out/
.venv/bin/python brand/build_logo.py out/_next/static/media/<literata-latin>.woff2 public/brand
mv public/brand/icon.svg app/icon.svg
```

| File | Use |
|---|---|
| `mk-mark.svg` | The mark alone: social avatars, stamps, small spaces |
| `mk-logo-stacked.svg` | Main logo: posters, banners, the first page of documents |
| `mk-logo-horizontal.svg` | Letterheads, email signatures, wide spaces |
| `*-reverse.svg` | On dark or chalkboard-green backgrounds |
| `*-mono.svg` | Single-colour print, embroidery, rubber stamps |
