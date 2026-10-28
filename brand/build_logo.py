"""Build the MK Foundation logo set from the traced mark and Literata outlines."""
import json
import sys
import tempfile
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SP = Path(__file__).parent
FONT_SRC = sys.argv[1]
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

shapes = json.loads((SP / "shapes.json").read_text())

PALETTES = {
    # child + star in the teacher's red pen, the lifting hand in fountain-pen ink
    "color": {"child": "#b3261e", "lift": "#18234a", "text": "#18234a"},
    # for the chalkboard green and other dark grounds
    "reverse": {"child": "#f2a89f", "lift": "#f2f0e6", "text": "#f2f0e6"},
    # one colour, for stamps, embroidery and single-ink print
    "mono": {"child": "#18234a", "lift": "#18234a", "text": "#18234a"},
}


def instance(wght, opsz):
    font = TTFont(FONT_SRC)
    inst = instancer.instantiateVariableFont(font, {"wght": wght, "opsz": opsz})
    inst.flavor = None
    path = Path(tempfile.gettempdir()) / f"literata-{wght}-{opsz}.ttf"
    inst.save(path)
    return path


def text_path(ttf_path, text, size, x, baseline):
    """Shape text with HarfBuzz and return (svg path data, advance width)."""
    blob = hb.Blob.from_file_path(str(ttf_path))
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    tt = TTFont(ttf_path)
    upem = tt["head"].unitsPerEm
    glyphset = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    scale = size / upem
    pen = SVGPathPen(glyphset, ntos=lambda v: f"{v:.1f}")
    pen_x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        gx = x + (pen_x + pos.x_offset) * scale
        tpen = TransformPen(pen, (scale, 0, 0, -scale, gx, baseline - pos.y_offset * scale))
        glyphset[order[info.codepoint]].draw(tpen)
        pen_x += pos.x_advance
    return pen.getCommands(), pen_x * scale


def cap_height(ttf_path):
    tt = TTFont(ttf_path)
    return tt["OS/2"].sCapHeight / tt["head"].unitsPerEm


def mark_paths(p, star_scale=1.0):
    star = shapes["star"]
    star_g = ""
    if star_scale != 1.0:
        cx, cy = 868, 90  # centre of the star
        star_g = f' transform="translate({cx} {cy}) scale({star_scale}) translate({-cx} {-cy})"'
    return (
        f'<path fill="{p["lift"]}" d="{shapes["lift"]}"/>'
        f'<path fill="{p["child"]}" d="{shapes["arms"]}{shapes["head"]}"/>'
        f'<path fill="{p["child"]}"{star_g} d="{star}"/>'
    )


def svg(viewbox, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-labelledby="t">'
        f'<title id="t">{title}</title>{body}</svg>\n'
    )


MARK_VB = "-4 -4 1036 1788"
bold = instance(700, 72)
semi = instance(600, 36)

for name, p in PALETTES.items():
    suffix = "" if name == "color" else f"-{name}"

    # 1. The mark on its own
    (OUT / f"mk-mark{suffix}.svg").write_text(svg(MARK_VB, mark_paths(p), "MK Foundation"))

    # 2. Stacked lockup: the name tucked inside the lower sweep, as in the original design
    mk_size = 250 / cap_height(bold)
    mk_d, _ = text_path(bold, "MK", mk_size, 448, 1505)
    fd_size = 150 / cap_height(semi)
    fd_d, fd_w = text_path(semi, "Foundation", fd_size, 452, 1722)
    width = max(1030, 452 + fd_w) + 8
    body = mark_paths(p) + f'<path fill="{p["text"]}" d="{mk_d}{fd_d}"/>'
    (OUT / f"mk-logo-stacked{suffix}.svg").write_text(
        svg(f"-4 -4 {width:.0f} 1788", body, "MK Foundation")
    )

    # 3. Horizontal lockup: mark beside the full name, for letterheads and email signatures
    line = 300 / cap_height(semi)
    l1, w1 = text_path(semi, "Mubashir Kaleem", line, 1240, 1030)
    l2, w2 = text_path(semi, "Foundation", line, 1240, 1460)
    width = 1240 + max(w1, w2) + 20
    body = mark_paths(p) + f'<path fill="{p["text"]}" d="{l1}{l2}"/>'
    (OUT / f"mk-logo-horizontal{suffix}.svg").write_text(
        svg(f"-4 -4 {width:.0f} 1788", body, "Mubashir Kaleem Foundation")
    )

# 4. App icon and favicon: the child reaching for the star, without the lifting sweep.
# The full mark is tall and narrow and shrinks to a speck at 16px; this part is
# nearly square, so it fills the tile and stays legible.
c = PALETTES["color"]
icon_body = (
    '<rect x="20" y="-80" width="1100" height="1100" rx="200" fill="#fbfbf8"/>'
    f'<g transform="translate(574 466) scale(0.92) translate(-568 -488)">'
    f'<path fill="{c["child"]}" d="{shapes["arms"]}{shapes["head"]}"/>'
    f'<path fill="{c["child"]}" transform="translate(868 90) scale(1.3) translate(-868 -90)" d="{shapes["star"]}"/>'
    "</g>"
)
(OUT / "icon.svg").write_text(svg("20 -80 1100 1100", icon_body, "MK Foundation"))
print("written to", OUT)
