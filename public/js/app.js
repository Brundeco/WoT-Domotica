const firstRow = document.getElementById('row1')
const secondRow = document.getElementById('row2')
const thirdRow = document.getElementById('row3')
const db = firebase.firestore();

renderDevices = () => {
    db.collection('devices').get().then((devices) => {
        removeChildEls()
        devices.forEach((doc) => {
            let devType = doc.data().device_name
            let cta = document.createElement('div')
            let statusIndicator = document.createElement('div')
            cta.className = 'cta ' + doc.data().led_color
            if (devType === 'light') {
                cta.innerHTML = doc.data().device_position
                cta.id = doc.id
                cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
                statusIndicator.classList.add(doc.data().status ? 'active' : 'non-active')
                cta.appendChild(statusIndicator)
                row1.appendChild(cta)
            } else if (devType === 'socket') {
                cta.innerHTML = doc.data().device_position
                cta.id = doc.id
                cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
                statusIndicator.classList.add(doc.data().status ? 'active' : 'non-active')
                cta.appendChild(statusIndicator)
                row2.appendChild(cta)
            } else if (devType === 'door') {
                cta.innerHTML = doc.data().device_position
                cta.id = doc.id
                cta.addEventListener('click', () => toggleStatus(doc.id, doc.data().status))
                statusIndicator.classList.add(doc.data().status ? 'active' : 'non-active')
                cta.appendChild(statusIndicator)
                row3.appendChild(cta)
            }
        })
    });
}

removeChildEls = () => {
    firstRow.innerHTML = ''
    secondRow.innerHTML = ''
    thirdRow.innerHTML = ''
}
renderDevices()

toggleStatus = (id, status) => {
    db.collection('devices').doc(id).update({
        status: !status
    })
    renderDevices()
}

fetchSensorData = () => {
    db.collection('sensordata').get().then((sensordata) => {
        sensordata.forEach((doc) => {
            let temperature = (doc.data().temperature).toFixed(2) + ' °C'
            let humidity = doc.data().humidity.toFixed(2) + ' %'
            let childDivTemp = document.querySelector('.child-div.temp')
            let childDivHum = document.querySelector('.child-div.hum')

            childDivTemp.innerHTML = temperature;
            childDivHum.innerHTML = humidity
        })
    });
}
fetchSensorData()


