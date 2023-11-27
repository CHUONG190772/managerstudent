import React, { useState, useEffect } from "react";
import axios from "axios";

function Student() {
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
                    {/* <button
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
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                    {/* <button
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
                    </button> */}
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
