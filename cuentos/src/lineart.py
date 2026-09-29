"""Convierte las ilustraciones a color (img/<cuento>/color/*.png) en páginas para
colorear en blanco y negro puro (img/<cuento>/line/*.png)."""
import cv2, numpy as np, os, glob
HERE = os.path.dirname(os.path.abspath(__file__))

def lineart(src, dst):
    img = cv2.imread(src)
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    g = cv2.bilateralFilter(g, 9, 60, 60)
    edges = cv2.adaptiveThreshold(g, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 6)
    dark = (g < 70).astype(np.uint8) * 255
    lines = cv2.bitwise_or(255 - edges, dark)
    lines = cv2.morphologyEx(lines, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    n, lab, stats, _ = cv2.connectedComponentsWithStats(lines, 8)
    big = np.where(stats[:, cv2.CC_STAT_AREA] >= 60)[0]
    big = big[big != 0]
    keep = (np.isin(lab, big).astype(np.uint8)) * 255
    keep = cv2.dilate(keep, np.ones((3, 3), np.uint8), iterations=1)
    cv2.imwrite(dst, 255 - keep)

if __name__ == '__main__':
    n = 0
    for src in sorted(glob.glob(os.path.join(HERE, 'img', '*', 'color', '*.png'))):
        dst = src.replace(os.sep + 'color' + os.sep, os.sep + 'line' + os.sep)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        lineart(src, dst); n += 1
    print('páginas para colorear generadas:', n)
