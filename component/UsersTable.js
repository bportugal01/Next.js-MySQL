import { useState, useContext } from 'react';
import CheckedContext from '@/context/checkedContext';
import User from './User';

function UsersTable({ users, handlerDelete, setEditUser }) {
    const [checkedAll, setCheckedAll] = useState(false);
    const value = useContext(CheckedContext)

    const handlerSelectAllChange = (e) => {

        const { checked } = e.target;
        setCheckedAll(checked);

        let checkedAllUser;

        let checkboxes = document.querySelectorAll('table tbody input[type="checkbox"]');
        if (checked) {
            setCheckedAll(true)


            checkboxes.forEach((checkbox) => {
                checkbox.checked = true;
            });
            checkedAllUser = [];

            users.map(user => {
                checkedAllUser.push(user.id)
            })

        } else {
            setCheckedAll(false)
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;

            })
            checkedAllUser = [];

        }
        value.setCheckedUser(checkedAllUser)
    }



    const userGenerator = () => {
        return (
            <>
                {users.map((user) => (
                    <User checkedAll={checkedAll} setCheckedAll={setCheckedAll} setEditUser={setEditUser} key={user.id} user={user} handlerDelete={handlerDelete} />
                ))}
            </>
        );
    };


    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <span className="custom-checkbox">
                                <input type="checkbox" id="selectAll" onChange={(e) => handlerSelectAllChange(e)} value={checkedAll} />
                                <label htmlFor="selectAll"></label>
                            </span>
                        </th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userGenerator()
                    }
                </tbody>
            </table>
        </>
    )
}

export default UsersTable;