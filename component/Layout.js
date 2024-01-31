import React, { useContext, useState } from 'react';
import Alert from './Alert';
import Navbar from './Navbar';
import Pagination from './Pagination';
import UsersTable from './UsersTable';
import AppContext from '@/context/appContext';
import { Paginate } from '@/helpers/paginate';
import { Search } from '@/helpers/search';
import CheckedContext from '@/context/checkedContext';

function Layout() {
    const value = useContext(AppContext);

    const [checkedUser, setCheckedUser] = useState([]);


    console.log(checkedUser);

    const [alertMassage, setAlertMassage] = useState("")

    const [saveUser, setSaveUser] = useState({
        username: "",
        email: ""
    });

    const [editUser, setEditUser] = useState({

        id: "",
        email: "",
        username: ""
    })
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    let searchedResult;
    let paginatedUsers;

    if (searchQuery.length > 0) {
        searchedResult = Search(value.users, searchQuery);
        paginatedUsers = Paginate(searchedResult, currentPage, pageSize);
    } else {
        paginatedUsers = Paginate(value.users, currentPage, pageSize);
    }

    const handSaveChange = ({ target: { name, value } }) => {
        setSaveUser((prevSaveUser) => ({ ...prevSaveUser, [name]: value }));
    };

    const handlerAddSubmit = async (e) => {
        e.preventDefault();

        const reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(saveUser)
        };

        const response = await fetch(`http://localhost:3000/api/users`, reqOptions);
        const result = await response.json();


        setSaveUser({
            username: "",
            email: ""
        })

        if (result) {
            setAlertMassage("Usuário adicionado com sucesso.")
            document.querySelector(".addCancel").click();

            const prevUsers = [...value.users, result];
            value.setMyUsers(prevUsers);
        }
    };


    const handlerDelete = async (userId) => {
        const reqOptions = {
            method: "DELETE"
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/` + userId, reqOptions);

        const result = await response.json();

        if (result) {
            setAlertMassage("Usuário deletado com sucesso.")
            const prevUsers = value.users;
            const newUsers = prevUsers.filter(user => {
                return user.id !== userId;
            })
            value.setMyUsers(newUsers);
        }
    }

    const handlerEditChange = ({ target: { name, value } }) => {
        setEditUser({ ...editUser, [name]: value })
    }

    const handlerEditSubmit = async (e) => {
        e.preventDefault();

        const reqOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editUser)
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/` + editUser.id, reqOptions);
        const result = await response.json();

        if (result) {
            setAlertMassage("Usuário editado com sucesso.")
            document.getElementsByClassName("editCancel")[0].click();

            const prevUsers = value.users.filter(user => {
                return user.id !== editUser.id;
            })

            prevUsers.push(result)
            value.setMyUsers(prevUsers);

        }
    }
    return (
        <>
            <CheckedContext.Provider value={{
                checkedUser: checkedUser,
                setCheckedUser: setCheckedUser

            }}>
                <div id="addEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handlerAddSubmit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Adicionar Registro</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={saveUser.username} onChange={handSaveChange} type="text" className="form-control" name="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={saveUser.email} onChange={handSaveChange} type="email" className="form-control" name="email" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default addCancel" name="submit" data-dismiss="modal" value="Cancel" />
                                    <input type="submit" className="btn btn-success" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="editEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handlerEditSubmit}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Editar Registro</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="updateId" className="updateId" />
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" value={editUser.username} onChange={handlerEditChange} className="form-control updateUsername" name="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" value={editUser.email} onChange={handlerEditChange} className="form-control updateEmail" name="email" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" name="submit" className="btn btn-default editCancel" data-dismiss="modal" value="Cancel" />
                                    <input type="submit" className="btn btn-info" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="container-xl">
                    <div className="table-responsive d-flex flex-column">
                        <Alert text={alertMassage} setAlertMassage={setAlertMassage} style={alertMassage.length > 0 ? 'block' : 'none'} />
                        <div className="table-wrapper">
                            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setAlertMassage={setAlertMassage } />
                            <UsersTable setEditUser={setEditUser} users={paginatedUsers} handlerDelete={handlerDelete} />
                            <Pagination usersCount={searchQuery.length > 0 ? searchedResult.length : value.users.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
                        </div>
                    </div>
                </div>
            </CheckedContext.Provider>
        </>
    )
}

export default Layout;