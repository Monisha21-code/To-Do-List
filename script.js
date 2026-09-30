// =====================================
// SIGN UP
// =====================================

function signup() {

    let name =
        document.getElementById("signupName").value.trim();

    let email =
        document.getElementById("signupEmail").value.trim();

    let password =
        document.getElementById("signupPassword").value;


    if (name === "" || email === "" || password === "") {

        alert("Please fill all fields.");

        return;
    }


    let user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify([])
    );


    alert("Account created successfully!");


    window.location.href =
        "login.html";
}



// =====================================
// LOGIN
// =====================================

function login() {

    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;


    let savedUser =
        localStorage.getItem("user");


    if (savedUser === null) {

        alert(
            "No account found. Please sign up first."
        );

        return;
    }


    let user =
        JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert("Login successful!");


        window.location.href =
            "index.html";

    }

    else {

        alert(
            "Invalid email or password."
        );

    }
}



// =====================================
// FORGOT PASSWORD
// =====================================

function forgotPassword() {

    let savedUser =
        localStorage.getItem("user");


    if (savedUser === null) {

        alert(
            "No account found. Please create an account first."
        );

        window.location.href =
            "signup.html";

        return;
    }


    let user =
        JSON.parse(savedUser);


    let email =
        prompt(
            "Enter your registered email:"
        );


    if (email === null) {

        return;
    }


    email = email.trim();


    if (email !== user.email) {

        alert(
            "Email not found."
        );

        return;
    }


    let newPassword =
        prompt(
            "Enter your new password:"
        );


    if (newPassword === null) {

        return;
    }


    newPassword =
        newPassword.trim();


    if (newPassword === "") {

        alert(
            "Password cannot be empty."
        );

        return;
    }


    user.password =
        newPassword;


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert(
        "Password changed successfully!"
    );
}



// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );


    window.location.href =
        "login.html";
}



// =====================================
// CREATE TASK
// =====================================

function createTask() {

    let title =
        document.getElementById("taskTitle").value.trim();

    let description =
        document.getElementById("taskDescription").value.trim();

    let date =
        document.getElementById("taskDate").value;


    if (title === "") {

        alert(
            "Please enter a task title."
        );

        return;
    }


    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    let task = {

        id: Date.now(),

        title: title,

        description: description,

        date: date,

        status: "Pending",

        completed: false

    };


    tasks.push(task);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    alert(
        "Task added successfully!"
    );


    document.getElementById(
        "taskTitle"
    ).value = "";


    document.getElementById(
        "taskDescription"
    ).value = "";


    document.getElementById(
        "taskDate"
    ).value = "";


    displayTasks();

    updateDashboard();
}



// =====================================
// GET TASKS
// =====================================

function getTasks() {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    // Fix old tasks
    tasks.forEach(function(task) {

        if (!task.status) {

            if (task.completed === true) {

                task.status = "Completed";

            }

            else {

                task.status = "Pending";

            }

        }

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    return tasks;
}



// =====================================
// DASHBOARD
// =====================================

function updateDashboard() {

    let tasks =
        getTasks();


    let total =
        tasks.length;


    let pending =
        tasks.filter(function(task) {

            return task.status === "Pending";

        }).length;


    let progress =
        tasks.filter(function(task) {

            return task.status === "In Progress";

        }).length;


    let completed =
        tasks.filter(function(task) {

            return task.status === "Completed";

        }).length;



    let totalElement =
        document.getElementById(
            "totalTasks"
        );


    let pendingElement =
        document.getElementById(
            "pendingTasks"
        );


    let progressElement =
        document.getElementById(
            "progressTasks"
        );


    let completedElement =
        document.getElementById(
            "completedTasks"
        );


    let percentageElement =
        document.getElementById(
            "progressPercentage"
        );


    let progressBar =
        document.getElementById(
            "progressBar"
        );



    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }


    if (progressElement) {

        progressElement.textContent =
            progress;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }



    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    if (percentageElement) {

        percentageElement.textContent =
            percentage + "%";

    }


    if (progressBar) {

        progressBar.style.width =
            percentage + "%";

    }

}



// =====================================
// DISPLAY TASKS
// =====================================

function displayTasks() {

    let taskList =
        document.getElementById(
            "homeTaskList"
        );


    if (!taskList) {

        return;
    }


    let tasks =
        getTasks();


    taskList.innerHTML = "";



    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks available. Create your first task above! 📝</p>";

        return;
    }



    tasks.forEach(function(task) {


        let li =
            document.createElement("li");


        li.className =
            "task";


        li.innerHTML = `

            <h3>
                📝 ${task.title}
            </h3>

            <p>
                ${task.description || "No description"}
            </p>

            <p>
                <strong>📅 Due Date:</strong>
                ${task.date || "No date"}
            </p>

            <p>
                <strong>📌 Status:</strong>
                ${task.status}
            </p>


            <button
                class="complete"
                onclick="completeTask(${task.id})">

                ✅ Complete

            </button>


            <button
                class="delete"
                onclick="deleteTask(${task.id})">

                🗑️ Delete

            </button>

        `;


        taskList.appendChild(li);

    });

}



// =====================================
// COMPLETE TASK
// =====================================

function completeTask(id) {

    let tasks =
        getTasks();


    tasks.forEach(function(task) {

        if (task.id === id) {

            task.status =
                "Completed";

            task.completed =
                true;

        }

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

    updateDashboard();

    displayHistory();


    alert(
        "Task completed! ✅"
    );
}



// =====================================
// DELETE TASK
// =====================================

function deleteTask(id) {

    let tasks =
        getTasks();


    tasks =
        tasks.filter(function(task) {

            return task.id !== id;

        });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

    updateDashboard();


    alert(
        "Task deleted."
    );
}



// =====================================
// HISTORY
// =====================================

function displayHistory() {

    let historyList =
        document.getElementById(
            "historyList"
        );


    if (!historyList) {

        return;
    }


    let tasks =
        getTasks();


    let completedTasks =
        tasks.filter(function(task) {

            return task.status === "Completed";

        });


    historyList.innerHTML = "";



    if (completedTasks.length === 0) {

        historyList.innerHTML =
            "<p>No completed tasks yet. 📋</p>";

        return;
    }



    completedTasks.forEach(function(task) {

        let li =
            document.createElement("li");


        li.className =
            "task";


        li.innerHTML = `

            <h3>
                ✅ ${task.title}
            </h3>

            <p>
                ${task.description || "No description"}
            </p>

            <p>
                <strong>📅 Due Date:</strong>
                ${task.date || "No date"}
            </p>

            <p>
                <strong>📌 Status:</strong>
                Completed
            </p>

        `;


        historyList.appendChild(li);

    });

}



// =====================================
// PROFILE
// =====================================

function loadProfile() {

    let nameInput =
        document.getElementById(
            "profileName"
        );


    let emailInput =
        document.getElementById(
            "profileEmail"
        );


    if (!nameInput || !emailInput) {

        return;
    }


    let savedUser =
        localStorage.getItem("user");


    if (savedUser === null) {

        window.location.href =
            "signup.html";

        return;
    }


    let user =
        JSON.parse(savedUser);


    nameInput.value =
        user.name || "";


    emailInput.value =
        user.email || "";

}



// =====================================
// UPDATE PROFILE
// =====================================

function updateProfile() {

    let name =
        document.getElementById(
            "profileName"
        ).value.trim();


    let email =
        document.getElementById(
            "profileEmail"
        ).value.trim();


    if (name === "" || email === "") {

        alert(
            "Please fill all fields."
        );

        return;
    }


    let savedUser =
        localStorage.getItem("user");


    if (!savedUser) {

        alert(
            "User not found."
        );

        return;
    }


    let user =
        JSON.parse(savedUser);


    user.name =
        name;


    user.email =
        email;


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert(
        "Profile updated successfully! ✅"
    );
}



// =====================================
// RUN WHEN PAGE LOADS
// =====================================

displayTasks();

updateDashboard();

displayHistory();

loadProfile();