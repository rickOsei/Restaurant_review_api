const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputNameDOM = document.querySelector(".task-input-name");
const taskInputEmailDOM = document.querySelector(".task-input-email");
const taskInputPasswordDOM = document.querySelector(".task-input-password");
const clickie = document.querySelector(".click");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputNameDOM.value;
  const email = taskInputEmailDOM.value;
  const password = taskInputPasswordDOM.value;

  try {
    const { data } = await axios.post("/api/v1/auth/register", {
      name,
      email,
      password,
    });

    console.log(data.userName, data.token);
  } catch (error) {
    console.log(error);
  }
});

clickie.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("http://localhost:3000/api/v1/auth/google");
});
