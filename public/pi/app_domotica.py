import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from sense_hat import SenseHat
sense = SenseHat()

colorBlue = [30, 30, 255]
colorYellow = [255, 255, 30]
colorRed = [255, 30, 30]

# Use a service account
cred = credentials.Certificate('private_key/pk_domotica.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

docs = db.collection(u'devices').get()

for doc in docs:
    dd = doc.to_dict()
    if dd['status']:
        if dd['device_name'] == 'socket':
            sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorBlue)
        elif dd['device_name'] == 'door':
            grid_pos = dd['matrix_position']
            sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorRed)
        elif dd['device_name'] == 'light':
            grid_pos = dd['matrix_position']
            sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorYellow)
