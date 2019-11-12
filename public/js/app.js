const firstRow = document.getElementById('row1')
const secondRow = document.getElementById('row2')
const thirdRow = document.getElementById('row3')
const db = firebase.firestore();

db.collection('devices').get().then((devices) => {
    devices.forEach((doc) => {
        let devType = doc.data().device_name
        let cta = document.createElement('div')
        cta.className = 'cta ' + doc.data().led_color
        if (devType === 'light') {
            cta.innerHTML = doc.data().device_position
            cta.id = doc.id
            cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
            row1.appendChild(cta)
        } else if (devType === 'socket') {
            cta.innerHTML = doc.data().device_position
            cta.id = doc.id
            cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
            row2.appendChild(cta)
        } else if (devType === 'door') {
            cta.innerHTML = doc.data().device_position
            cta.id = doc.id
            cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
            row3.appendChild(cta)
        }
    })
});

toggleStatus = (id, status) => {
    db.collection('devices').doc(id).update({
        status: !status
    })
}
