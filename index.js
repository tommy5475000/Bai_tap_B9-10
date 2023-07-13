// gán chuỗi rỗng
let employees = [];

function addEmployee() {
  let employee = validate();
  if (!employee) {
    return;
  }

  employees.push(employee);

  display(employees);

  reset();

  // $("#myModal").modal("hide");
}

// remove
function removeEmployee(employeeId) {
  let index = employees.findIndex((value) => {
    return value.id === employeeId;
  });
  if (index !== -1) {
    employees.splice(index, 1);
  }

  display(employees);
}

//chỉnh sửa trả kêt quả lại modal
function editEmployees(employeeId) {
  let employee = employees.find((value) => {
    return value.id === employeeId;
  });

  document.getElementById("tknv").value = employee.id;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("datepicker").value = employee.datepicker;
  document.getElementById("luongCB").value = employee.luong;
  document.getElementById("chucvu").value = employee.chucvu;
  document.getElementById("gioLam").value = employee.getRank();

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

//cập nhật
function updateEmployees() {
  let id = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let datepicker = document.getElementById("datepicker").value;
  let luong = +document.getElementById("luongCB").value;
  let chucvu = document.getElementById("chucvu").value;
  let gioLam = +document.getElementById("gioLam").value;

  let employee = new Employee(
    id,
    name,
    email,
    password,
    datepicker,
    luong,
    chucvu,
    gioLam
  );

  let index = employees.findIndex((value) => {
    return value.id === id;
  });
  employees[index] = employee;

  display(employees);

  $('#myModal').modal('hide')
}

function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
    <tr>
      <td>${value.id}</td>
      <td>${value.name}</td>
      <td>${value.email}</td>
      <td>${value.datepicker}</td>
      <td>${value.chucvu}</td>
      <td>${value.calcLuong()}</td>
      <td>${value.getRank()}</td>
      <td>
        <button class="btn btn-primary" data-toggle="modal"
        data-target="#myModal" onclick="editEmployees('${
          value.id
        }')">Chỉnh sửa</button>
        <button class="btn btn-danger" onclick="removeEmployee('${
          value.id
        }')">Xóa</button>
      </td>
    </tr>
    `
    );
  }, "");
  document.getElementById("tableDanhSach").innerHTML = html;
}

//reset
function reset() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

//tìm kiếm
function findRanks() {
  let find = document.getElementById("searchName").value;
  find = find.trim().toLowerCase();

  let findEmployees = employees.filter((value) => {
    let giolam = value.getRank().trim().toLowerCase();
    return giolam.includes(find);
  });

  display(findEmployees);
}

// Kiểm tra input đầu vào
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// kiểm tra số
function isLuong(value) {
  if (value < 1000000 || value > 20000000) {
    return false;
  }
  return true;
}

function isTime(value) {
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

function isAcc(value) {
  let regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{4,6}$/;
  return regex.test(value);
}

function isName(value) {
  let regex =
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;

  return regex.test(value);
}

function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

  return regex.test(value);
}

function isDate(value) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return regex.test(value);
}

function validate() {
  let id = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let datepicker = document.getElementById("datepicker").value;
  let luong = document.getElementById("luongCB").value;
  let chucvu = document.getElementById("chucvu").value;
  let gioLam = document.getElementById("gioLam").value;

  let isValid = true;

  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML = "Tài khoản không để trống";
  } else if (!isAcc(id)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản tối đa 4 - 6 ký tự và số";
  }

  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên nhân viên không để trống";
  } else if (!isName(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên nhân viên phải là chữ";
  }

  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không để trống";
  } else if (!isEmail(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = " Email phải đúng định dạng";
  }

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML = "Mật khẩu không để trống";
  } else if (!isPassword(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật Khẩu 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
  }

  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Ngày làm không để trống";
  } else if (!isDate(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Định dạng DD/MM/YYYY)";
  }

  if (!isRequired(luong)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML = "Lương không để trống";
  } else if (!isLuong(+luong)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML = "Lương không hợp lệ";
  }

  if (!isRequired(chucvu)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML = "Chọn chức vụ hợp lệ";
  }

  if (!isRequired(gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML = "Số giờ làm không để trống";
  } else if (!isTime(+gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML = "Lương không hợp lệ";
  }

  if (isValid) {
    let employee = new Employee(
      id,
      name,
      email,
      password,
      datepicker,
      +luong,
      chucvu,
      +gioLam
    );
    return employee;
  }
  return undefined;
}

document.getElementById("tknv").oninput = (event) => {
  let idSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("name").oninput = (event) => {
  let idSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("email").oninput = (event) => {
  let idSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("password").oninput = (event) => {
  let idSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("datepicker").oninput = (event) => {
  let idSpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("luongCB").oninput = (event) => {
  let idSpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("chucvu").oninput = (event) => {
  let idSpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

document.getElementById("gioLam").oninput = (event) => {
  let idSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Không được để trống !";
  }
};

function closeTab() {
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}
