# Burger Lab — burger hero page

The homepage begins with a responsive, full-screen hero: the bundled burger video fills the background, with the quote layered on the left. The ingredients section below it keeps a scrub-optimized copy of the burger video in a sticky viewport while ordinary page scrolling scrubs through five captioned burger-building stages. It does not lock or snap scrolling. The menu includes four illustrated burgers with INR prices, a working wishlist, and a cart with quantities and subtotal; checkout is not yet connected. A final responsive video-and-quote section uses the bundled `girlbabay-burger.mp4` eating-burger video, followed by a contact footer.

## Run locally on Windows

1. Open this project folder in VS Code:
   `C:\Users\balad\Downloads\Freelanching Work\burger-lab\burger-lab`
2. Open **Terminal → New Terminal**.
3. Install dependencies:

   ```powershell
   npm.cmd install
   ```

4. Start the Vite development server:

   ```powershell
   npm.cmd run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Video file

The hero video is at `src/puplic/images/burger-home-video.mp4`. The original ingredient video is `public/images/layer-burger.mp4`; the page uses `public/images/layer-burger-scrub.mp4`, an H.264 version with frequent keyframes and fast-start metadata to make scroll seeking responsive.

To replace a film, put the new MP4 at the corresponding path and keep its filename. The hero video autoplays muted and loops. The ingredients film is muted and its current frame is controlled by scroll, including when scrolling back up; five matching ingredient captions alternate sides as the video progresses. Menu names and sample prices are defined in `src/data/menuBurgers.js`.

## Build for production

```powershell
npm.cmd run build
```

Vite writes the deployable site to `dist/`.
