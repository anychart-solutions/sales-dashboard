#!/usr/bin/env python
import re

with open('./data.js') as f:
    content = f.read()


def replacement(match):
    return match.group(1).upper()

content = re.sub(r'(\"fr-[a-z]\"){1}', replacement, content)

content = content.replace('FR-', 'FR.')

out = open('data2.js', 'w')
out.write(content)
out.close()