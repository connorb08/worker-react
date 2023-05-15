import hashlib
import subprocess
import sys

# File to check
css = 'app/styles/index.css'

# Open,close, read file and calculate MD5 on its contents 
with open(css, 'rb') as file:
    # read contents of the file
    data = file.read()    
    # pipe contents of the file through
    hash = hashlib.md5(data).hexdigest()

hash = hash[0:8]
outfile = f'./public/build/tailwind-{hash}.css'
scriptfile = f'/build/tailwind-{hash}.css'

print(scriptfile)

subprocess.run(['yarn', 'tailwindcss', '-o', outfile, '--minify'], stdout=subprocess.DEVNULL,
    stderr=subprocess.STDOUT)