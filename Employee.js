function Employee(
  id,
  name,
  email,
  password,
  datepicker,
  luong,
  chucvu,
  gioLam
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.luong = luong;
  this.chucvu = chucvu;
  this.gioLam = gioLam;
}

Employee.prototype.calcLuong = function () {
  let total = 0;
  if (this.chucvu === "Sếp") {
    total = this.luong * 3;
    return total.toLocaleString();
  }
  if (this.chucvu === "Trưởng phòng") {
    total = this.luong * 2;
    return total.toLocaleString();
  }
  if (this.chucvu === "Nhân viên") {
    total = this.luong;
    return total.toLocaleString();
  }
};

Employee.prototype.getRank = function () {
  if (this.gioLam >= 192) {
    return "Nhân viên xuất sắc";
  }
  if (this.gioLam >= 176) {
    return "Nhân viên Giỏi";
  }
  if (this.gioLam >= 160) {
    return "Nhân viên Khá";
  }
  if (this.gioLam < 160) {
    return "Nhân viên Trung Bình";
  }
};
