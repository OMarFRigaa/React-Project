import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Mock login (in a real app, this would be an API call)
    // For demo purposes, just check if email contains "user"
    if (formData.email.includes("user") && formData.password.length >= 6) {
      const mockUser = {
        id: 1,
        username: formData.email.split("@")[0],
        email: formData.email,
        avatarUrl: null,
      };

      login(mockUser);
      navigate("/");
    } else {
      setError(
        'Invalid credentials. Try with an email containing "user" and password with at least 6 characters'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Login to Postify
          </h2>

          {error && <div className="alert alert-error mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white text-black"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered bg-white text-black"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
