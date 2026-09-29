"""Descarga a img/<cuento>/<color|line>/<n>.png todo lo registrado en state.json que falte."""
import json, os, subprocess, sys
HERE=os.path.dirname(os.path.abspath(__file__))
st=json.load(open(os.path.join(HERE,'state.json')))
n=0
for mode in ('color','line'):
    for key,v in st[mode].items():
        if not v.get('url'): continue
        story,page=key.split('|')
        d=os.path.join(HERE,'img',story,mode); os.makedirs(d,exist_ok=True)
        dst=os.path.join(d,f'{page}.png')
        if os.path.exists(dst): continue
        r=subprocess.run(['curl','-sS','-f','--retry','3','-o',dst,v['url']]); n+=1
        if r.returncode: print('fallo',key); os.path.exists(dst) and os.remove(dst)
print('descargadas', n)
