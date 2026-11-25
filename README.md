# BlixToys Website

Responsive static website with an original dark industrial theme inspired by the Bidso reference, using BlixToys-published product and manufacturing imagery.

Pages: Home, About, Products, Capabilities, Manufacturing, Quality & Certifications, Certificate Gallery, Contact.

Images reference published assets on https://www.blixtoys.com/assets/images/: products-banner.png, wooden-toys.jpg, ride-on-toys.png, outdoor-play.jpg, learning-toys.png, manufacturing-banner.png, injection-moulding.jpg, automatic-painting-booths.jpg, testing-lab.jpg and behind-scale.png. The site references the original URLs directly; the BlixToys domain must remain accessible.

Run locally: `python -m http.server 8000` and visit `http://localhost:8000`.

Before publishing: confirm image reuse rights; replace certificate placeholders with genuine documents; verify operational claims; set the contact form data-worker-url to the verified Worker endpoint after CORS is resolved. Contact email shown is admin@blixtoys.com, as displayed on the current BlixToys website.

Static HTML, CSS and vanilla JavaScript. GitHub Pages compatible.


## Interactive 3D showcase
The homepage and Capabilities page include a tabbed 3D showcase for Design, Engineering, Manufacturing and Licenses. Models are generated from Three.js primitives in the browser, so no external model downloads are required. Visitors can drag to rotate and scroll to zoom. Three.js is loaded from cdnjs at runtime.


## Original GLB model assets
Four custom stylised GLB models are included under `assets/models/`:
- `ride-on-toy.glb` — ride-on toy concept.
- `engineering-exploded.glb` — exploded assembly concept.
- `injection-moulding-machine.glb` — simplified injection-moulding machine concept.
- `quality-certificate.glb` — certificate and quality-seal concept.

The showcase loads these files with Three.js GLTFLoader. Drag to rotate and scroll to zoom. These are original illustrative models, not factory-verified CAD designs or representations of certified products.


## 3D visual treatment
The interactive WebGL/GLB viewer has been removed. The Design showcase now uses a custom cinematic 3D-style product render as a regular optimized WebP image. The tabbed copy remains interactive, but the visual is static, making the section simpler and more reliable across browsers and devices. No Three.js, GLTFLoader, or model downloads are required.


### Separate tab visuals
Each capability tab now loads its own optimized WebP 3D-style image:
- Design: `ride-on-3d-concept.webp`
- Engineering: `engineering-3d-concept.webp`
- Manufacturing: `manufacturing-3d-concept.webp`
- Licenses: `licenses-3d-concept.webp`

The artwork is illustrative concept imagery. Certification graphics are visual concepts only; display actual certification claims only when supported by current certificates and scope.


## Home-page certifications
The separate Certificate Gallery page has been removed from navigation and the site package. A new Safety & Quality Certifications section is included on the homepage with a two-column editorial layout and six standards tiles (ISO 9001:2015, SMETA/SEDEX, ASTM, EN 71, BIS/IS 9873 and GCC/G-Mark). The Quality navigation item points to this homepage section. Certification tiles are typographic visual treatments, not reproductions of official certification logos; publish claims only when current documents support them.

## Showcase cleanup
Removed the model-number caption and concept-art hint beneath/over the 3D-style image so the visual area contains only the image.


## Homepage background video

The homepage hero now uses a muted, autoplaying, looping manufacturing video with a dark monochrome overlay. It is configured with `playsinline` for mobile browsers and a local poster fallback (`assets/images/blix-hero-studio.png`). The video is served from Pexels' video CDN; an internet connection is required for playback. The selected clip is listed as free to use on Pexels:
https://www.pexels.com/video/automated-industrial-production-line-in-action-32386533/

If the video does not load, the poster and the hero's dark background preserve text contrast and layout.


## Logo and favicon assets
- Replace `assets/images/brand-logo.png` with your final transparent logo symbol. The visible `BLIXTOYS` brand name is rendered as HTML text beside it.
- Replace `assets/images/favicon.ico` with your final favicon file.


## Product categories and brand strip
- The Products page now includes 10 category cards: Infant & Toddler Toys, Activity Walkers, High Chairs, Potty Training, Ride-On Toys, Kick Scooters, Electric Bikes, Electric Jeeps, Electric Cars, and Indoor & Outdoor Play.
- The homepage includes a continuously scrolling brand-partner strip.
- Replace `assets/images/brands/brand-01.svg` through `brand-06.svg` with your actual brand logo artwork. Keep the same filenames, or update the image paths in `index.html`.
- No SKU or model codes are displayed in the category names.


## Product category card backgrounds
The Products page cards now use full-card category background images with a 15% dark overlay.
Add square (1:1) category images under `assets/images/product-categories/` using `category-01.jpg` through `category-10.jpg`. See that folder's README.txt for the category-to-filename mapping.


## Product category card placeholder images
The Products page now uses real Pexels image URLs via `<img class="category-card-image">` elements. The previous local CSS background-image references are retained as HTML comments above each image. Replace each `src` in `products.html` with your final category image URL or local asset path.
Pexels placeholder references:
- https://www.pexels.com/photo/adorable-baby-playing-with-colorful-mobile-toy-31137014/
- https://www.pexels.com/photo/toddler-riding-toy-scooter-outdoors-35307663/
- https://www.pexels.com/photo/colorful-collection-of-fun-toy-assortments-31508559/
- https://www.pexels.com/photo/child-playing-with-colorful-toy-car-31247014/
- https://www.pexels.com/photo/young-child-riding-a-pink-toy-car-indoors-31212317/
- https://www.pexels.com/photo/colorful-parking-toy-with-toy-cars-4491712/

Card eyebrow remains at the top. Category copy and CTA are anchored to the bottom-left. A 15% dark overlay is applied over each image.


## Image-free product category cards
The Products page category cards are now image-free. Each card uses a subtle dark/bronze gradient, a low-contrast oversized category number, a top eyebrow label, and bottom-aligned title, description, and enquiry link. No external category image URLs are required.


## Product category card photography
The existing 10 product category cards now use category-relevant remote images. No additional product categories or page sections were added. The cards retain the typography/layout structure, top eyebrow, bottom-left title/description/CTA, and a 30% dark overlay for readability.

Image source pages:
1. Infant & Toddler Toys — https://www.pexels.com/photo/cute-toddler-playing-with-baby-toys-6957554/
2. Activity Walkers — https://www.pexels.com/photo/playful-black-toddler-in-baby-walker-6624348/
3. High Chairs — https://www.pexels.com/photo/baby-sitting-in-a-feeding-chair-and-eating-11957376/
4. Potty Training — https://kiokids.net/es/5651-orinal-infantil-salvia-con-tapa-y-asa.html
5. Ride-On Toys — https://www.pexels.com/photo/child-driving-a-ride-on-toy-car-4047662/
6. Kick Scooters — https://www.pexels.com/photo/toddler-riding-toy-scooter-outdoors-35307663/
7. Electric Bikes — https://www.pexels.com/photo/cute-child-riding-balance-bike-on-street-in-countryside-3932888/
8. Electric Jeeps — https://www.pexels.com/photo/child-enjoying-electric-toy-car-on-street-ride-34953333/
9. Electric Cars — https://www.pexels.com/photo/young-child-riding-a-pink-toy-car-indoors-31212317/
10. Indoor & Outdoor Play — https://www.pexels.com/photo/kids-at-a-playground-8060005/

Replace each `src` in `products.html` with your final image URL or local asset path when available.


## Brand strip presentation
The homepage brand marquee now displays the logo image files directly without individual dark background cards, borders, rounded containers, or shadows. Replace the images under `assets/images/brands/` to update the logos.


## Homepage product showcase
The full 10-category product carousel has been moved from `products.html` into the homepage as the `#products-showcase` section, replacing the previous three-card "What We Make" teaser. The standalone `products.html` page has been removed. Site navigation and footer links labelled Products now point to `index.html#products-showcase`. The homepage loads `assets/js/products-carousel.js` for the carousel controls.


## Generated product category imagery
The homepage product showcase now uses original generated product imagery inspired by the product types and merchandising context visible on Baybee's public catalogue. No Baybee logo, brand marks, product photographs, product names, or exact product designs have been copied. Each generated tile is stored locally under `assets/images/product-categories/`.

| File | Category visual |
|---|---|
| `category-01.webp` | Infant play gym / activity toy |
| `category-02.webp` | Activity walker |
| `category-03.webp` | High chair |
| `category-04.webp` | Potty training chair |
| `category-05.webp` | Ride-on push car |
| `category-06.webp` | Kick scooter |
| `category-07.webp` | Electric kids' bike |
| `category-08.webp` | Electric jeep |
| `category-09.webp` | Electric toy car |
| `category-10.webp` | Indoor / outdoor play set |

The homepage category cards reference these local assets, so the showcase no longer depends on remote image URLs. Replace the files in this folder to update the imagery without editing the HTML.
Reference catalogue: https://baybee.co.in/


## Product image ratio adjustment
Category images now explicitly use `object-fit: cover` and centered positioning at all viewport sizes. This preserves the original image proportions (no stretching) while filling the card's image area; excess edges are cropped to match the card shape. Replace the local WebP files with source images of a similar aspect ratio for the closest visual match.


## Wide product showcase imagery
The Ride-On Toys, Kick Scooters, and Indoor & Outdoor Play images are prepared for a 16:9 landscape presentation (1600 × 900). The category cards now use `object-fit: contain` so the complete product remains visible rather than being clipped by a cover crop. The remaining category image files are retained and displayed with the same fit behavior.


## Landscape product category assets
All 10 category images are now normalized to 1600 × 900 (16:9 landscape). Categories 1–4 use newly generated studio product photography; categories 7–9 use the existing full product image centered on a softly extended landscape backdrop to avoid cutting off the product. The cards use `object-fit: cover` against these normalized landscape assets.


## Complete product image regeneration — final pass
All ten category images are present as 1600 × 900 (16:9) WebP files in `assets/images/product-categories/`. Categories 05–10 have been regenerated from a new product-category visual set: Ride-On Toys, Kick Scooters, Electric Bikes, Electric Jeeps, Electric Cars, and Indoor & Outdoor Play. The product subjects are kept fully visible on a wide studio canvas, with the existing card text area left visually quieter.


## Empty capability image placeholders
Removed the unused abstract image placeholder blocks from the three homepage capability cards (Design & Development, Manufacturing, Quality & Compliance). No empty image boxes remain in these cards. Card titles, descriptions, labels, card layout, and responsive grid are preserved.


## Company and Manufacturing page visual cleanup
Removed the unused abstract image/banner containers from `about.html` (Company) and `manufacturing.html` (Manufacturing). The page hero headings and descriptions remain, with no empty image area.


## Full website content integration
The supplied company information has been rewritten into customer-facing website copy and integrated into:
- `index.html`: brand introduction, vision, mission, product families, manufacturing footprint, quality approach and partnership messaging.
- `manufacturing.html`: process, equipment, production capabilities, product breadth and operating scale.
- `capabilities.html`: concept development, design, engineering, refinement and manufacturing support.
- `contact.html`: clearer project enquiry messaging and available email contacts.

The former Company/About page and standalone Products page are not included. Company story and product category showcase content are integrated into the homepage, consistent with the site's requested structure.

Contact phone and street address were omitted because the source document contains placeholder/incomplete values. Certification specifics remain subject to valid certificate/licence documentation and are not expanded beyond verifiable site content.
