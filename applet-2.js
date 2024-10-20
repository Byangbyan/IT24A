class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();


        this.attendanceCountB = 0;
        this.attendanceCountW = 0;
        this.attendanceCountK = 0;

        this.loggedData = [];

        this.btn = document.getElementById('btn1');
        this.btn1 = document.getElementById('btn2');
        this.btn2 = document.getElementById('btn3');

        this.btnclear = document.getElementById('btnclear');
        this.logCountElement = document.getElementById('logCountBukels');
        this.logCount1Element = document.getElementById('logCountWWE');
        this.logCount2Element = document.getElementById('logCountKNN');
        this.idContainer = document.getElementById('logContainer');

        this.btn.addEventListener('click', () => this.dataB());
        this.btn1.addEventListener('click', () => this.dataW());
        this.btn2.addEventListener('click', () => this.dataK());
        this.btnclear.addEventListener('click', () => this.clearLogs());

        
    }

    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> NBSC Map'
        }).addTo(this.map);
    }

    addMarker(lat, long, message) {
        const marker = L.marker([lat, long]).addTo(this.map)
            .bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error("Error Loading servers:", error));
    }




    clearLogs() {
        this.attendanceCountB = 0;
        this.attendanceCountW = 0;
        this.attendanceCountK = 0;

        this.loggedData = [];
        this.updateLogDisplay();
    }

    displayLogCount() {
        this.logCountElement.innerHTML = `SC building: ${this.attendanceCountB}`;
        this.logCount1Element.innerHTML = `CSS Laboratory 1: ${this.attendanceCountW}`;
        this.logCount2Element.innerHTML = `BA building: ${this.attendanceCountK}`;
    }

    dataB() {
        this.addMarker(8.360238, 124.867470, "SC building");
        this.attendanceCountB++;
        this.updateLogDisplay();
    }

    dataW() {
        this.addMarker(8.359639, 124.869179, 'CSS Laboratory 1');
        this.attendanceCountW++;
        this.updateLogDisplay();
    }

    dataK() {
        this.addMarker(8.359134, 124.868537, 'BA building');
        this.attendanceCountK++;
        this.updateLogDisplay();
    }

    updateLogDisplay() {
        this.idContainer.innerHTML = '';
        this.loggedData.forEach(data => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            this.idContainer.appendChild(logItem);
        });
        this.displayLogCount();


    }
}
const Mymap = new LeafletMap('map', [8.359735, 124.869206], 18);


Mymap.loadMarkersFromJson('applet-2.json');

document.addEventListener('DOMContentLoaded', () => {
    Mymap.displayLogCount();
    Mymap.loadMarkersFromJson('applet-2.json');
});