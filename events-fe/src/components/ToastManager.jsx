import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../store/toastSlice.js";

const ToastManager = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.toast);

  return (
    <div className="toast-container">
      {items.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div>
            <strong>{toast.title}</strong>
          </div>
          <button onClick={() => dispatch(removeToast(toast.id))}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ToastManager;
