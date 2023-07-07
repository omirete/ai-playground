from PIL import Image

image = Image.open('public/logo.jpeg')
sizes = [
    48,
    72,
    96,
    144,
    168,
    192,
]

for size in sizes:
    new_image = image.resize((size, size))
    new_image.save(f'public/logo_{size}.jpeg')
