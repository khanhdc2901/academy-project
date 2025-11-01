document.addEventListener("DOMContentLoaded", function () {

  /* ==========================
     🔹 1️⃣ Danh sách khóa học toàn cục
  ========================== */
  const allCourses = [
    { id: 1, title: "Lập trình Java cơ bản", category: "laptrinh", teacher: "Nguyễn An", price: "499.000đ", img: "https://picsum.photos/300/200?1", desc: "Học Java từ căn bản, cấu trúc và OOP." },
    { id: 2, title: "Thiết kế UI/UX cho người mới", category: "thietke", teacher: "Trần Bình", price: "399.000đ", img: "https://picsum.photos/300/200?2", desc: "Nắm vững quy trình thiết kế trải nghiệm người dùng." },
    { id: 3, title: "Digital Marketing toàn tập", category: "marketing", teacher: "Lê Mai", price: "599.000đ", img: "https://picsum.photos/300/200?3", desc: "Hiểu chiến lược tiếp thị số hiện đại." },
    { id: 4, title: "HTML, CSS, JS từ Zero đến Hero", category: "laptrinh", teacher: "Phạm Duy", price: "459.000đ", img: "https://picsum.photos/300/200?4", desc: "Xây dựng trang web hoàn chỉnh với Frontend cơ bản." },
    { id: 5, title: "ReactJS & Frontend nâng cao", category: "laptrinh", teacher: "Vũ Khang", price: "699.000đ", img: "https://picsum.photos/300/200?5", desc: "Học ReactJS, Component và state management." },
    { id: 6, title: "Python cho người mới bắt đầu", category: "laptrinh", teacher: "Hoàng Nam", price: "499.000đ", img: "https://picsum.photos/300/200?6", desc: "Học cú pháp, logic, và ứng dụng cơ bản của Python." },
    { id: 7, title: "Phân tích dữ liệu với Excel & Power BI", category: "marketing", teacher: "Hà Minh", price: "399.000đ", img: "https://picsum.photos/300/200?7", desc: "Trực quan hóa dữ liệu và tạo dashboard chuyên nghiệp." },
    { id: 8, title: "Node.js & Express Backend cơ bản", category: "laptrinh", teacher: "Ngọc Đức", price: "579.000đ", img: "https://picsum.photos/300/200?8", desc: "Tạo server backend với Node.js và Express." },
    { id: 9, title: "Thiết kế đồ họa với Photoshop", category: "thietke", teacher: "Thảo Linh", price: "449.000đ", img: "https://picsum.photos/300/200?9", desc: "Thành thạo Photoshop trong thiết kế hiện đại." },
    { id: 10, title: "Lập trình hướng đối tượng với C++", category: "laptrinh", teacher: "Minh Quân", price: "499.000đ", img: "https://picsum.photos/300/200?10", desc: "OOP, kế thừa, đa hình và thực hành C++ nâng cao." }
  ];

  /* ==========================
     🔹 2️⃣ LocalStorage Helpers
  ========================== */
  function getLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function setLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /* ==========================
     🔹 3️⃣ User Session
  ========================== */
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("current_user")) || null;
  }

  function setCurrentUser(user) {
    localStorage.setItem("current_user", JSON.stringify(user));
  }

  function logoutUser() {
    localStorage.removeItem("current_user");
    window.location.href = "index.html";
  }

  /* ==========================
     🔹 4️⃣ Header hiển thị tên user
  ========================== */
  function updateHeaderAuth() {
    const currentUser = getCurrentUser();
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    const userInfo = document.getElementById("userInfo");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!loginLink || !registerLink || !userInfo) return;

    if (currentUser) {
      loginLink.style.display = "none";
      registerLink.style.display = "none";
      userInfo.style.display = "inline";
      usernameDisplay.textContent = currentUser.name;
      logoutBtn?.addEventListener("click", logoutUser);
    } else {
      loginLink.style.display = "inline";
      registerLink.style.display = "inline";
      userInfo.style.display = "none";
    }
  }
  updateHeaderAuth();

  /* ==========================
     🔹 5️⃣ Đăng ký
  ========================== */
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerName.value.trim();
      const email = registerEmail.value.trim().toLowerCase();
      const password = registerPassword.value.trim();
      const confirm = registerConfirm.value.trim();
      const msg = registerMessage;

      if (!name || !email || !password) {
        msg.textContent = "Vui lòng nhập đầy đủ thông tin!";
        msg.style.color = "red";
        return;
      }
      if (password !== confirm) {
        msg.textContent = "Mật khẩu xác nhận không khớp!";
        msg.style.color = "red";
        return;
      }

      const users = getLS("academy_users");
      if (users.find((u) => u.email === email)) {
        msg.textContent = "Email này đã được đăng ký!";
        msg.style.color = "red";
        return;
      }

      users.push({ name, email, password });
      setLS("academy_users", users);

      msg.textContent = "Đăng ký thành công! Đang chuyển...";
      msg.style.color = "green";
      setTimeout(() => (window.location.href = "login.html"), 1500);
    });
  }

  /* ==========================
     🔹 6️⃣ Đăng nhập
  ========================== */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim().toLowerCase();
      const password = loginPassword.value.trim();
      const msg = loginMessage;

      const users = getLS("academy_users");
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        msg.textContent = "Sai email hoặc mật khẩu!";
        msg.style.color = "red";
        return;
      }

      setCurrentUser(user);
      msg.textContent = "Đăng nhập thành công!";
      msg.style.color = "green";
      setTimeout(() => (window.location.href = "index.html"), 1000);
    });
  }
  /* ==========================
     🔹 7️⃣ Danh sách khóa học (courses.html)
  ========================== */
  const courseContainer = document.getElementById("courseContainer");
  if (courseContainer) {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const currentUser = getCurrentUser();

    // Lấy danh sách khóa học của user (nếu có)
    const userCourses = currentUser ? getLS(`my_courses_${currentUser.email}`) : [];

    function renderCourses(list) {
      courseContainer.innerHTML = "";
      list.forEach((c) => {
        const div = document.createElement("div");
        div.className = "course-card";

        const isRegistered = userCourses.some((uc) => uc.id === c.id);
        const registerBtnHTML = isRegistered
          ? `<button class="btn registered-btn" disabled> Đã đăng ký</button>`
          : `<button class="btn register-btn" data-id="${c.id}">Đăng ký</button>`;

        div.innerHTML = `
        <img src="${c.img}" alt="${c.title}">
        <h3>${c.title}</h3>
        <p><b>Giảng viên:</b> ${c.teacher}</p>
        <p><b>Giá:</b> ${c.price}</p>
        <div class="course-actions">
          <button class="btn detail-btn" data-id="${c.id}">Xem chi tiết</button>
          ${registerBtnHTML}
        </div>`;
        courseContainer.appendChild(div);
      });

      // Nút xem chi tiết
      document.querySelectorAll(".detail-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          localStorage.setItem("selected_course", btn.dataset.id);
          window.location.href = "course-detail.html";
        });
      });

      // Nút đăng ký
      document.querySelectorAll(".register-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const user = getCurrentUser();
          if (!user) {
            alert("Vui lòng đăng nhập trước khi đăng ký!");
            window.location.href = "login.html";
            return;
          }

          const id = parseInt(btn.dataset.id);
          const course = allCourses.find((c) => c.id === id);
          const key = `my_courses_${user.email}`;
          const myCourses = getLS(key);

          if (myCourses.some((c) => c.id === id)) {
            alert("Bạn đã đăng ký khóa học này rồi!");
            return;
          }

          myCourses.push(course);
          setLS(key, myCourses);
          alert(`🎉 Đăng ký thành công: ${course.title}`);
          // Cập nhật giao diện sau khi đăng ký
          btn.textContent = "✅ Đã đăng ký";
          btn.disabled = true;
          btn.classList.add("registered-btn");
        });
      });
    }

    function filterCourses() {
      const search = searchInput.value.toLowerCase();
      const cat = categorySelect.value;
      const filtered = allCourses.filter(
        (c) =>
          (cat === "all" || c.category === cat) &&
          c.title.toLowerCase().includes(search)
      );
      renderCourses(filtered);
    }

    searchInput.addEventListener("input", filterCourses);
    categorySelect.addEventListener("change", filterCourses);
    renderCourses(allCourses);
  }


  /* ==========================
     🔹 8️⃣ Khóa học của tôi (mycourses.html)
  ========================== */
  const myCoursesContainer = document.getElementById("myCoursesContainer");
  if (myCoursesContainer) {
    const user = getCurrentUser();
    if (!user) {
      alert("Vui lòng đăng nhập để xem khóa học của bạn!");
      window.location.href = "login.html";
    } else {
      const key = `my_courses_${user.email}`;
      let list = getLS(key);
      const msg = document.getElementById("noCoursesMsg");

      function renderMyCourses() {
        myCoursesContainer.innerHTML = "";
        if (!list.length) return (msg.style.display = "block");

        msg.style.display = "none";
        list.forEach((c) => {
          const div = document.createElement("div");
          div.className = "course-card";
          div.innerHTML = `
            <img src="${c.img}" alt="${c.title}">
            <h3>${c.title}</h3>
            <p><b>Giảng viên:</b> ${c.teacher}</p>
            <p><b>Giá:</b> ${c.price}</p>
            <button class="btn remove-btn" data-id="${c.id}">Xóa</button>`;
          myCoursesContainer.appendChild(div);
        });

        document.querySelectorAll(".remove-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            if (confirm("Bạn có chắc muốn xóa khóa học này không?")) {
              list = list.filter((c) => c.id !== id);
              setLS(key, list);
              renderMyCourses();
            }
          });
        });
      }

      renderMyCourses();
    }
  }

  /* ==========================
     🔹 9️⃣ Trang chi tiết khóa học (course-detail.html)
  ========================== */
  const detailBox = document.getElementById("courseDetailBox");
  if (detailBox) {
    const id = parseInt(localStorage.getItem("selected_course"));
    const course = allCourses.find((c) => c.id === id);
    if (!course) return (detailBox.innerHTML = "<p>Không tìm thấy khóa học.</p>");

    detailBox.innerHTML = `
      <div class="detail-box">
        <div class="detail-content">
          <img src="${course.img}" alt="${course.title}">
          <div class="info">
            <h2>${course.title}</h2>
            <p><b>Giảng viên:</b> ${course.teacher}</p>
            <p class="desc">${course.desc}</p>
            <p><b>Giá:</b> ${course.price}</p>
            <button class="btn" id="registerDetailBtn">Đăng ký ngay</button>
          </div>
        </div>
      </div>`;

    document.getElementById("registerDetailBtn").addEventListener("click", () => {
      const user = getCurrentUser();
      if (!user) {
        alert("Vui lòng đăng nhập trước khi đăng ký!");
        window.location.href = "login.html";
        return;
      }
      const key = `my_courses_${user.email}`;
      const myCourses = getLS(key);
      if (myCourses.some((c) => c.id === id)) return alert("Bạn đã đăng ký khóa học này rồi!");
      myCourses.push(course);
      setLS(key, myCourses);
      alert(`Đăng ký thành công: ${course.title}`);
    });
  }

});
