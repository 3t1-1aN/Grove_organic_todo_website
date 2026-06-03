"""Build padded Grove icons for PWA, in-app, and Android launcher safe zones."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "Grove_icon.png"
OUT_SQUARE = ROOT / "public" / "Grove_icon_square.png"
CANVAS = 1024
# Inset so adaptive / maskable crops do not clip the artwork (Android safe zone ~66%).
INSET = 0.15

ANDROID_LAUNCHER = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

ANDROID_FOREGROUND = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}


def load_source() -> Image.Image:
    if not SRC.exists():
        raise SystemExit(f"Missing source icon: {SRC}")
    return Image.open(SRC).convert("RGBA")


def square_canvas(im: Image.Image) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    base = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    base.paste(im, ((side - w) // 2, (side - h) // 2), im)
    return base


def with_safe_inset(im: Image.Image) -> Image.Image:
    """Scale artwork down and center it with transparent margin."""
    base = square_canvas(im)
    side = base.size[0]
    inner = max(1, int(round(side * (1 - 2 * INSET))))
    scaled = base.resize((inner, inner), Image.LANCZOS)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset = (side - inner) // 2
    out.paste(scaled, (offset, offset), scaled)
    return out


def write_png(im: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.resize((size, size), Image.LANCZOS).save(path)


def write_android_icons(padded: Image.Image) -> None:
    res = ROOT / "android" / "app" / "src" / "main" / "res"
    for folder, px in ANDROID_LAUNCHER.items():
        write_png(padded, res / folder / "ic_launcher.png", px)
        write_png(padded, res / folder / "ic_launcher_round.png", px)
    for folder, px in ANDROID_FOREGROUND.items():
        write_png(padded, res / folder / "ic_launcher_foreground.png", px)


def main() -> None:
    padded = with_safe_inset(load_source())
    master = padded.resize((CANVAS, CANVAS), Image.LANCZOS)
    master.save(OUT_SQUARE)
    print(f"Wrote {OUT_SQUARE} ({CANVAS}x{CANVAS}, inset={INSET:.0%})")

    write_png(padded, ROOT / "src" / "Grove_icon.png", 512)

    icons_dir = ROOT / "src" / "icons"
    for size in (192, 512):
        write_png(padded, icons_dir / f"icon-{size}.png", size)
        print(f"Wrote {icons_dir / f'icon-{size}.png'}")

    write_android_icons(padded)
    print("Wrote Android launcher mipmaps (padded)")


if __name__ == "__main__":
    main()
