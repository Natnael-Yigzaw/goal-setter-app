import { useDispatch } from "react-redux";
import { deleteGoal } from "../feautres/goals/goalSlice";
import { FaTrash } from "react-icons/fa";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-us")}</div>
      <p>{goal.text}</p>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <FaTrash />
      </button>
    </div>
  );
}

export default GoalItem;
