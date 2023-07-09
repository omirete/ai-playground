files = {
    "PRIVATE_KEY": 'private.key',
    "PUBLIC_KEY": 'public.pem'
}

for var, filename in files.items():
    with open(filename, 'r', encoding='utf-8') as f:
        print(f"{var}=" + '\\n'.join([x.strip() for x in f.readlines()]))
