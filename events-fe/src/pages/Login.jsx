import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector(state => state.auth);
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === "succeeded" && token) {
      navigate("/");
    }
  }, [status, token, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{t("login")}</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">{t("email")}:</label>
            <input id="email" type="email" {...register("email")} />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input id="password" type="password" {...register("password")} />
          </div>
          <button type="submit">{t("login")}</button>
        </form>
        {status === "loading" && (
          <p className="loading-message">{t("logging-in")}</p>
        )}
        {status === "failed" && (
          <p className="error-message">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
