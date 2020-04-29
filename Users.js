import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            id: "",
            username: "",
            email: "",
            password: "",
            gender: "1",
            role: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        // if(!localStorage.getItem("Token")){
        // //     //direct ke hlaman login
        //     window.location = "/login";
        //  }
    }
    
    bind = (event) => {
        // fungsi utk membuka form tambah data
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)
    }

    Add = () => {
        // fungsi utk membuka form edit data
        // membuka modal
        $("#modal_users").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            username: "",
            email: "",
            password: "",
            role: "member"
        });
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_users").modal("show");
        // mengisikan data pd form
        if(item.gender == "P"){
            this.setState({
                gender: "1"
            })
        }else{
            this.setState({
                gender: "2"
            })
        }
        this.setState({
            action: "update",
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            date_birth: item.date_birth,
            no_hp: item.no_hp,
            alamat: item.alamat,
            name: item.name,
            username: item.username,
            email: item.email,
            password: item.password,
            role: item.role,
        });
    };
    get_users = () => {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member";
        axios.get(url)
            .then(response => {
                this.setState({ users: response.data.member });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }
    Drop = id => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member/drop/" + id;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    this.get_users();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    componentDidMount = () => {
        this.get_users();
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_users").modal("hide");
        let url = "http://localhost/lapangan/public/member/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("gender", parseInt(this.state.gender));
        form.append("date_birth", this.state.date_birth);
        form.append("no_hp", this.state.no_hp);
        form.append("alamat", this.state.alamat);
        axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_users();
            })
            .catch(error => {
                console.log(error);
            });
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/member/find";
            let form = new FormData();
            form.append("searchBy", "first_name");
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ users: response.data.member });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    render() {
        return (
            <div className="container py-4">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data user</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>UserName</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Role</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.password}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                        <span className="fa fa-edit"></span>
                                                    </button>
                                                    <button className="m-1 btn btn-sm btn-danger"
                                                        onClick={() => this.Drop(item.id)}>
                                                        <span className="fa fa-trash"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* tombol tambah */}
                        <button className="btn btn-info mt-4" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal users*/}
                        <Modal id="modal_users" title="Form user" bg_header="success" text_header="white">
                            <form onSubmit={this.Save}>
                                Username
                                <input type="text" className="form-control" name="username"
                                    value={this.state.username} onChange={this.bind} required />
                                Email
                                <input type="text" className="form-control" name="email"
                                    value={this.state.email} onChange={this.bind} required />
                                Password
                                <input type="text" className="form-control" name="password"
                                    value={this.state.password} onChange={this.bind} required />
                                First name
                                <input type="text" className="form-control" name="first_name"
                                    value={this.state.first_name} onChange={this.bind} required />
                                Last Name
                                <input type="text" className="form-control" name="last_name"
                                    value={this.state.last_name} onChange={this.bind} required />
                                Gender
                                <select class="form-control" name="gender" value={this.state.gender} onChange={this.bind} required>
                                    <option value="1">Perempuan</option>
                                    <option value="2">Laki-laki</option>
                                </select>
                                Tanggal Lahir
                                <input type="date" className="form-control" name="date_birth"
                                    value={this.state.date_birth} onChange={this.bind} required />
                                No HP
                                <input type="tel" className="form-control" name="no_hp"
                                    value={this.state.no_hp} onChange={this.bind} required />
                                Alamat
                                <input type="text" className="form-control" name="alamat"
                                    value={this.state.alamat} onChange={this.bind} required />

                                <div className="form-group">
                                    <label for="role">Role</label>
                                    <select class="form-control" name="role" value={this.state.role} onChange={this.bind} required>
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

}
export default Users;