import "./Button.css";

export default function Button({ userAction, handler }) {
  return (
    <button className="btn" onClick={handler}>
      {userAction}
    </button>
  );
}
