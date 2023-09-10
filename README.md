# Employee Development

aplikasi crud dengan data dummy employee

## Menjalankan Aplikasi

Berikut tools-tools yang saya gunakan dalam membangun aplikasi ini
1. Angular CLI: 15.0.5
2. Node: 18.15.0
3. Package Manager: npm 9.5.0
4. OS: linux x64
5. tailwindcss@3.3.3
6. @angular/material@15.2.9

Berikut adalah langkah-langkah untuk menjalankan aplikasi ini di lingkungan pengembangan Anda:
1. clone project ini dari repositori github saya
2. install node modules dengan npm i di terminal anda(saya sarankan menggunakan node modul 16 minimal)
3. ng serve untuk menjalankan project ini

daftar fitur dan validasi di project ini
<!-- Halaman Login Register -->
1. data tidak boleh kosong
2. password minimal 6 huruf atau angka
3. data yang anda register akan tersimpan kedalam local storage browser anda

<!-- Halaman Employee -->
1. filter name, username, group, dan status (filter akan tersimpan walau anda berpindah halaman karna data tersimpan ke local storage)
2. reset filter untuk menghapus filter dari tampilan dan local storage
2. sorting dengan cara menekan header dari data yang mau anda sort (misal: sorting basic salary, klik header basic salary dari table )
3. pagination (anda bisa menentukan data yang ingin anda tampilkan berapa banyak)
4. action info untuk membuka detail dari data yang anda pilih. Selebihnya hanya dummy button sesuai permintaan di soal
5. button add new employee untuk navigasi ke halaman add
6. 100 data dummy yang diambil dari data.ts didalam folder shared sesuai soal

<!-- Halaman Detail -->
1. untuk menampilkan detail dari salah satu data table yang anda pilih
2. button ok untuk kembali halaman employee

<!-- Halaman Add -->
1. halaman untuk menambah data emloyee
2. validasi format email
3. validasi tanggal tidak boleh lewat dari tanggal sekarang
4. validasi form tidak boleh kosong
5. form group menggunakan search form dan dropdown
6. button cancel untuk kembali ke halaman employee tanpa action apapun
7. button tambah jika semua validasi terpenuhi akan menambah data dan berpindah otomatis ke halaman employee


NOTES: usahakan untuk tidak merefresh web browser selama menguji coba aplikasi. Dikarenakan
semua data table disini adalah data dummy jadi semua data yang anda tambah akan kembali seperti semula sesuai dengan
data.ts

Thank You 
Paskahl Herbert Simarmata