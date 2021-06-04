const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const app = {
	url: "https://vue3-course-api.hexschool.io/",
	path: "sec-hexschool",
	login() {
		document.querySelector("button").addEventListener("click", e => {
			e.preventDefault();
			this.fetchApi();
		});
	},
	fetchApi() {
		const username = usernameInput.value;
		const password = passwordInput.value;

		const data = {
			username,
			password,
		};

		axios
			.post(`${this.url}admin/signin`, data)
			.then(res => {
				if (!res.data.success) throw new Error(res.data.message);
				const token = res.data.token;
				const expired = res.data.expired;
				document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
				window.location.href = "test2.html";
			})
			.catch(err => {
				alert(err.message);
			});
	},
};

app.login();
