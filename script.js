let keranjangBelanja = []; // Array untuk menyimpan item-item yang telah dibeli

fetch("https://dummyjson.com/products?limit=10")
    .then((response) => response.json())
    .then((data) => {
    const produkContainer = document.getElementById("produk-container");
    produkContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan produk baru

    data.products.forEach((produk) => {
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
                <img src="${produk.thumbnail}" alt="${produk.title}">
                <h2>${produk.title}</h2>
                <p>${produk.description}</p>
                <p><strong>Rp ${produk.price.toLocaleString()}</strong></p>
                <p class="rating">⭐ ${produk.rating}</p>
                <button class="btn-beli" data-id="${produk.id}">Beli</button>
            `;

        produkContainer.appendChild(item);
    });

    // Tambahkan event listener setelah produk ditambahkan ke DOM
    const buttons = document.querySelectorAll(".btn-beli");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
        const produkId = event.target.getAttribute("data-id");
        const produk = data.products.find(p => p.id == produkId);
        const produkInCart = keranjangBelanja.find(p => p.id == produkId);

        if (produkInCart) {
            produkInCart.jumlah++;
        } else {
            produk.jumlah = 1;
            keranjangBelanja.push(produk);
        }
        alert("Produk berhasil ditambahkan ke keranjang!");

        // Tampilkan keranjang belanja
        tampilkanKeranjangBelanja();
        });
    });
    })
    .catch((error) => console.error("Gagal mengambil data:", error));

// Event listener untuk tombol "Lihat Keranjang Belanja"
document.getElementById("viewCart").addEventListener("click", () => {
document.getElementById("produk-container").style.display = "none";
document.getElementById("keranjang-container").style.display = "block";
});

// Fungsi untuk menampilkan keranjang belanja
function tampilkanKeranjangBelanja() {
const keranjangTableBody = document.querySelector("#keranjang-table tbody");
keranjangTableBody.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan item baru

let totalSemuaHarga = 0;

keranjangBelanja.forEach((item) => {
    const row = document.createElement("tr");

    const totalHarga = item.price * item.jumlah;
    totalSemuaHarga += totalHarga;

    row.innerHTML = `
            <td><img src="${item.thumbnail}" alt="${item.title}" width="50"></td>
            <td>${item.title}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>${item.jumlah}</td>
            <td>${item.rating}</td>
            <td>Rp ${totalHarga.toLocaleString()}</td>
        `;

    keranjangTableBody.appendChild(row);
});

document.getElementById("total-semua-harga").textContent = `Rp ${totalSemuaHarga.toLocaleString()}`;
}