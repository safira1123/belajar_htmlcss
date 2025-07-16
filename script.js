// SkyTravel JavaScript Functions

// Sample booking data for pagination
const bookingData = [
  {
    code: "SKY001",
    route: "Jakarta → Bali",
    date: "25 Des 2024",
    status: "Confirmed",
    price: "Rp 1.200.000",
    statusClass: "success",
  },
  {
    code: "SKY002",
    route: "Bali → Jakarta",
    date: "30 Des 2024",
    status: "Pending",
    price: "Rp 1.150.000",
    statusClass: "warning",
  },
  {
    code: "SKY003",
    route: "Jakarta → Yogyakarta",
    date: "15 Nov 2024",
    status: "Completed",
    price: "Rp 900.000",
    statusClass: "success",
  },
  {
    code: "SKY004",
    route: "Surabaya → Medan",
    date: "10 Nov 2024",
    status: "Completed",
    price: "Rp 1.800.000",
    statusClass: "success",
  },
  {
    code: "SKY005",
    route: "Medan → Jakarta",
    date: "05 Okt 2024",
    status: "Cancelled",
    price: "Rp 1.600.000",
    statusClass: "danger",
  },
  {
    code: "SKY006",
    route: "Jakarta → Makassar",
    date: "20 Sep 2024",
    status: "Completed",
    price: "Rp 1.750.000",
    statusClass: "success",
  },
  {
    code: "SKY007",
    route: "Bandung → Bali",
    date: "15 Sep 2024",
    status: "Completed",
    price: "Rp 1.300.000",
    statusClass: "success",
  },
  {
    code: "SKY008",
    route: "Jakarta → Lombok",
    date: "10 Agu 2024",
    status: "Completed",
    price: "Rp 1.400.000",
    statusClass: "success",
  },
  {
    code: "SKY009",
    route: "Surabaya → Bali",
    date: "05 Agu 2024",
    status: "Completed",
    price: "Rp 1.100.000",
    statusClass: "success",
  },
  {
    code: "SKY010",
    route: "Jakarta → Palembang",
    date: "25 Jul 2024",
    status: "Completed",
    price: "Rp 750.000",
    statusClass: "success",
  },
  {
    code: "SKY011",
    route: "Medan → Bali",
    date: "20 Jul 2024",
    status: "Completed",
    price: "Rp 1.900.000",
    statusClass: "success",
  },
  {
    code: "SKY012",
    route: "Jakarta → Balikpapan",
    date: "15 Jul 2024",
    status: "Completed",
    price: "Rp 2.000.000",
    statusClass: "success",
  },
  {
    code: "SKY013",
    route: "Yogyakarta → Jakarta",
    date: "10 Jun 2024",
    status: "Completed",
    price: "Rp 950.000",
    statusClass: "success",
  },
  {
    code: "SKY014",
    route: "Bali → Surabaya",
    date: "05 Jun 2024",
    status: "Completed",
    price: "Rp 1.250.000",
    statusClass: "success",
  },
  {
    code: "SKY015",
    route: "Jakarta → Pontianak",
    date: "01 Jun 2024",
    status: "Completed",
    price: "Rp 1.350.000",
    statusClass: "success",
  },
]

// Pagination variables
let currentPage = 1
const itemsPerPage = 5
const totalPages = Math.ceil(bookingData.length / itemsPerPage)

// Loading Animation
function showLoading() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    loadingOverlay.classList.remove("hidden")
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add("hidden")
    }, 1000)
  }
}

// Initialize loading on page load
document.addEventListener("DOMContentLoaded", () => {
  hideLoading()

  // Initialize pagination
  initializePagination()
  displayBookingData()

  // Initialize all page-specific functions
  initializeSearch()
  initializeBooking()
  initializeContact()
  initializeNavigation()
})

// Pagination Functions
function initializePagination() {
  displayBookingData()
  updatePaginationControls()
  updateBookingInfo()
}

function displayBookingData() {
  const tableBody = document.getElementById("bookingTableBody")
  if (!tableBody) return

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = bookingData.slice(startIndex, endIndex)

  tableBody.innerHTML = ""

  currentData.forEach((booking) => {
    const row = `
      <tr>
        <td><strong>${booking.code}</strong></td>
        <td>${booking.route}</td>
        <td>${booking.date}</td>
        <td><span class="badge bg-${booking.statusClass}">${booking.status}</span></td>
        <td><strong>${booking.price}</strong></td>
        <td>
          <button class="btn btn-sm btn-outline-primary" onclick="viewBookingDetail('${booking.code}')">
            Detail
          </button>
        </td>
      </tr>
    `
    tableBody.innerHTML += row
  })
}

function updatePaginationControls() {
  const paginationControls = document.getElementById("paginationControls")
  if (!paginationControls) return

  let paginationHTML = ""

  // Previous button
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>
        <i class="fas fa-chevron-left"></i> Previous
      </button>
    </li>
  `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <li class="page-item ${currentPage === i ? "active" : ""}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>
    `
  }

  // Next button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <button class="page-link" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </li>
  `

  paginationControls.innerHTML = paginationHTML
}

function updateBookingInfo() {
  const bookingInfo = document.getElementById("bookingInfo")
  const paginationInfo = document.getElementById("paginationInfo")

  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, bookingData.length)

  if (bookingInfo) {
    bookingInfo.textContent = `Menampilkan ${startIndex}-${endIndex} dari ${bookingData.length} pemesanan`
  }

  if (paginationInfo) {
    paginationInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`
  }
}

function changePage(page) {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    currentPage = page
    showLoading()

    setTimeout(() => {
      hideLoading()
      displayBookingData()
      updatePaginationControls()
      updateBookingInfo()
    }, 500)
  }
}

// Booking detail function
function viewBookingDetail(bookingCode) {
  const booking = bookingData.find((b) => b.code === bookingCode)
  if (booking) {
    alert(
      `Detail Pemesanan ${bookingCode}:\n\nRute: ${booking.route}\nTanggal: ${booking.date}\nStatus: ${booking.status}\nHarga: ${booking.price}`,
    )
  }
}

// Quick action functions
function searchNewFlight() {
  showLoading()
  setTimeout(() => {
    window.location.href = "search.html"
  }, 1000)
}

function downloadBookingHistory() {
  showLoading()
  setTimeout(() => {
    hideLoading()
    alert("Riwayat pemesanan berhasil didownload!")
  }, 1500)
}

// Navigation with loading
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        showLoading()
      }
    })
  })
}

// Search Page Functions
function initializeSearch() {
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showLoading()

      setTimeout(() => {
        hideLoading()
        displayFlightResults()
      }, 2000)
    })
  }
}

function displayFlightResults() {
  const flightResults = document.getElementById("flightResults")
  const flightCards = document.getElementById("flightCards")
  const tableBody = document.getElementById("flightTableBody")
  const cardsContainer = document.getElementById("flightCardsContainer")

  if (!flightResults || !flightCards) return

  // Sample flight data
  const flights = [
    {
      airline: "Garuda Indonesia",
      route: "Jakarta → Bali",
      time: "08:00 - 11:00",
      duration: "3h 00m",
      price: "Rp 1.200.000",
      logo: "garuda.jpg",
    },
    {
      airline: "Lion Air",
      route: "Jakarta → Bali",
      time: "10:30 - 13:30",
      duration: "3h 00m",
      price: "Rp 1.100.000",
      logo: "lionair.jpg",
    },
    {
      airline: "Citilink",
      route: "Jakarta → Bali",
      time: "14:15 - 17:15",
      duration: "3h 00m",
      price: "Rp 1.050.000",
      logo: "citilink.jpg",
    },
    {
      airline: "Batik Air",
      route: "Jakarta → Bali",
      time: "16:45 - 19:45",
      duration: "3h 00m",
      price: "Rp 1.300.000",
      logo: "batik.jpg",
    },
  ]

  // Populate table
  if (tableBody) {
    tableBody.innerHTML = ""
    flights.forEach((flight) => {
      const row = `
                <tr>
                    <td>
                        <img src="${flight.logo}" alt="${flight.airline}" width="30" height="30" class="me-2">
                        ${flight.airline}
                    </td>
                    <td>${flight.route}</td>
                    <td>${flight.time}</td>
                    <td>${flight.duration}</td>
                    <td><strong>${flight.price}</strong></td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="selectFlight('${flight.airline}')">
                            Pilih
                        </button>
                    </td>
                </tr>
            `
      tableBody.innerHTML += row
    })
  }

  // Populate cards
  if (cardsContainer) {
    cardsContainer.innerHTML = ""
    flights.forEach((flight) => {
      const card = `
                <div class="col-md-6 mb-3">
                    <div class="flight-card">
                        <div class="flight-info">
                            <div>
                                <img src="${flight.logo}" alt="${flight.airline}" width="40" height="40" class="me-2">
                                <strong>${flight.airline}</strong>
                            </div>
                            <div class="text-center">
                                <div class="flight-route">${flight.route}</div>
                                <div class="flight-time">${flight.time}</div>
                                <small class="text-muted">${flight.duration}</small>
                            </div>
                            <div class="text-end">
                                <div class="flight-price">${flight.price}</div>
                                <button class="btn btn-primary btn-sm mt-2" onclick="selectFlight('${flight.airline}')">
                                    Pilih Penerbangan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
      cardsContainer.innerHTML += card
    })
  }

  // Show results
  flightResults.classList.remove("d-none")
  flightCards.classList.remove("d-none")

  // Add fade-in animation
  flightResults.classList.add("fade-in")
  flightCards.classList.add("fade-in")
}

function selectFlight(airline) {
  alert(`Anda memilih penerbangan ${airline}. Mengarahkan ke halaman pemesanan...`)
  showLoading()
  setTimeout(() => {
    window.location.href = "booking.html"
  }, 1500)
}

// Booking Page Functions
function initializeBooking() {
  const bookingForm = document.getElementById("bookingForm")
  const accountForm = document.getElementById("accountForm")
  const proceedButton = document.getElementById("proceedPayment")

  if (bookingForm) {
    // Form validation
    const fullNameInput = document.getElementById("fullName")
    const emailInput = document.getElementById("email")
    const phoneInput = document.getElementById("phone")

    if (fullNameInput) {
      fullNameInput.addEventListener("blur", validateName)
      fullNameInput.addEventListener("input", validateName)
    }

    if (emailInput) {
      emailInput.addEventListener("blur", validateEmail)
      emailInput.addEventListener("input", validateEmail)
    }

    if (phoneInput) {
      phoneInput.addEventListener("blur", validatePhone)
      phoneInput.addEventListener("input", validatePhone)
    }
  }

  if (accountForm) {
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirmPassword")

    if (usernameInput) {
      usernameInput.addEventListener("blur", validateUsername)
      usernameInput.addEventListener("input", validateUsername)
    }

    if (passwordInput) {
      passwordInput.addEventListener("input", validatePassword)
      passwordInput.addEventListener("blur", validatePassword)
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener("blur", validateConfirmPassword)
      confirmPasswordInput.addEventListener("input", validateConfirmPassword)
    }
  }

  if (proceedButton) {
    proceedButton.addEventListener("click", () => {
      if (validateBookingForm()) {
        showLoading()
        setTimeout(() => {
          hideLoading()
          alert("Pemesanan berhasil! Kode booking: SKY" + Math.floor(Math.random() * 1000))
        }, 2000)
      }
    })
  }
}

// Validation Functions
function validateName() {
  const nameInput = document.getElementById("fullName")
  const nameError = document.getElementById("nameError")

  if (!nameInput || !nameError) return false

  const name = nameInput.value.trim()

  if (name.length < 5 || name.length > 20) {
    nameInput.classList.add("is-invalid")
    nameInput.classList.remove("is-valid")
    nameError.textContent = "Nama harus antara 5-20 karakter"
    return false
  }

  nameInput.classList.remove("is-invalid")
  nameInput.classList.add("is-valid")
  nameError.textContent = ""
  return true
}

function validateEmail() {
  const emailInput = document.getElementById("email")
  const emailError = document.getElementById("emailError")

  if (!emailInput || !emailError) return false

  const email = emailInput.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    emailInput.classList.add("is-invalid")
    emailInput.classList.remove("is-valid")
    emailError.textContent = "Format email tidak valid"
    return false
  }

  emailInput.classList.remove("is-invalid")
  emailInput.classList.add("is-valid")
  emailError.textContent = ""
  return true
}

function validatePhone() {
  const phoneInput = document.getElementById("phone")
  const phoneError = document.getElementById("phoneError")

  if (!phoneInput || !phoneError) return false

  const phone = phoneInput.value.trim()

  if (phone.length < 10 || phone.length > 15) {
    phoneInput.classList.add("is-invalid")
    phoneInput.classList.remove("is-valid")
    phoneError.textContent = "Nomor telepon harus 10-15 digit"
    return false
  }

  phoneInput.classList.remove("is-invalid")
  phoneInput.classList.add("is-valid")
  phoneError.textContent = ""
  return true
}

function validateUsername() {
  const usernameInput = document.getElementById("username")
  const usernameError = document.getElementById("usernameError")

  if (!usernameInput || !usernameError) return false

  const username = usernameInput.value.trim()

  if (username.length > 0 && (username.length < 5 || username.length > 20)) {
    usernameInput.classList.add("is-invalid")
    usernameInput.classList.remove("is-valid")
    usernameError.textContent = "Username harus antara 5-20 karakter"
    return false
  }

  if (username.length > 0) {
    usernameInput.classList.remove("is-invalid")
    usernameInput.classList.add("is-valid")
    usernameError.textContent = ""
  }
  return true
}

function validatePassword() {
  const passwordInput = document.getElementById("password")
  const passwordError = document.getElementById("passwordError")

  if (!passwordInput || !passwordError) return false

  const password = passwordInput.value

  // Password requirements
  const lengthReq = document.getElementById("lengthReq")
  const uppercaseReq = document.getElementById("uppercaseReq")
  const lowercaseReq = document.getElementById("lowercaseReq")
  const numberReq = document.getElementById("numberReq")

  let isValid = true

  // Check length (minimum 8 characters)
  if (password.length <= 20) {
    lengthReq.classList.add("valid")
    lengthReq.querySelector("i").className = "fas fa-check text-success"
  } else {
    lengthReq.classList.remove("valid")
    lengthReq.querySelector("i").className = "fas fa-times text-danger"
    isValid = false
  }

  // Check uppercase
  if (/[A-Z]/.test(password)) {
    uppercaseReq.classList.add("valid")
    uppercaseReq.querySelector("i").className = "fas fa-check text-success"
  } else {
    uppercaseReq.classList.remove("valid")
    uppercaseReq.querySelector("i").className = "fas fa-times text-danger"
    isValid = false
  }

  // Check lowercase
  if (/[a-z]/.test(password)) {
    lowercaseReq.classList.add("valid")
    lowercaseReq.querySelector("i").className = "fas fa-check text-success"
  } else {
    lowercaseReq.classList.remove("valid")
    lowercaseReq.querySelector("i").className = "fas fa-times text-danger"
    isValid = false
  }

  // Check number
  if (/[0-9]/.test(password)) {
    numberReq.classList.add("valid")
    numberReq.querySelector("i").className = "fas fa-check text-success"
  } else {
    numberReq.classList.remove("valid")
    numberReq.querySelector("i").className = "fas fa-times text-danger"
    isValid = false
  }

  if (password.length > 0) {
    if (isValid) {
      passwordInput.classList.remove("is-invalid")
      passwordInput.classList.add("is-valid")
      passwordError.textContent = ""
    } else {
      passwordInput.classList.add("is-invalid")
      passwordInput.classList.remove("is-valid")
      passwordError.textContent = "Password tidak memenuhi persyaratan"
    }
  }

  return isValid
}

function validateConfirmPassword() {
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirmPassword")
  const confirmPasswordError = document.getElementById("confirmPasswordError")

  if (!passwordInput || !confirmPasswordInput || !confirmPasswordError) return false

  const password = passwordInput.value
  const confirmPassword = confirmPasswordInput.value

  if (confirmPassword.length > 0 && password !== confirmPassword) {
    confirmPasswordInput.classList.add("is-invalid")
    confirmPasswordInput.classList.remove("is-valid")
    confirmPasswordError.textContent = "Password tidak cocok"
    return false
  }

  if (confirmPassword.length > 0) {
    confirmPasswordInput.classList.remove("is-invalid")
    confirmPasswordInput.classList.add("is-valid")
    confirmPasswordError.textContent = ""
  }
  return true
}

function validateBookingForm() {
  const nameValid = validateName()
  const emailValid = validateEmail()
  const phoneValid = validatePhone()

  return nameValid && emailValid && phoneValid
}

// Contact Page Functions
function initializeContact() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateContactForm()) {
        showLoading()
        setTimeout(() => {
          hideLoading()
          alert("Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.")
          contactForm.reset()
        }, 2000)
      }
    })

    // Add real-time validation
    const contactNameInput = document.getElementById("contactName")
    const contactEmailInput = document.getElementById("contactEmail")
    const contactMessageInput = document.getElementById("contactMessage")

    if (contactNameInput) {
      contactNameInput.addEventListener("blur", validateContactName)
      contactNameInput.addEventListener("input", validateContactName)
    }

    if (contactEmailInput) {
      contactEmailInput.addEventListener("blur", validateContactEmail)
      contactEmailInput.addEventListener("input", validateContactEmail)
    }

    if (contactMessageInput) {
      contactMessageInput.addEventListener("blur", validateContactMessage)
      contactMessageInput.addEventListener("input", validateContactMessage)
    }
  }
}

function validateContactName() {
  const nameInput = document.getElementById("contactName")
  const nameError = document.getElementById("contactNameError")

  if (!nameInput || !nameError) return false

  const name = nameInput.value.trim()

  if (name.length < 5 || name.length > 20) {
    nameInput.classList.add("is-invalid")
    nameInput.classList.remove("is-valid")
    nameError.textContent = "Nama harus antara 5-20 karakter"
    return false
  }

  nameInput.classList.remove("is-invalid")
  nameInput.classList.add("is-valid")
  nameError.textContent = ""
  return true
}

function validateContactEmail() {
  const emailInput = document.getElementById("contactEmail")
  const emailError = document.getElementById("contactEmailError")

  if (!emailInput || !emailError) return false

  const email = emailInput.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    emailInput.classList.add("is-invalid")
    emailInput.classList.remove("is-valid")
    emailError.textContent = "Format email tidak valid"
    return false
  }

  emailInput.classList.remove("is-invalid")
  emailInput.classList.add("is-valid")
  emailError.textContent = ""
  return true
}

function validateContactMessage() {
  const messageInput = document.getElementById("contactMessage")
  const messageError = document.getElementById("contactMessageError")

  if (!messageInput || !messageError) return false

  const message = messageInput.value.trim()

  if (message.length < 50) {
    messageInput.classList.add("is-invalid")
    messageInput.classList.remove("is-valid")
    messageError.textContent = "Pesan maksimal 50 karakter"
    return false
  }

  messageInput.classList.remove("is-invalid")
  messageInput.classList.add("is-valid")
  messageError.textContent = ""
  return true
}

function validateContactForm() {
  const nameValid = validateContactName()
  const emailValid = validateContactEmail()
  const messageValid = validateContactMessage()
  const subjectInput = document.getElementById("contactSubject")
  const agreeTerms = document.getElementById("agreeTerms")

  let subjectValid = true
  let termsValid = true

  if (subjectInput && !subjectInput.value) {
    subjectInput.classList.add("is-invalid")
    subjectValid = false
  } else if (subjectInput) {
    subjectInput.classList.remove("is-invalid")
  }

  if (agreeTerms && !agreeTerms.checked) {
    agreeTerms.classList.add("is-invalid")
    termsValid = false
  } else if (agreeTerms) {
    agreeTerms.classList.remove("is-invalid")
  }

  return nameValid && emailValid && messageValid && subjectValid && termsValid
}

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".destination-card, .feature-icon, .flight-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateOnScroll)

// Handle form submissions with loading states
function handleFormSubmission(formId, successMessage, redirectUrl = null) {
  const form = document.getElementById(formId)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      showLoading()

      setTimeout(() => {
        hideLoading()
        alert(successMessage)
        if (redirectUrl) {
          window.location.href = redirectUrl
        } else {
          form.reset()
        }
      }, 2000)
    })
  }
}

// Initialize tooltips and popovers if Bootstrap is available
document.addEventListener("DOMContentLoaded", () => {
  if (typeof bootstrap !== "undefined") {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  }
})

// Profile Photo Functions
function changeProfilePhoto() {
  const photoInput = document.getElementById("profilePhotoInput")
  if (photoInput) {
    photoInput.click()
  }
}

function handlePhotoChange(event) {
  const file = event.target.files[0]
  if (file) {
    // Validasi file
    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar yang valid!")
      return
    }

    // Validasi ukuran file (maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file terlalu besar! Maksimal 2MB.")
      return
    }

    // Preview foto
    const reader = new FileReader()
    reader.onload = (e) => {
      const profileImg = document.querySelector(".rounded-circle")
      if (profileImg) {
        profileImg.src = e.target.result

        // Simpan ke localStorage untuk persistensi
        localStorage.setItem("profilePhoto", e.target.result)

        // Tampilkan notifikasi
        showNotification("Foto profil berhasil diperbarui!", "success")
      }
    }
    reader.readAsDataURL(file)
  }
}

// Load saved profile photo on page load
function loadSavedProfilePhoto() {
  const savedPhoto = localStorage.getItem("profilePhoto")
  if (savedPhoto) {
    const profileImg = document.querySelector(".rounded-circle")
    if (profileImg) {
      profileImg.src = savedPhoto
    }
  }
}

// Notification function
function showNotification(message, type = "info") {
  // Buat elemen notifikasi
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 80px; right: 20px; z-index: 1050; min-width: 300px;"
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  // Tambahkan ke body
  document.body.appendChild(notification)

  // Auto remove setelah 3 detik
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 3000)
}

// Edit Profile Function
function editProfile() {
  const userName = document.getElementById("userName")
  const userEmail = document.getElementById("userEmail")

  // Create modal for editing
  const modalHTML = `
    <div class="modal fade" id="editProfileModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Profil</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="editProfileForm">
              <div class="mb-3">
                <label class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control" id="editName" value="${userName.textContent}">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" id="editEmail" value="${userEmail.textContent}">
              </div>
              <div class="mb-3">
                <label class="form-label">Nomor Telepon</label>
                <input type="tel" class="form-control" id="editPhone" placeholder="+62 812 3456 7890">
              </div>
              <div class="mb-3">
                <label class="form-label">Tanggal Lahir</label>
                <input type="date" class="form-control" id="editBirthDate">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" onclick="saveProfile()">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `

  // Add modal to body if not exists
  if (!document.getElementById("editProfileModal")) {
    document.body.insertAdjacentHTML("beforeend", modalHTML)
  }

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("editProfileModal"))
  modal.show()
}

function saveProfile() {
  const name = document.getElementById("editName").value
  const email = document.getElementById("editEmail").value
  const phone = document.getElementById("editPhone").value
  const birthDate = document.getElementById("editBirthDate").value

  // Update display
  document.getElementById("userName").textContent = name
  document.getElementById("userEmail").textContent = email

  // Save to localStorage
  const profileData = { name, email, phone, birthDate }
  localStorage.setItem("profileData", JSON.stringify(profileData))

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"))
  modal.hide()

  // Show success notification
  showNotification("Profil berhasil diperbarui!", "success")
}

// Load saved profile data
function loadSavedProfileData() {
  const savedData = localStorage.getItem("profileData")
  if (savedData) {
    const data = JSON.parse(savedData)
    const userName = document.getElementById("userName")
    const userEmail = document.getElementById("userEmail")

    if (userName && data.name) userName.textContent = data.name
    if (userEmail && data.email) userEmail.textContent = data.email
  }
}

// Initialize profile photo on page load
document.addEventListener("DOMContentLoaded", () => {
  loadSavedProfilePhoto()
  loadSavedProfileData()
})
