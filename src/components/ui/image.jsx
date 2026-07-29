import * as React from "react"
import { cn } from "@/lib/utils"
import { images } from "@/config/images"

const IMAGEKIT_ENDPOINT = "https://ik.imagekit.io/weddinggallery"

/**
 * Responsive width ladder used to build each image's `srcset`. ImageKit
 * lazily generates (and edge-caches) one derivative per width we actually
 * request, so this list only needs to be fine-grained enough that browsers
 * always have a close-enough candidate — it does not multiply downloads,
 * since a browser only ever fetches the single best-matching entry.
 */
const WIDTH_STEPS = [320, 480, 640, 750, 828, 1080, 1200, 1600, 1920, 2560, 3840]

/**
 * Build an optimised ImageKit URL with f-auto, q-auto and a target width.
 * https://docs.imagekit.io/features/image-transformations
 *
 * Format:  <endpoint>/tr:<params>/<filename>
 * Example: https://ik.imagekit.io/weddinggallery/tr:f-auto,q-auto,w-1200/01.png
 */
function buildImageKitUrl(filename, { width, quality = "auto" } = {}) {
  const params = ["f-auto", `q-${quality}`]
  if (width) params.push(`w-${width}`)
  return `${IMAGEKIT_ENDPOINT}/tr:${params.join(",")}/${filename}`
}

/**
 * Check if a src is an ImageKit-served filename (01.png … 99.png or any path
 * that does NOT already start with http).  For backward-compat we also accept
 * a full imagekit.io URL and pass it through untouched.
 */
function isImageKitSrc(src) {
  if (!src) return false
  if (src.startsWith("https://ik.imagekit.io/")) return true
  // bare filenames like "01.png"
  if (/^[\w.-]+\.(png|jpe?g|webp|gif|avif)$/i.test(src)) return true
  return false
}

/**
 * Extract just the filename from a full ImageKit URL or return the bare name.
 */
function toFilename(src) {
  if (src.startsWith("https://ik.imagekit.io/")) {
    // strip endpoint prefix and any existing /tr:…/ segment
    const url = new URL(src)
    return url.pathname.replace(/^\/[^/]+\//, "").replace(/^tr:[^/]+\//, "")
  }
  return src
}

/**
 * Candidate widths for an image's srcset: every rung on the ladder up to
 * ~2x the image's intended display width (so a retina screen still gets a
 * crisp file), plus the exact target width and the 2x cap itself. Capping
 * at 2x — rather than always offering the full 3840 ladder — is what stops
 * a small element (e.g. a 160px thumbnail) from ever being offered a
 * needlessly huge derivative.
 */
function candidateWidths(targetWidth) {
  if (!targetWidth) return WIDTH_STEPS
  const cap = targetWidth * 2
  const widths = new Set(WIDTH_STEPS.filter((w) => w <= cap))
  widths.add(targetWidth)
  widths.add(cap)
  return [...widths].sort((a, b) => a - b)
}

/** Parse "4/5" | "4:5" | 0.8 into a numeric width/height ratio. */
function parseAspectRatio(ratio) {
  if (typeof ratio === "number") return ratio
  if (!ratio) return undefined
  const [w, h] = String(ratio).split(/[/:]/).map(Number)
  if (!w || !h) return undefined
  return w / h
}

const FALLBACK_IMAGE_URL = buildImageKitUrl(images.hero, { width: 400, quality: 60 })

/**
 * Drop-in replacement for the former Wix-based <Image> component, now with
 * a modern responsive-image pipeline on top of ImageKit.
 *
 * Every request always includes `f-auto` (serves AVIF/WebP automatically
 * to browsers that support it, falling back to the original format) and
 * `q-auto` (ImageKit's perceptual auto-quality). Beyond a single fixed
 * URL, the component emits a full `srcset` of width-described candidates
 * so the browser — using the `sizes` hint — downloads only the smallest
 * file that still covers its actual on-screen size × device pixel ratio,
 * rather than the same fixed image at every viewport and DPR.
 *
 * Props:
 *   src         — ImageKit filename (e.g. "01.png") or a full https:// URL
 *   width       — the image's intended CSS display width in px; used both
 *                 as the fallback `src` and as the basis for the srcset
 *                 width ladder (capped at 2x for retina)
 *   height      — explicit intrinsic height in px (optional)
 *   aspectRatio — "w/h" (e.g. "4/5"); used to derive `height` from `width`
 *                 when `height` isn't given, so width+height are always
 *                 present on the rendered <img> to reserve layout space
 *                 and avoid CLS, even though the CSS (object-cover,
 *                 aspect-*, w-full h-full…) governs the actual box size.
 *   sizes       — CSS-length media-conditioned `sizes` string describing
 *                 how wide the image is actually rendered at each
 *                 breakpoint (default "100vw" for full-bleed images)
 *   quality     — ImageKit quality value (default "auto")
 *   loading     — "lazy" | "eager" (default "lazy"). Reserve "eager" for
 *                 the single above-the-fold hero image only.
 *   alt, className, style, …rest forwarded to <img>
 */
const Image = React.forwardRef(
  (
    {
      src,
      width,
      height,
      aspectRatio,
      sizes = "100vw",
      quality = "auto",
      loading = "lazy",
      className,
      style,
      alt = "",
      ...rest
    },
    ref
  ) => {
    const [failed, setFailed] = React.useState(false)

    const resolvedSrc = React.useMemo(() => {
      if (failed || !src) return FALLBACK_IMAGE_URL
      if (isImageKitSrc(src)) {
        const filename = toFilename(src)
        return buildImageKitUrl(filename, { width, quality })
      }
      // Non-ImageKit URL (external) — pass through as-is
      return src
    }, [src, width, quality, failed])

    // Responsive srcset: a ladder of width-described candidates. Paired
    // with `sizes`, this lets the browser — not a fixed 1x/2x guess — pick
    // the right file for its real rendered size and pixel density.
    const srcSet = React.useMemo(() => {
      if (failed || !src || !isImageKitSrc(src)) return undefined
      const filename = toFilename(src)
      return candidateWidths(width)
        .map((w) => `${buildImageKitUrl(filename, { width: w, quality })} ${w}w`)
        .join(", ")
    }, [src, width, quality, failed])

    // Always provide intrinsic width/height so the browser can reserve the
    // correct box before the image loads (prevents CLS), independent of
    // the CSS that ultimately sizes the element on screen.
    const intrinsicHeight =
      height ?? (width && aspectRatio ? Math.round(width / parseAspectRatio(aspectRatio)) : undefined)

    const isEager = loading === "eager"

    return (
      <img
        ref={ref}
        src={resolvedSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        width={width}
        height={intrinsicHeight}
        loading={loading}
        decoding={isEager ? "sync" : "async"}
        fetchpriority={isEager ? "high" : undefined}
        alt={alt}
        className={cn(className)}
        style={style}
        onError={() => setFailed(true)}
        {...rest}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
