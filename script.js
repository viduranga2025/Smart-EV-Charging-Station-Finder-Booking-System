// Database with Coordinates
const stations = [
    { id: 1, name: "FastVolt Matara", x: 1200, y: 1050, type: "CCS2", status: "Free", speed: "150kW" },
    { id: 2, name: "City Mall Hub", x: 800, y: 900, type: "Type 2", status: "Busy", speed: "22kW" },
    { id: 3, name: "Highway Point E01", x: 1100, y: 1300, type: "CCS2", status: "Free", speed: "120kW" },
    { id: 4, name: "Eco Park Station", x: 950, y: 1100, type: "Type 2", status: "Free", speed: "40kW" }
];

const mapGrid = document.getElementById('mapGrid');

// 1. Initial Map Render
function initMap() {
    renderMarkers(stations);
    moveMap('center');
}

function renderMarkers(data) {
    // Clear old markers (keep user pos)
    const oldMarkers = document.querySelectorAll('.station-marker');
    oldMarkers.forEach(m => m.remove());

    data.forEach(st => {
        const marker = document.createElement('div');
        marker.className = `station-marker ${st.status.toLowerCase()}`;
        marker.style.left = st.x + 'px';
        marker.style.top = st.y + 'px';
        marker.innerHTML = `<i class="fa-solid fa-bolt"></i>`;
        
        marker.onclick = () => {
            focusStation(st);
            showDetails(st);
        };
        mapGrid.appendChild(marker);
    });
}

// 2. Interactive Map Movement
function moveMap(mode) {
    if(mode === 'center') {
        mapGrid.style.transform = `translate(-500px, -500px)`; // Centering user
    }
}

function focusStation(st) {
    const offsetX = 1000 - st.x;
    const offsetY = 1000 - st.y;
    mapGrid.style.transform = `translate(${offsetX - 500}px, ${offsetY - 500}px)`;
}

// 3. Filter Logic
function filterStations(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let filtered = stations;
    if(type === 'CCS2') filtered = stations.filter(s => s.type === 'CCS2');
    if(type === 'Free') filtered = stations.filter(s => s.status === 'Free');
    
    renderMarkers(filtered);
}

// 4. Panel Interactions
function showDetails(st) {
    const panel = document.getElementById('infoPanel');
    const body = document.getElementById('panelBody');
    
    panel.classList.remove('hidden');
    body.innerHTML = `
        <div style="display:flex; justify-content:space-between;">
            <h2>${st.name}</h2>
            <span style="color:${st.status === 'Free' ? '#00ff88' : '#ff4444'}">${st.status}</span>
        </div>
        <p><i class="fa-solid fa-bolt"></i> ${st.speed} • ${st.type} Connector</p>
        <div style="display:flex; gap:10px; margin:20px 0;">
            <div class="card-glass" style="flex:1">Distance: 1.2km</div>
            <div class="card-glass" style="flex:1">Price: Rs. 90/kWh</div>
        </div>
        <button class="booking-btn" onclick="startBooking(${st.id})" 
            style="width:100%; padding:15px; border-radius:15px; border:none; background:#00ff88; font-weight:bold; cursor:pointer;">
            ${st.status === 'Free' ? 'Book Charging Slot' : 'Notify when Free'}
        </button>
    `;
}

function startBooking(id) {
    const btn = event.target;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
    setTimeout(() => {
        btn.innerHTML = 'Booking Confirmed!';
        btn.style.background = '#00d4ff';
        alert("Slot reserved for 15 minutes. Navigation started!");
    }, 2000);
}

function togglePanel() {
    document.getElementById('infoPanel').classList.toggle('hidden');
}

window.onload = initMap;