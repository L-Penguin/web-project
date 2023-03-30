import cv2
import numpy as np

for i in range(1, 23):
    img = np.zeros((500, 500, 3), dtype=np.uint8)
    img[:, :, :] = [0, 0, 0]
    text = str(i) if i < 22 else 'unconnected'
    name = str(i).zfill(4)
    img = cv2.putText(img, text, (25, 75), cv2.FONT_HERSHEY_COMPLEX, 2, (255, 255, 255), 5)
    print(name, text)
    cv2.imwrite(f'./dist/imgs/{name}.jpg', img)