import { useContext } from 'react';
import AppContext from '@/context/appContext';
import CheckedContext from '@/context/checkedContext';

function Navbar({ searchQuery, setSearchQuery, setAlertMassage }) {


    const CheckedContextData = useContext(CheckedContext)
    
    const value = useContext(AppContext)

    const checkedIds = CheckedContextData.checkedUser;

    async function handlerDeleteMulti(e) {
        e.preventDefault();

        const reqOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: checkedIds })
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/deleteMulti`, reqOptions);
        const result = await response.json();

        if ("ids" in result) {
            setAlertMassage("Usuarios eliminados com sucesso");

            const newUsers = value.users.filter(user => {
                return result.ids.indexOf(user.id) === -1;
            });
            value.setMyUsers(newUsers);
        }
    }




    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>NextJS-MySQL <b>CRUD</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Adicione novo registro</span></a>
                        <a href="#" className="delete_all_data btn btn-danger" onClick={async (e) => await handlerDeleteMulti(e)}><i className="material-icons">&#xE15C;</i> <span>Deletar</span></a>
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" className="form-control" style={{ width: "200px", float: "right", height: "34px" }} name="search_user" placeholder="Pesquise pelo nome..." />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Navbar;