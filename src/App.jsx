import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import { useEffect } from "react";

function App() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		fetch("https://backend-53.vercel.app/users")
			.then((response) => response.json())
			.then((data) => setUser(data));
	}, []);

	const addUser = (event) => {
		event.preventDefault();

		const from = event.target;
		const userId = from.id.value;
		const age = from.age.value;
		const name = from.name.value;
		const email = from.email.value;
		const profession = from.profession.value;
		const address = from.address.value;

		const user = { userId, name, age, profession, email, address };

		fetch("https://backend-53.vercel.app/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.acknowledged) {
					document.getElementById("alert-head").style.display = "grid";
					from.reset();
				}
			});
	};

	const CloseAlert = () => {
		document.getElementById("alert-head").style.display = "none";
		window.location.reload();
	};

	return (
		<>
			<div id="alert-head" className="alertBox-head">
				<div className="alert_box">
					<div className="icon">
						<i className="fa-regular fa-address-card"></i>
					</div>
					<header>Confirm</header>
					<p>Your UserAdd is Successfully Done.</p>
					<div className="btns">
						<label onClick={CloseAlert} htmlFor="check">
							Ok
						</label>
					</div>
				</div>
			</div>

			<div className="container my-5 row row-gap-5">
				<form onSubmit={addUser} className="col-6 px-5">
					<div className="row">
						<div className="mb-3 col-6">
							<label htmlFor="exampleFormControlInput1" className="form-label">
								UserId
							</label>
							<input
								name="id"
								type="number"
								className="form-control"
								id="exampleFormControlInput1"
								placeholder="0"
								min={0}
								required
							/>
						</div>
						<div className="mb-3 col-6">
							<label htmlFor="exampleFormControlInput2" className="form-label">
								Age
							</label>
							<input
								name="age"
								type="number"
								className="form-control"
								id="exampleFormControlInput2"
								placeholder="0"
								min={0}
								required
							/>
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleFormControlInput3" className="form-label">
							Name
						</label>
						<input
							name="name"
							type="name"
							className="form-control"
							id="exampleFormControlInput3"
							placeholder="Enter Name"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleFormControlInput4" className="form-label">
							Profession
						</label>
						<input
							name="profession"
							type="text"
							className="form-control"
							id="exampleFormControlInput4"
							placeholder="Enter Profession"
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleFormControlInput5" className="form-label">
							Email address
						</label>
						<input
							name="email"
							type="email"
							className="form-control"
							id="exampleFormControlInput5"
							placeholder="name@example.com"
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="exampleFormControlInput6" className="form-label">
							Address
						</label>
						<input
							name="address"
							type="text"
							className="form-control"
							id="exampleFormControlInput6"
							placeholder="Dhaka, Bangladesh"
							required
						/>
					</div>

					<button type="submit" className="btn btn-success w-100 py-3 mt-3">
						AddUser
					</button>
				</form>

				<div className="accordion col-6" id="accordionExample">
					{user.map((sUser) => (
						<>
							<div
								key={sUser._id}
								className="accordion-item my-3 rounded overflow-hidden">
								<h2 className="accordion-header">
									<button
										className="w-100 rounded border collapsed fw-semibold py-3 bg-body-secondary fs-4"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#collapse${sUser._id}`}
										aria-expanded="false"
										aria-controls="collapseTwo">
										{sUser.name}
									</button>
								</h2>
								<div
									id={`collapse${sUser._id}`}
									className="accordion-collapse collapse"
									data-bs-parent="#accordionExample">
									<div className="accordion-body">
										<p>
											<strong>Age :</strong> {sUser.age}
										</p>
										<p>
											<strong>Profession :</strong> {sUser.profession}
										</p>
										<p>
											<strong>Email :</strong> {sUser.email}
										</p>
										<p>
											<strong>Address :</strong> {sUser.address}
										</p>
										<p>
											<strong>About : </strong>A developer is a technology
											professional who works on, builds and creates software,
											websites, applications and other systems. Often,
											developers require a knowledge of coding to write and
											debug source code for applications and{" "}
											<code>software effectively.</code>
										</p>
									</div>
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
