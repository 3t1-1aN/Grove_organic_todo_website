"""Build the 1024px Tauri icon master from public/Grove_icon.png."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "Grove_icon.png"
OUT = ROOT / "public" / "Grove_icon_square.png"
CANVAS = 1024


def main() -> None:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    side = max(w, h)
    base = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    base.paste(im, ((side - w) // 2, (side - h) // 2), im)

    # Scale to fit the full canvas — no center crop, transparent corners preserved.
    square = base.resize((CANVAS, CANVAS), Image.LANCZOS)
    square.save(OUT)
    print(f"Wrote {OUT} ({CANVAS}x{CANVAS}, fit=contain)")


if __name__ == "__main__":
    main()
