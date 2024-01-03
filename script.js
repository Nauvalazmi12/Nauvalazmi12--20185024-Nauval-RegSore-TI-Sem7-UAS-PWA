if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

function showPage(pageId) {
    document.querySelectorAll('main > div').forEach(function (page) {
        page.classList.remove('visible');
    });

    document.getElementById(pageId).classList.add('visible');

    if (pageId === 'page2') {
        // Lakukan scroll otomatis ke halaman IndexDB
        window.scrollTo({
            top: document.getElementById(pageId).offsetTop,
            behavior: 'smooth'
        });
    }
}

// Menambahkan variabel untuk menyimpan objek IndexDB
let db;

// Membuka atau membuat database IndexDB
const openDB = () => {
    const request = indexedDB.open('my-pwa-db', 1);

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('formData', { keyPath: 'nim' });
        objectStore.createIndex('nama', 'nama', { unique: false });
        objectStore.createIndex('kelas', 'kelas', { unique: false });
        objectStore.createIndex('motto', 'motto', { unique: false });
        objectStore.createIndex('tujuan', 'tujuan', { unique: false });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('IndexDB berhasil dibuka');
    };

    request.onerror = (event) => {
        console.error('Error saat membuka IndexDB:', event.target.errorCode);
    };
};

// Menyimpan data ke dalam IndexDB
const saveFormData = () => {
    const formData = {
        nama: document.getElementById('nama').value,
        nim: document.getElementById('nim').value,
        kelas: document.getElementById('kelas').value,
        motto: document.getElementById('motto').value,
        tujuan: document.getElementById('tujuan').value,
    };

    const transaction = db.transaction(['formData'], 'readwrite');
    const objectStore = transaction.objectStore('formData');

    const request = objectStore.add(formData);

    request.onsuccess = () => {
        console.log('Data berhasil disimpan di IndexDB');
        showIndexedDBData();
        clearForm();
    };

    request.onerror = (event) => {
        console.error('Error saat menyimpan data di IndexDB:', event.target.errorCode);
    };
};

// Menampilkan data dari IndexDB
const showIndexedDBData = () => {
    const transaction = db.transaction(['formData'], 'readonly');
    const objectStore = transaction.objectStore('formData');
    const request = objectStore.openCursor();

    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const listItem = document.createElement('li');
            listItem.textContent = `NIM: ${cursor.key}, Nama: ${cursor.value.nama}, Kelas: ${cursor.value.kelas}, Motto: ${cursor.value.motto}, Tujuan: ${cursor.value.tujuan}`;
            dataList.appendChild(listItem);
            cursor.continue();
        }
    };

    request.onerror = (event) => {
        console.error('Error saat membaca data dari IndexDB:', event.target.errorCode);
    };
};

// Membersihkan formulir setelah menyimpan data
const clearForm = () => {
    document.getElementById('nama').value = '';
    document.getElementById('nim').value = '';
    document.getElementById('kelas').value = '';
    document.getElementById('motto').value = '';
    document.getElementById('tujuan').value = '';
};

// Inisialisasi pembukaan database IndexDB saat halaman dimuat
openDB();



// ... (Kode lainnya)

document.addEventListener('DOMContentLoaded', function () {
    showIndexedDBData();

    if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                console.log('Izin push notification diterima.');
            } else if (permission === 'denied') {
                console.warn('Izin push notification ditolak.');
            }
        });
    }
});

// ... (Kode lainnya)




function requestPushPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                console.log('Izin push notification diterima.');
                showNotification('Izin Push Notification Diterima!', 'Anda sekarang dapat menerima push notification.');
            } else if (permission === 'denied') {
                console.warn('Izin push notification ditolak.');
            }
        });
    }
}

function showNotification(title, message) {
    if ('Notification' in window) {
        new Notification(title, { body: message });
    }
}



//fungsi page
function showPage(pageId) {
    document.querySelectorAll('main > div').forEach(function (page) {
        page.classList.remove('visible');
    });

    document.getElementById(pageId).classList.add('visible');

    if (pageId === 'page2') {
        // Lakukan scroll otomatis ke halaman IndexDB
        window.scrollTo({
            top: document.getElementById(pageId).offsetTop,
            behavior: 'smooth'
        });
    }
}
