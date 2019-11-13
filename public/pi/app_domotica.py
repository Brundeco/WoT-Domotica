import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from sense_hat import SenseHat
sense = SenseHat()
from time import sleep

cred = credentials.Certificate('private_key/pk_domotica.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
docs = db.collection(u'devices').get()

colorBlue = [30, 30, 255]
colorYellow = [255, 255, 30]
colorRed = [255, 30, 30]

colorDBlue = [0, 0, 50]
colorDYellow = [50, 50, 0]
colorDRed = [50, 0, 0]

def on_snapshot(doc_snapshot, changes, read_time):    
    for doc in docs:
        dd = doc.to_dict()
        print(dd['status'])
        if dd['status']:
            if dd['device_name'] == 'socket':
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorBlue)
            elif dd['device_name'] == 'door':
                grid_pos = dd['matrix_position']
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorRed)
            elif dd['device_name'] == 'light':
                grid_pos = dd['matrix_position']
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorYellow)
        else:
            if dd['device_name'] == 'socket':
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorDBlue)
            elif dd['device_name'] == 'door':
                grid_pos = dd['matrix_position']
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorDRed)
            elif dd['device_name'] == 'light':
                grid_pos = dd['matrix_position']
                sense.set_pixel(dd['matrix_position'][0], dd['matrix_position'][1], colorDYellow)
                
    sensor_values = {
        'humidity': sense.get_humidity(),
        'temperature': sense.get_temperature()
    }
    
    db.collection('sensordata').document('sensordata').set(sensor_values)
           
doc_ref = db.collection(u'devices')
doc_watch = doc_ref.on_snapshot(on_snapshot)

while True:
    sleep(2)
