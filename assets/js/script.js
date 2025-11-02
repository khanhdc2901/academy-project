document.addEventListener("DOMContentLoaded", function () {
  // -----------------------------
  // 1️⃣ Danh sách khóa học
  // -----------------------------
  const allCourses = [
    { id: 1, title: "Lập trình Java cơ bản", category: "laptrinh", teacher: "Nguyễn An", price: "499.000đ", img: "https://picsum.photos/300/200?1", desc: "Học Java từ căn bản, cấu trúc và OOP." },
    { id: 2, title: "Thiết kế UI/UX cho người mới", category: "thietke", teacher: "Trần Bình", price: "399.000đ", img: "https://picsum.photos/300/200?2", desc: "Nắm vững quy trình thiết kế trải nghiệm người dùng." },
    { id: 3, title: "Digital Marketing toàn tập", category: "marketing", teacher: "Lê Mai", price: "599.000đ", img: "https://picsum.photos/300/200?3", desc: "Hiểu chiến lược tiếp thị số hiện đại." },
    { id: 4, title: "HTML, CSS, JS từ Zero đến Hero", category: "laptrinh", teacher: "Phạm Duy", price: "459.000đ", img: "https://picsum.photos/300/200?4", desc: "Xây dựng trang web hoàn chỉnh với Frontend cơ bản." },
    { id: 5, title: "ReactJS & Frontend nâng cao", category: "laptrinh", teacher: "Vũ Khang", price: "699.000đ", img: "https://picsum.photos/300/200?5", desc: "Học ReactJS, Component và state management." },
    { id: 6, title: "Python cho người mới bắt đầu", category: "laptrinh", teacher: "Hoàng Nam", price: "499.000đ", img: "https://picsum.photos/300/200?6", desc: "Học cú pháp, logic, và ứng dụng cơ bản của Python." },
    { id: 7, title: "Phân tích dữ liệu với Excel & Power BI", category: "marketing", teacher: "Hà Minh", price: "399.000đ", img: "https://picsum.photos/300/200?7", desc: "Trực quan hóa dữ liệu và tạo dashboard chuyên nghiệp." },
    { id: 8, title: "Node.js & Express Backend cơ bản", category: "laptrinh", teacher: "Ngọc Đức", price: "579.000đ", img: "https://picsum.photos/300/200?8", desc: "Tạo server backend với Node.js và Express." },
  ];

  // -----------------------------
  // 2️⃣ LocalStorage helpers
  // -----------------------------
  const getLS = (key) => JSON.parse(localStorage.getItem(key)) || [];
  const setLS = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const getCurrentUser = () => JSON.parse(localStorage.getItem("current_user")) || null;
  const setCurrentUser = (u) => localStorage.setItem("current_user", JSON.stringify(u));
  const logoutUser = () => { localStorage.removeItem("current_user"); window.location.href = "index.html"; };

  // -----------------------------
  // 3️⃣ Header hiển thị user
  // -----------------------------
  function updateHeaderAuth() {
    const u = getCurrentUser();
    const login = document.getElementById("loginLink");
    const reg = document.getElementById("registerLink");
    const info = document.getElementById("userInfo");
    const name = document.getElementById("usernameDisplay");
    const logout = document.getElementById("logoutBtn");
    if (!login || !reg || !info) return;
    if (u) {
      login.style.display = "none";
      reg.style.display = "none";
      info.style.display = "inline";
      name.innerHTML = `<a href="profile.html" class="profile-link">${u.name}</a>`;
      logout.addEventListener("click", logoutUser);
    } else {
      login.style.display = "inline";
      reg.style.display = "inline";
      info.style.display = "none";
    }
  }
  updateHeaderAuth();

  // -----------------------------
  // 4️⃣ Thông báo nổi (form nhỏ)
  // -----------------------------
  function showNotify(message, type = "info") {
    let box = document.createElement("div");
    box.className = `notify-box ${type}`;
    box.textContent = message;
    document.body.appendChild(box);
    setTimeout(() => box.classList.add("show"), 50);
    setTimeout(() => {
      box.classList.remove("show");
      setTimeout(() => box.remove(), 500);
    }, 2000);
  }

  // -----------------------------
  // 5️⃣ Đăng ký
  // -----------------------------
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerName.value.trim();
      const email = registerEmail.value.trim().toLowerCase();
      const pass = registerPassword.value.trim();
      const confirm = registerConfirm.value.trim();
      if (!name || !email || !pass) return showNotify("Vui lòng nhập đầy đủ thông tin!", "error");
      if (pass !== confirm) return showNotify("Mật khẩu xác nhận không khớp!", "error");
      const users = getLS("academy_users");
      if (users.find((u) => u.email === email)) return showNotify("Email đã tồn tại!", "error");
      users.push({ name, email, password: pass });
      setLS("academy_users", users);
      showNotify("✅ Đăng ký thành công!", "success");
      setTimeout(() => (window.location.href = "login.html"), 1000);
    });
  }

  // -----------------------------
  // 6️⃣ Đăng nhập
  // -----------------------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim().toLowerCase();
      const pass = loginPassword.value.trim();
      const users = getLS("academy_users");
      const user = users.find((u) => u.email === email && u.password === pass);
      if (!user) return showNotify("Sai email hoặc mật khẩu!", "error");
      setCurrentUser(user);
      showNotify("✅ Đăng nhập thành công!", "success");
      setTimeout(() => (window.location.href = "index.html"), 1000);
    });
  }

  // -----------------------------
  // 7️⃣ Hiển thị danh sách khóa học
  // -----------------------------
  const courseContainer = document.getElementById("courseContainer");
  if (courseContainer) {
    const search = document.getElementById("searchInput");
    const cat = document.getElementById("categorySelect");
    const teacherSelect = document.getElementById("teacherSelect");
    const priceSort = document.getElementById("priceSort");

    function renderCourses(list) {
      const currentUser = getCurrentUser();
      const userCourses = currentUser ? getLS(`my_courses_${currentUser.email}`) : [];
      courseContainer.innerHTML = "";
      list.forEach((c) => {
        const div = document.createElement("div");
        div.className = "course-card";
        const isReg = userCourses.some((uc) => uc.id === c.id);
        div.innerHTML = `
          <img src="${c.img}" alt="${c.title}">
          <h3>${c.title}</h3>
          <p><b>Giảng viên:</b> ${c.teacher}</p>
          <p><b>Giá:</b> ${c.price}</p>
          <div class="course-actions">
            <button class="btn detail-btn" data-id="${c.id}">Xem chi tiết</button>
            ${isReg ? `<button class="btn registered-btn" disabled>Đã đăng ký</button>` :
            `<button class="btn register-btn" data-id="${c.id}">Đăng ký</button>`}
          </div>`;
        courseContainer.appendChild(div);
      });

      document.querySelectorAll(".detail-btn").forEach((btn) => {
        btn.onclick = () => {
          localStorage.setItem("selected_course", btn.dataset.id);
          window.location.href = "course-detail.html";
        };
      });

      document.querySelectorAll(".register-btn").forEach((btn) => {
        btn.onclick = () => {
          const user = getCurrentUser();
          if (!user) return showNotify("Vui lòng đăng nhập trước!", "error");
          const id = parseInt(btn.dataset.id);
          const course = allCourses.find((x) => x.id === id);
          const key = `my_courses_${user.email}`;
          const list = getLS(key);
          if (list.some((x) => x.id === id)) return showNotify("Bạn đã đăng ký khóa này!", "error");
          list.push(course);
          setLS(key, list);
          showNotify(`🎉 Đăng ký thành công: ${course.title}`, "success");
          btn.textContent = "Đã đăng ký";
          btn.disabled = true;
          btn.classList.add("registered-btn");
        };
      });
    }

    function filterCourses() {
      const s = search.value.toLowerCase();
      const v = cat.value;
      const t = teacherSelect?.value || "all";
      const sort = priceSort?.value || "none";

      let filtered = allCourses.filter((c) => {
        const matchCategory = v === "all" || c.category === v;
        const matchTeacher = t === "all" || c.teacher === t;
        const matchSearch = c.title.toLowerCase().includes(s);
        return matchCategory && matchTeacher && matchSearch;
      });

      if (sort === "asc") {
        filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      } else if (sort === "desc") {
        filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      }

      renderCourses(filtered);
    }

    search?.addEventListener("input", filterCourses);
    cat?.addEventListener("change", filterCourses);
    teacherSelect?.addEventListener("change", filterCourses);
    priceSort?.addEventListener("change", filterCourses);

    renderCourses(allCourses);
  }

  // -----------------------------
  // 8️⃣ Khóa học của tôi
  // -----------------------------
  const myCourses = document.getElementById("myCoursesContainer");
  if (myCourses) {
    const user = getCurrentUser();
    if (!user) return showNotify("Vui lòng đăng nhập để xem khóa học của bạn!", "error");
    const key = `my_courses_${user.email}`;
    let list = getLS(key);
    const msg = document.getElementById("noCoursesMsg");

    function renderMyCourses() {
      myCourses.innerHTML = "";
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
        myCourses.appendChild(div);
      });

      document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.onclick = () => {
          const id = parseInt(btn.dataset.id);
          list = list.filter((c) => c.id !== id);
          setLS(key, list);
          renderMyCourses();
          showNotify("✅ Đã xóa khóa học!", "success");
        };
      });
    }
    renderMyCourses();
  }

  // -----------------------------
  // 9️⃣ Chi tiết khóa học
  // -----------------------------
  const detailBox = document.getElementById("courseDetailBox");
  if (detailBox) {
    const id = parseInt(localStorage.getItem("selected_course"));
    const course = allCourses.find((c) => c.id === id);
    if (!course) {
      detailBox.innerHTML = "<p>Không tìm thấy khóa học.</p>";
      return;
    }

    const user = getCurrentUser();
    let isRegistered = false;
    if (user) {
      const list = getLS(`my_courses_${user.email}`);
      isRegistered = list.some((c) => c.id === id);
    }

    detailBox.innerHTML = `
      <div class="detail-box">
        <div class="detail-content">
          <img src="${course.img}" alt="${course.title}">
          <div class="info">
            <h2>${course.title}</h2>
            <p><b>Giảng viên:</b> ${course.teacher}</p>
            <p class="desc">${course.desc}</p>
            <p><b>Giá:</b> ${course.price}</p>
            <button class="btn ${isRegistered ? "registered-btn" : ""}" id="registerDetailBtn" ${isRegistered ? "disabled" : ""}>
              ${isRegistered ? "Đã đăng ký" : "Đăng ký ngay"}
            </button>
          </div>
        </div>
      </div>
    `;

    const registerBtn = document.getElementById("registerDetailBtn");
    if (!isRegistered) {
      registerBtn.addEventListener("click", () => {
        const user = getCurrentUser();
        if (!user) return showNotify("Vui lòng đăng nhập trước!", "error");
        const key = `my_courses_${user.email}`;
        const list = getLS(key);
        if (list.some((c) => c.id === id)) return showNotify("Bạn đã đăng ký khóa này!", "error");
        list.push(course);
        setLS(key, list);
        showNotify(`🎉 Đăng ký thành công: ${course.title}`, "success");
        registerBtn.textContent = "Đã đăng ký";
        registerBtn.disabled = true;
        registerBtn.classList.add("registered-btn");
      });
    }
  }

  // 🔟 Hồ sơ cá nhân (profile.html)
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const user = getCurrentUser();
    if (!user) {
      showNotify("Vui lòng đăng nhập trước!", "error");
      return setTimeout(() => (window.location.href = "login.html"), 1000);
    }

    const key = `my_courses_${user.email}`;
    const courses = getLS(key);
    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const courseCount = document.getElementById("profileCourses");

    nameInput.value = user.name;
    emailInput.value = user.email;
    courseCount.value = courses.length;

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = nameInput.value.trim();
      const newEmail = emailInput.value.trim().toLowerCase();

      if (!newName || !newEmail) return showNotify("Vui lòng nhập đầy đủ thông tin!", "error");

      const users = getLS("academy_users");
      const idx = users.findIndex((u) => u.email === user.email);

      if (idx !== -1) {
        users[idx].name = newName;
        users[idx].email = newEmail;
        setLS("academy_users", users);
      }

      // cập nhật current_user
      user.name = newName;
      user.email = newEmail;
      setCurrentUser(user);

      // Nếu đổi email, đổi key my_courses
      if (newEmail !== user.email) {
        const oldKey = `my_courses_${user.email}`;
        const newKey = `my_courses_${newEmail}`;
        const userCourses = getLS(oldKey);
        localStorage.removeItem(oldKey);
        setLS(newKey, userCourses);
      }

      showNotify(" Cập nhật hồ sơ thành công!", "success");
      updateHeaderAuth();
    });
  }

});
