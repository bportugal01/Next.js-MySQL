import CheckedContext from "@/context/checkedContext";
import { useContext } from "react";

function User({ user, handlerDelete, setEditUser, checkedAll, setCheckedAll }) {

    const value = useContext(CheckedContext)

    const fetchUser = async (userId) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/` + userId);
        const result = await response.json();

        setEditUser(result);
    }

    const handlerChangeChecked = ({ target }, userId) => {
        const { checked } = target;
    
        if (checkedAll && !checked) {
            setCheckedAll(false);
        }

        if (checked) {
            value.setCheckedUser([...value.checkedUser, userId])
        } else {
            const newCheckedUser = value.checkedUser.filter(user => {
                return user !== userId;
            })
            value.setCheckedUser(newCheckedUser)
        }
    }

    return (
        <>
            <tr>

                <td>
                    <span className="custom-checkbox">
                        <input type="checkbox" id="data_checkbox" onChange={(e) => handlerChangeChecked(e, user.id)} className="data_checkbox" name="data_checkbox" value="" />
                        <label htmlFor="data_checkbox"></label>
                    </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <a href="#editEmployeeModal" onClick={() => fetchUser(user.id)} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" onClick={() => handlerDelete(user.id)} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        </>
    )
}

export default User;