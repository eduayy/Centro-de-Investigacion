import "./register.css";

function register() {
  return (
    <main className="main-content">
      <div className="register-form">
        <div className="register-title">
          <img
            src="src\assets\images\image.png"
            alt="ciateq-icon"
            style={{ width: "180px", height: "60px" }}
          ></img>
          <h4
            style={{
              fontSize: "35px",
              margin: "4px 0",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Create your account
          </h4>
          <p style={{ fontSize: "14px", margin: "4px 0", color: "#718096" }}>
            Signup now and get full access to our app.
          </p>
        </div>
        <form autoComplete="off" className="form-inputs">
          <label>
            <input type="text" placeholder="Name" required></input>
          </label>
          <label>
            <input type="text" placeholder="Email" required></input>
          </label>
          <label>
            <input type="password" placeholder="Password" required></input>
          </label>
          <label>
            <input
              type="password"
              placeholder="Confirm password"
              required
            ></input>
          </label>
        </form>
        <button
          className="register-user-btn"
          style={{ color: "white", fontWeight: "bold" }}
        >
          Submit →
        </button>
        <p className="register-redirect">
          Already have an account ? <a href="/login">Signin</a>
        </p>
      </div>
    </main>
  );
}

export default register;
