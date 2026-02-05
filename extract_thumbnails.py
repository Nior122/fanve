import re
import sys

content = sys.stdin.read()
# Match thumbnail URLs: https://img.coomer.st/thumbnail/data/...
matches = re.findall(r'https://img\.coomer\.st/thumbnail/data/[a-z0-9/]+\.jpg', content)
for m in matches:
    print(m)
