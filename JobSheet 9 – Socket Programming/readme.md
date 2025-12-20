<p align="left">
  <a href="..">
    <img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI-6c757d?style=for-the-badge" width="130">
  </a>
</p>

<div align="center">
  <a href="https://unp.ac.id/">
    <img src="https://unp.ac.id/nfs-assets/all/images/logo_unp_white.png" alt="UNP" width="400"/>
  </a>
</div>
<br>

<p align="center">
  <strong style="font-size: 1.5em;">PRAKTIKUM PEMROGRAMAN JARINGAN</strong><br>
  <em style="font-size: 1.1em;">Jobsheet 9 – Socket Programming</em>
</p>

<p align="center">
  <small>Real-Time Communication • WebSocket • Socket.io • Event-Driven Architecture</small>
</p>

<hr>

<p align="center">
  <small>
    Nama : <b>Fattan Naufan Islami</b> &nbsp;|&nbsp;
    NIM : <b>23343037</b> &nbsp;|&nbsp;
    Prodi : <b>Informatika</b>
  </small>
</p>

---

<h2 align="center">🎯 Tujuan Praktikum</h2>

<ul>
  <li>Memahami Socket Programming sebagai paradigma komunikasi real-time dalam jaringan</li>
  <li>Mempelajari WebSocket dan Socket.io sebagai tools untuk implementasi komunikasi bidirectional</li>
  <li>Mengimplementasikan event-driven architecture untuk menangani komunikasi client–server</li>
  <li>Membangun aplikasi chat real-time yang memungkinkan multiple clients berkomunikasi secara simultan</li>
  <li>Menguasai konsep broadcast, room management, dan event handling dalam Socket.io</li>
  <li>Memahami alur data dalam komunikasi real-time dan sinkronisasi state antar client</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep yang Digunakan</h2>

### Socket Programming
Socket adalah endpoint komunikasi dalam jaringan yang memungkinkan two-way communication. Berbeda dengan HTTP request–response yang bersifat one-directional, socket memungkinkan server mengirim data ke client kapan saja tanpa menunggu request.

### WebSocket Protocol
WebSocket adalah protokol komunikasi yang dibangun di atas TCP/IP yang menyediakan full-duplex communication channels. Karakteristik WebSocket:
- **Persistent Connection:** Koneksi tetap terbuka, tidak perlu reconnect setiap request
- **Bidirectional:** Baik client maupun server dapat mengirim data kapan saja
- **Low Latency:** Ideal untuk aplikasi real-time

### Socket.io
Socket.io adalah library yang memudahkan implementasi WebSocket dengan fallback ke polling jika WebSocket tidak support:
- **Event-Based Communication:** Komunikasi berbasis event (emit dan on)
- **Automatic Reconnection:** Handle reconnection otomatis
- **Broadcasting:** Mengirim pesan ke multiple clients sekaligus
- **Room Management:** Mengelompokkan clients dalam rooms untuk komunikasi terpilih

### Event-Driven Architecture
Aplikasi Socket.io menggunakan paradigma event-driven:
- **Server Events:** `connection`, `disconnect`, custom events (`join`, `kirimPesan`)
- **Client Events:** Listening ke server events dan merespons dengan tindakan
- **Event Handlers:** Function yang dijalankan ketika event tertentu terjadi

### Real-Time Communication Flow

```
Client 1                          Server                         Client 2
   │                               │                               │
   ├─ emit('kirimPesan') ─────────>│                               │
   │                               ├─ broadcast to room ──────────>│
   │                               │       emit('pesan')           │
   │                               │                        (display)
   │<─────────────────── emit('pesan') ──────────────────────────┤
   │        (display)              │                               │
   │                               │                               │
```

<hr>

<h2 align="center">⚙️ Implementasi Praktikum</h2>

### Arsitektur Aplikasi Ruang Obrol

Aplikasi terdiri dari server Socket.io dan client web:

```
ruangobrol/
├── src/
│   ├── index.js           ← Server Socket.io & Express
│   └── utils/
│       ├── messages.js    ← Helper generate message
│       └── users.js       ← Helper manage users in rooms
├── public/                ← Client-side
│   ├── index.html         ← Login page
│   ├── chat.html          ← Chat interface
│   ├── js/
│   │   └── chat.js        ← Client Socket.io logic
│   └── css/
│       └── styles.css     ← Styling
└── package.json           ← Dependencies
```

### Server-Side Implementation

**File: `src/index.js`**

Setup Server Socket.io:
```javascript
const app = express();
const server = createServer(app);
const io = new Server(server);
```

**Event Handlers pada Server:**

1. **`connection` Event:**
   - Triggered ketika client connect ke server
   - Server log koneksi baru

2. **`join` Event:**
   - Client mengirim username dan room
   - Server menambah user ke room dengan utility `tambahPengguna()`
   - Server emit welcome message ke user
   - Server broadcast notification ke users lain di room
   - Server emit updated user list ke semua client di room

3. **`kirimPesan` Event:**
   - Client mengirim pesan
   - Server ambil user dari socket id
   - Server validasi profanity dengan `bad-words` filter
   - Server broadcast pesan ke semua clients di room yang sama

4. **`kirimLokasi` Event:**
   - Client mengirim koordinat lokasi
   - Server generate Google Maps link
   - Server broadcast location ke room

5. **`disconnect` Event:**
   - Triggered ketika client disconnect
   - Server hapus user dari memory dengan `hapusPengguna()`
   - Server notify users lain di room bahwa user telah keluar

### Client-Side Implementation

**File: `public/js/chat.js`**

Setup Client Socket.io:
```javascript
const socket = io();
```

**Event Listeners pada Client:**

1. **`pesan` Event:**
   - Listen pesan dari server
   - Render pesan menggunakan Mustache template
   - Auto-scroll ke pesan terbaru

2. **`locationMessage` Event:**
   - Receive location message dari server
   - Render clickable link ke Google Maps

3. **`roomData` Event:**
   - Receive user list dari server
   - Update sidebar untuk tampilkan active users

**Event Emitters pada Client:**

1. **`join` Event (on page load):**
   - Emit username dan room dari URL parameters
   - Callback dijalankan jika join berhasil atau error

2. **`kirimPesan` Event (on form submit):**
   - Emit pesan text ke server
   - Clear input field
   - Callback untuk error handling

3. **`kirimLokasi` Event (on button click):**
   - Get geolocation dari browser
   - Emit coordinates ke server

### Message dan User Management Utilities

**`src/utils/messages.js`:**
- `generateMessage(username, text)` – Create message object dengan timestamp
- `generateLocationMessage(username, url)` – Create location message

**`src/utils/users.js`:**
- `tambahPengguna()` – Add user ke room, validate duplicate username
- `hapusPengguna()` – Remove user dari room
- `ambilPengguna()` – Get user by socket id
- `ambilPenggunaDariRoom()` – Get all users in specific room

### Alur Komunikasi Lengkap: User Join dan Send Message

**Scenario: User1 join room "Teknologi"**

```
1. Client (User1)
   └─ Load chat.html dengan params: ?username=User1&room=Teknologi
   └─ emit('join', { username, room }, callback)

2. Server
   ├─ Event handler menerima join request
   ├─ Validasi dan tambah user ke memory
   ├─ socket.join(room) – assign socket ke room group
   ├─ emit('pesan') ke User1: "Selamat datang!"
   ├─ broadcast.to(room).emit('pesan') ke User2, User3: "User1 telah bergabung"
   ├─ io.to(room).emit('roomData') ke semua di room: update user list

3. Clients di room
   ├─ User1 terima welcome message
   ├─ User2, User3 terima join notification
   ├─ Semua user terima updated user list di sidebar
```

**Scenario: User1 send message "Halo"**

```
1. Client (User1)
   └─ emit('kirimPesan', 'Halo', callback)

2. Server
   ├─ Event handler menerima message
   ├─ Cek profanity dengan bad-words filter
   ├─ Jika valid, io.to(room).emit('pesan') ke semua di room
   ├─ Include username dan timestamp

3. Clients di room (User1, User2, User3)
   ├─ Listen 'pesan' event
   ├─ Render pesan ke chat window
   ├─ Auto-scroll ke pesan terbaru
```

### Room Management

Aplikasi menggunakan room concept dalam Socket.io:
- Setiap user join specific room (misal: "Teknologi", "Olahraga")
- Broadcast hanya dikirim ke clients dalam room yang sama
- Users di room berbeda tidak bisa melihat messages satu sama lain

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Implementasi Socket Programming

Aplikasi chat real-time berhasil diimplementasikan dengan Socket.io dan menunjukkan komunikasi bidirectional yang bekerja optimal antara server dan multiple clients.

### Aspek-Aspek yang Diimplementasikan

**1. Event-Driven Communication**
- Server events (`join`, `kirimPesan`, `disconnect`) dihandle dengan baik
- Client listeners merespons server events dengan tepat
- Event callback untuk error handling berfungsi optimal

**2. Bidirectional Data Transfer**
- Client dapat mengirim data ke server kapan saja (tidak harus request–response)
- Server dapat mengirim data ke client tanpa diminta
- Multiple clients dapat berkomunikasi secara simultan

**3. Broadcasting dan Room Management**
- `socket.broadcast.to(room)` mengirim ke semua clients KECUALI sender
- `io.to(room)` mengirim ke semua clients dalam room (termasuk sender)
- Room isolation bekerja: messages dari room lain tidak tampil

**4. Real-Time Synchronization**
- User list di sidebar sinkron untuk semua clients di room
- Join/leave notifications langsung tampil untuk semua
- Messages tampil real-time tanpa refresh page

**5. Message Validation dan Filtering**
- Bad-words library memfilter pesan tidak pantas
- Error callback memberikan feedback ke client jika ada masalah
- Server-side validation mencegah data invalid

**6. User Management**
- Unique username dalam satu room dijaga
- User otomatis dihapus saat disconnect
- Socket id digunakan untuk track individual user

### Analisis Alur Data Real-Time

Perbedaan dengan HTTP request–response:

| Aspek | HTTP (REST API) | Socket.io |
|-------|-----------------|-----------|
| **Connection** | Request–response, stateless | Persistent connection, stateful |
| **Initiator** | Only client dapat initiate | Baik client maupun server |
| **Latency** | Lebih tinggi (handshake setiap request) | Lebih rendah (connection reuse) |
| **Broadcasting** | Tidak native (perlu polling) | Built-in dengan room concept |
| **Real-Time** | Tidak ideal untuk real-time | Ideal untuk real-time |

### Sinkronisasi State Antar Client

Ketika User1 join room "Teknologi":
- Server update internal user list
- Server emit updated list ke ALL clients di room
- Semua clients update sidebar mereka
- State tetap sinkron tanpa polling

Ini adalah keunggulan Socket.io: single broadcast bisa sinkron multiple clients instantly.

### Kesesuaian dengan Tujuan Jobsheet

Semua tujuan praktikum tercapai:
- Socket Programming dipahami sebagai paradigma komunikasi real-time ✓
- WebSocket dan Socket.io diimplementasikan dengan baik ✓
- Event-driven architecture diterapkan untuk handling events ✓
- Aplikasi chat real-time multi-user berhasil dibangun ✓
- Room management dan broadcasting bekerja optimal ✓
- Alur komunikasi real-time dipahami dan dianalisis ✓

<hr>

<h2 align="center">📸 Dokumentasi Praktikum</h2>

**Screenshot 1 – Halaman Login User 1**
<div align="center">
  <img src="Foto/Login_User1.png" width="80%" alt="Login User 1">
</div>

<br>

**Screenshot 2 – Halaman Login User 2**
<div align="center">
  <img src="Foto/Login_User2.png" width="80%" alt="Login User 2">
</div>

<br>

**Screenshot 3 – Contoh Implementasi Chat (Real-Time Communication)**
<div align="center">
  <img src="Foto/Contoh_Implementasi_Chat.png" width="80%" alt="Contoh Chat">
</div>

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Proses implementasi Socket Programming berjalan dengan lancar dengan beberapa poin pembelajaran:

1. **Event Naming dan Callback:** Memastikan event names konsisten antara client dan server memerlukan attention. Typo dalam event name akan menyebabkan listener tidak merespons.

2. **Room Context dalam Event Handler:** Mengambil user information dari socket id memerlukan pemahaman tentang bagaimana Socket.io menyimpan data per-connection. Utility functions dalam `users.js` membantu abstract complexity ini.

3. **Browser Geolocation API:** Feature `kirimLokasi` memerlukan user permission. Handling case dimana user reject geolocation request perlu proper error handling di client.

4. **Session-Based Architecture:** Aplikasi bersifat in-memory session-based. Jika server restart, semua data user dan pesan hilang. Ini adalah trade-off antara simplicity dan persistence yang dianggap acceptable untuk praktikum ini.

Kendala-kendala ini berhasil diatasi dengan proper error handling dan user feedback mechanisms.

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui praktikum Jobsheet 9, aku memperoleh pemahaman fundamental tentang Socket Programming dan bagaimana paradigma ini mengubah cara kita memikirkan komunikasi dalam jaringan. Praktikum ini menunjukkan bahwa komunikasi jaringan tidak selalu harus follow request–response pattern HTTP; ada paradigma lain yang lebih powerful untuk use cases tertentu seperti real-time chat. Socket.io memberikan abstraksi yang elegant di atas WebSocket, membuat implementasi two-way communication menjadi straightforward dengan event-based architecture. Dengan membangun aplikasi chat multi-user, aku dapat melihat bagaimana event dapat di-broadcast ke multiple clients, bagaimana room concept memisahkan komunikasi, dan bagaimana state tetap sinkron antar clients tanpa explicit polling.

Pengalaman mengimplementasikan Socket Programming ini mengajarkan bahwa modern network applications memerlukan tools yang berbeda untuk different communication patterns. HTTP REST API sangat baik untuk stateless request–response operations, tetapi untuk real-time collaboration dan live updates, Socket-based communication adalah the way to go. Aplikasi chat yang kami bangun, meskipun sederhana, mendemonstrasikan core concepts yang sama digunakan dalam production systems seperti Slack, Discord, dan collaborative tools lainnya. Skill Socket Programming yang diperoleh dari praktikum ini akan become increasingly important dalam era aplikasi berbasis cloud dan real-time collaboration. Pemahaman tentang event-driven architecture, broadcasting, dan room management akan menjadi foundation yang kuat untuk mengembangkan aplikasi jaringan yang lebih sophisticated di masa depan.

  </td>
</tr>
  </table>
</div>

---

<p align="center">
  <a href=".."><img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI%20KE%20HALAMAN%20UTAMA-6c757d?style=for-the-badge" width="300"></a>
</p>

<p align="center">
  <em>Dokumentasi Praktikum Pemrograman Jaringan</em><br>
  <small>Kesimpulan Pelaksanaan Jobsheet 9</small>
</p>
