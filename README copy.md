# SteamEdge Website

A responsive static website for the SteamEdge product concept. It includes a home page, product shop, product/design page with the supplied YouTube video, an About page, and an interactive demonstration cart and checkout.

## Open the website in Visual Studio Code

1. Extract the `steamedge-website.zip` file.
2. Open the extracted `steamedge-website` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the **Live Server** extension in VS Code and choose **Open with Live Server**.
4. Navigate with the links at the top of the page.

The site uses plain HTML, CSS, and JavaScript. It does not require npm, a build step, or a framework.

## Edit products, descriptions, and prices

Open `js/products.js`. This is the product catalog used by the shop and home page. Each product has:

- `name`: product title shown on the website.
- `price`: price in dollars (for example, `59.99`).
- `shortDescription`: short copy shown on product cards.
- `description`: longer product description for future product-detail use.
- `category`: use `kits` or `accessories`.
- `image` / `imageAlt`: optional image path and accessible description.
- `visual`: optional accessory illustration key (`blade`, `cable`, `case`, or `brush`).

The current prices are set to the amounts supplied for the SteamEdge project:

| Product | Price |
|---|---:|
| Base Kit | $59.99 |
| Plus Kit | $79.99 |
| Premium Kit | $99.99 |
| Replacement Blades | $9.99 |
| Charging Cable | $9.99 |
| Handle Replacement | $39.99 |
| Travel Case | $14.99 |
| Cleaning Brush | $5.99 |

To add another product, copy a product object in `js/products.js`, give it a unique `id`, and set the other fields. Use `category: "kits"` or `category: "accessories"`.

## Replace product images

Your uploaded SteamEdge renders are included here:

- `assets/steamedge-front.png` — front-facing razor render.
- `assets/steamedge-angle.png` — angled razor render with cable.

To replace an image, put the new image in `assets/` and update the matching `image` value in `js/products.js` or the image source in the relevant HTML page. Keep the filenames unchanged to replace the current images without editing code.

## Replace the logo

The top-left logo is `assets/steamedge-logo.svg`. Replace that file with your finished logo and keep the same filename, or update the `<img src="...">` references in the HTML pages. SVG or transparent PNG works well against the dark header.

## Change the YouTube video

Open `product.html` and find the video iframe. Replace the video ID in this URL:

`https://www.youtube-nocookie.com/embed/wtpnA86jwZU`

For a YouTube link such as `https://youtu.be/ABC123xyz`, the video ID is `ABC123xyz`, so the embed URL becomes `https://www.youtube-nocookie.com/embed/ABC123xyz`. Also update the direct YouTube link below the video.

## Change the colors and styling

Open `css/styles.css`. The main color variables are at the top under `:root`. Update the navy, blue, light-blue, white, and black values there to change the site's overall theme.

## Cart and checkout behavior

The cart works in the browser and is saved in `localStorage`, so items remain while navigating between pages. Visitors can add products, change quantities, remove products, enter sample customer details, and complete a demo order.

**Important:** This is a front-end demonstration only. It does not collect card details, take payments, send orders, calculate shipping or tax, or connect to inventory/fulfillment. Before accepting real orders, connect a secure checkout provider (such as Stripe or Shopify) and a server-side order system. Do not collect or store payment card data in this static website.

## Main files

- `index.html` — homepage
- `shop.html` — product shop and category filters
- `product.html` — SteamEdge overview, design details, and YouTube video
- `about.html` — business / product concept About page
- `checkout.html` — cart and demonstration checkout
- `js/products.js` — editable product catalog
- `js/site.js` — cart, shop filters, and checkout interactions
- `css/styles.css` — all site styling
- `assets/` — logo and product images
