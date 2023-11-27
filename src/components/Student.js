import axios from "axios";
import "./sinhvien.css";
import { useEffect, useState } from "react";

function Student() {
  const [maSV, setMaSV] = useState("");
  const [tenSV, setTenSV] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioiTinh, setGioiTinh] = useState("Nam");
  const [maKhoa, setMaKhoa] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  async function searchStudent() {
    try {
      const response = await axios.get(
        `https://localhost:7140/api/Student/SearchStudent`,
        {
          params: {
            searchTerm: searchQuery,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching students:", error);
    }
  }

  useEffect(() => {
    async function Load() {
      try {
        const response = await axios.get(
          "https://localhost:7140/api/Student/GetStudent"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    }

    Load(); // Load students when component mounts
  }, []);

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }
  async function Add(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7140/api/Student/AddStudent", {
        tenSV: tenSV,
        ngaySinh: ngaySinh,
        gioiTinh: gioiTinh,
        maKhoa: maKhoa,
      });
      alert("Student Registation Successfully");
      setMaSV("");
      setTenSV("");
      setNgaySinh("");
      setGioiTinh("");
      setMaKhoa("");

      // Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editStudent(student) {
    setTenSV(student.tenSV);
    setNgaySinh(student.ngaySinh);
    setGioiTinh(student.gioiTinh);
    setMaKhoa(student.maKhoa);

    setMaSV(student.maSV);
  }

  async function DeleteStudent(maSV) {
    console.log("maSV: ", maSV);
    await axios.delete(
      "https://localhost:7140/api/Student/DeleteStudent/" + maSV
    );
    alert("Employee deleted Successfully");
    setMaSV("");
    setTenSV("");
    setNgaySinh("");
    setGioiTinh("");
    setMaKhoa("");
    // Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7140/api/Student/UpdateStudent/" +
          students.find((u) => u.maSV === maSV).maSV || maSV,
        {
          maSV: maSV,
          tenSV: tenSV,
          ngaySinh: ngaySinh,
          gioiTinh: gioiTinh,
          maKhoa: maKhoa,
        }
      );
      alert("Registation Updateddddd");
      setMaSV("");
      setTenSV("");
      setNgaySinh("");
      setGioiTinh("");
      setMaKhoa("");

      // Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h2>Search Student</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="search-button" onClick={searchStudent}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div>
          <h1>Search Results</h1>
          <table className="table table-dark" align="center">
            <thead>
              <tr>
                <th>Ma sinh vien</th>
                <th>Ten sinh vien</th>
                <th>Ngay sinh</th>
                <th>Gioi tinh</th>
                <th>Ma khoa</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student) => (
                <tr key={student.maSV}>
                  <th scope="row">{student.maSV}</th>
                  <td>{student.tenSV}</td>
                  <td>{student.ngaySinh}</td>
                  <td>{student.gioiTinh}</td>
                  <td>{student.maKhoa}</td>
                  <td>
                    <button
                      type="button"
                      className="fa fa-pencil"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteStudent(student.maSV)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h1>Student Font</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="maSV"
              hidden
              value={maSV}
              onChange={(event) => {
                setMaSV(event.target.value);
              }}
            />

            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              id="tenSV"
              value={tenSV}
              onChange={(event) => {
                setTenSV(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>
              Ngày Sinh:
              <input
                type="datetime-local"
                value={ngaySinh}
                onChange={(e) => setNgaySinh(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Giới Tính:
              <select
                value={gioiTinh}
                onChange={(e) => setGioiTinh(e.target.value)}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Mã Khoa:
              <select
                value={maKhoa}
                onChange={(e) => setMaKhoa(e.target.value)}
              >
                <option value="">-- Chọn mã khoa --</option>
                <option value="CNTT">CNTT</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </label>
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={Add}>
              Thêm mới
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
      <br></br>
      {students.length > 0 && (
        <div>
          <h1>Student List</h1>
          <table className="table table-dark" align="center">
            {/* Render the full student list */}
            <thead>
              <tr>
                <th>Ma sinh vien</th>
                <th>Ten sinh vien</th>
                <th>Ngay sinh</th>
                <th>Gioi tinh</th>
                <th>Ma khoa</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.maSV}>
                  <th scope="row">{student.maSV}</th>
                  <td>{student.tenSV}</td>
                  <td>{student.ngaySinh}</td>
                  <td>{student.gioiTinh}</td>
                  <td>{student.maKhoa}</td>
                  <td>
                    <button
                      type="button"
                      className="fa fa-pencil"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteStudent(student.maSV)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Student;
