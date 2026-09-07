// ========================================
// API URL
// ========================================

const API_URL =
    "https://localhost:7199/api/Student";


let students = [];


// ========================================
// GET LIST
// ========================================

async function getStudentList() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to get student list"
            );

        }


        students =
            await response.json();


        displayStudents(students);

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to load student list."
        );

    }

}


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(data) {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    tableBody.innerHTML = "";


    if (data.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty"
                >
                    No students found
                </td>

            </tr>

        `;

        return;
    }


    data.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.age}
            </td>

            <td>
                ${student.gender || "-"}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        onclick="editStudent(${student.id})"
                    >
                        ✎ Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ========================================
// GET BY ID + EDIT
// ========================================

async function editStudent(id) {

    try {

        // GET:
        // /api/Student/{id}

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (response.status === 404) {

            alert(
                "Student not found."
            );

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Failed to get student."
            );

        }


        const student =
            await response.json();


        // Fill form

        document
            .getElementById("studentId")
            .value =
            student.id;


        document
            .getElementById("name")
            .value =
            student.name;


        document
            .getElementById("age")
            .value =
            student.age;


        document
            .getElementById("gender")
            .value =
            student.gender || "";


        // Hide Save

        document
            .getElementById("saveButton")
            .style.display =
            "none";


        // Show Update

        document
            .getElementById("updateButton")
            .style.display =
            "inline-block";


        // Scroll to form

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to get student details."
        );

    }

}


// ========================================
// SAVE
// ========================================

async function saveStudent() {

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const age =
        Number(
            document
                .getElementById("age")
                .value
        );


    const gender =
        document
            .getElementById("gender")
            .value;


    if (!name || !age) {

        alert(
            "Please enter name and age."
        );

        return;
    }


    const student = {

        name: name,

        age: age,

        gender: gender

    };


    try {

        const response =
            await fetch(
                API_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(student)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Save failed"
            );

        }


        alert(
            "Student saved successfully."
        );


        clearForm();


        await getStudentList();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to save student."
        );

    }

}


// ========================================
// UPDATE
// ========================================

async function updateStudent() {

    const id =
        Number(
            document
                .getElementById("studentId")
                .value
        );


    if (!id) {

        alert(
            "Student ID is required."
        );

        return;
    }


    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const age =
        Number(
            document
                .getElementById("age")
                .value
        );


    const gender =
        document
            .getElementById("gender")
            .value;


    if (!name || !age) {

        alert(
            "Please enter name and age."
        );

        return;
    }


    const student = {

        name: name,

        age: age,

        gender: gender

    };


    try {

        // PUT:
        // /api/Student/{id}

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(student)

                }
            );


        if (response.status === 404) {

            alert(
                "Student not found."
            );

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );

        }


        alert(
            "Student updated successfully."
        );


        clearForm();


        await getStudentList();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to update student."
        );

    }

}


// ========================================
// DELETE
// ========================================

async function deleteStudent(id) {

    try {

        // First get student details

        const checkResponse =
            await fetch(
                `${API_URL}/${id}`
            );


        if (checkResponse.status === 404) {

            alert(
                "Student not found."
            );

            return;
        }


        if (!checkResponse.ok) {

            throw new Error(
                "Unable to find student."
            );

        }


        const student =
            await checkResponse.json();


        // Confirmation

        const confirmed =
            confirm(
                `Are you sure you want to delete ${student.name}?`
            );


        if (!confirmed) {

            return;
        }


        // DELETE API

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (response.status === 404) {

            alert(
                "Student not found."
            );

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Student deleted successfully."
        );


        clearForm();


        await getStudentList();

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to delete student."
        );

    }

}


// ========================================
// CLEAR FORM
// ========================================

function clearForm() {

    document
        .getElementById("studentId")
        .value = "";


    document
        .getElementById("name")
        .value = "";


    document
        .getElementById("age")
        .value = "";


    document
        .getElementById("gender")
        .value = "";


    // Show Save

    document
        .getElementById("saveButton")
        .style.display =
        "inline-block";


    // Hide Update

    document
        .getElementById("updateButton")
        .style.display =
        "none";

}


// ========================================
// SEARCH
// ========================================

function searchStudents() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        students.filter(student => {

            return (

                String(student.id)
                    .toLowerCase()
                    .includes(search)

                ||

                String(student.name)
                    .toLowerCase()
                    .includes(search)

                ||

                String(student.age)
                    .toLowerCase()
                    .includes(search)

                ||

                String(student.gender || "")
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayStudents(filtered);

}