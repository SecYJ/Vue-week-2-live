const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");

const app = {
	url: "https://vue3-course-api.hexschool.io/",
	path: "sec-hexschool",
	data: [],
	fetchData() {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
			"$1"
		);
		axios.defaults.headers.common["Authorization"] = token;
		axios
			.post(`${this.url}api/user/check`)
			.then(res => {
				const { success, message } = res.data;
				if (!success) throw new Error(message);
				return axios.get(`${this.url}api/${this.path}/admin/products`);
			})
			.then(res => {
				const { success, products } = res.data;
				if (!success) throw new Error("发生错误, 请稍后重试!");
				this.data = products;
				this.render();
			})
			.catch(err => {
				alert(err.message);
                window.location = "index.html"
			});
	},
	render() {
		let template = "";
		this.data.forEach(item => {
			template += `<tr>
                <td>${item.title}</td>
                <td width="120">${item.origin_price}</td>
                <td width="120">${item.price}</td>
                <td width="100">
                    <span class="${
						item.is_enabled ? "text-success" : "text-danger"
					}">${item.is_enabled ? "啟用" : "不啟用"}</span>
                </td>
                <td width="120">
                    <button
                        type="button"
                        class="
                            btn btn-sm btn-outline-danger
                            move
                            deleteBtn
                        "
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        刪除
                    </button>
                </td>
            </tr>`;
		});

		productList.innerHTML = template;
		productCount.textContent = this.data.length;
	},
	init() {
		this.fetchData();
		this.remove();
	},
	remove() {
		productList.addEventListener("click", e => {
			const { action, id } = e.target.dataset;
            if (action !== "remove") return;
            if (!window.confirm("确定删除?")) return;
            axios.delete(`${this.url}api/${this.path}/admin/product/${id}`)
            .then(res => {
                const { success, message } = res.data;
                if (!success) throw new Error(message);
                this.fetchData()
                alert(message)
            })
            .catch(err => {
                alert(err.message)
            })
		});
	},
};

app.init();
 