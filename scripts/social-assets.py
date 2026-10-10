from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent / 'public'
bg, ink, accent = '#ffffff', '#0a0a0a', '#171717'
font_dir = Path('C:/Windows/Fonts')
large = ImageFont.truetype(str(font_dir / 'segoeuib.ttf'), 104)
body = ImageFont.truetype(str(font_dir / 'segoeui.ttf'), 38)
label = ImageFont.truetype(str(font_dir / 'consola.ttf'), 22)
image = Image.new('RGB', (1200, 630), bg)
draw = ImageDraw.Draw(image)
draw.text((72, 65), 'AI ENGINEER & GENERALIST', fill=accent, font=label)
draw.text((65, 165), 'Tritam Mohanty.', fill=ink, font=large)
draw.text((72, 340), 'Curious by nature. Building with AI.', fill=ink, font=body)
draw.line((72, 515, 1128, 515), fill='#e5e5e5', width=2)
draw.text((72, 550), 'tritammohanty.github.io', fill=accent, font=label)
image.save(root / 'social.png', optimize=True)
icon = Image.new('RGB', (180, 180), accent)
icon_draw = ImageDraw.Draw(icon)
icon_font = ImageFont.truetype(str(font_dir / 'segoeuib.ttf'), 150)
icon_draw.text((54, -23), 't', fill=bg, font=icon_font)
icon.save(root / 'apple-touch-icon.png', optimize=True)
icon.save(root / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
