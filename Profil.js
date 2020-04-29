import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Modal from "../component/Modal";
import Toast from "../component/Toast";
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap';

class Profil extends Component {
    constructor() {
        super();
        this.bind = this.bind.bind(this)
        this.state = {
            users: [],
            id_user: "",
            first_name: "",
            last_name: "",
            gender: "1",
            date_birth: "",
            no_hp: 0,
            alamat: "",
            action: "",
            find: "",
            message: "",

        }
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login 
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    Edit = item => {
        // membuka modal
        $("#modal_users").modal("show");

        // mengisikan data pada form
        if (item.gender == "P") {
            this.setState({
                gender: "1"
            })
        } else {
            this.setState({
                gender: "2"
            })
        }
        this.setState({
            action: "update",
            id_user: item.id,
            email: item.email,
            username: item.username,
            first_name: item.first_name,
            last_name: item.last_name,
            date_birth: item.date_birth,
            no_hp: item.no_hp,
            alamat: item.alamat,
        });
    }
    get_users = () => {
        // $("#loading").toast("show");
        let id_user = JSON.parse(localStorage.getItem('id'))
        // console.log(items)
        let url = "http://localhost/lapangan/public/myprofil/" + id_user;
        axios.get(url)
            .then(response => {
                // $("#loading").toast("hid_usere");
                console.log(response)
                this.setState({
                    users: response.data.profil,
                    id_user: id_user
                });
                // $("#message").toast("show");
            })
            .catch(error => {
                console.log(error);
            });
        // this.setState({
        // user: items,
        // id_user_user: item.id_user_user
        // });
    }

    // get_alamat = () => {
    //     // $("#loading").toast("show");
    //     let id_user = JSON.parse(localStorage.getItem('id_user'))

    //     let url = "http://localhost/lapangan/public/alamat/" + id_user;
    //     axios.get(url)
    //         .then(response => {
    //             this.setState({
    //                 alamat: response.data.alamat,
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    // Add_alamat = () => {
    //     $("#modal_alamat").modal("show");
    //     this.setState({
    //         action: "insert",
    //         id_user_alamat: "",
    //         id_user: "",
    //         nama_penerima: "",
    //         kode_pos: "",
    //         kecamatan: "",
    //         kota: "",
    //         jalan: "",
    //         rt: "",
    //         rw: "",
    //     });
    // }

    // Edit_alamat = (item) => {
    //     $("#modal_alamat").modal("show");
    //     this.setState({
    //         action: "update",
    //         id_user_alamat: item.id_user_alamat,
    //         id_user: item.id_user,
    //         nama_penerima: item.nama_penerima,
    //         kode_pos: item.kode_pos,
    //         kecamatan: item.kecamatan,
    //         kota: item.kota,
    //         jalan: item.jalan,
    //         rt: item.rt,
    //         rw: item.rw,
    //     });
    // }

    componentDidMount = () => {
        this.get_users();
        // this.get_alamat();
    }

    Save = (event) => {
        // console.log(this.state.image)
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal 
        let url = "http://localhost/lapangan/public/myprofil/save";
        let form = new FormData();
        form.append("id", this.state.id_user);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("gender", parseInt(this.state.gender));
        form.append("date_birth", this.state.date_birth);
        form.append("no_hp", this.state.no_hp);
        form.append("alamat", this.state.alamat);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hid_usere"); 
                console.log("WOWOW", this.state.id_user);
                this.setState({
                    message: response.data.message
                });
                $("messasge").toast("show");
                this.get_users()
                $("#modal_users").modal("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Save_alamat = (event) => {
    //     let id_user = JSON.parse(localStorage.getItem('id_user'))
    //     event.preventDefault();

    //     $("#modal_alamat").modal("hid_usere");
    //     let url = "http://localhost/lapangan/alamat/save";
    //     let form = new FormData();
    //     form.append("action", this.state.action);
    //     form.append("id_user_alamat", this.state.id_user_alamat);
    //     form.append("id_user", this.state.id_user);
    //     form.append("nama_penerima", this.state.nama_penerima);
    //     form.append("kode_pos", this.state.kode_pos);
    //     form.append("kecamatan", this.state.kecamatan);
    //     form.append("kota", this.state.kota);
    //     form.append("jalan", this.state.jalan);
    //     form.append("rt", this.state.rt);
    //     form.append("rw", this.state.rw);
    //     // form.append("image", this.state.image, this.state.image.name );
    //     axios.post(url, form)

    //         .then(response => {
    //             this.setState({ message: response.data.message });
    //             $("#message").toast("show");
    //             this.get_alamat();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    // }

    // Drop_alamat = (id_user_alamat) => {
    //     if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
    //         let url = "http://localhost/lapangan/public/alamat/drop/" + id_user_alamat;
    //         axios.delete(url)
    //             .then(response => {
    //                 $("#loading").toast("hid_usere");
    //                 this.setState({ message: response.data.message });
    //                 $("#message").toast("show");
    //                 this.get_alamat();
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }

    render() {
        const { users, alamat } = this.state;
        return (
            <div className="container py-4">
                <div className="card">
                    <div>
                        <div className="#" style={{ maxwid_userth: "200px" }}>
                            <div className="row no-gutters">
                                {/* <div className="col-md-4">
                                    {this.state.users.map((item, index) => {
                                        return (
                                            <ul class="list-group" key={index}>
                                                <img className="rounded float-left" src={'http://localhost/lapangan/public/images/' + item.image} style={{ height: "300px", wid_userth: "200px" }} /> 
                                            </ul>
                                        )
                                    })}

                                </div> */}
                                <div className="col-12">
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                                        <table className="table table-borderless">
                                            {this.state.users.map((item, index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <li class="list-group-item">ID : {item.id}</li>
                                                        <li class="list-group-item">Email : {item.email}</li>
                                                        <li class="list-group-item">Username : {item.username}</li>
                                                        <li class="list-group-item">First Name : {item.first_name}</li>
                                                        <li class="list-group-item">Last Name : {item.last_name}</li>
                                                        <li class="list-group-item">Gender : {item.gender}</li>
                                                        <li class="list-group-item">Date Of Birth : {item.date_birth}</li>
                                                        <li class="list-group-item">No Hp : {item.no_hp}</li>
                                                        <li class="list-group-item">Alamat : {item.alamat}</li>
                                                        <button className="m-1 btn btn-info btn float-right" onClick={() => this.Edit(item)}>
                                                            <span className="fa fa-edit"> Edit</span>
                                                        </button>
                                                    </ul>
                                                );
                                            })}
                                            {/* <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                                            <li className="list-group-item"> <textarea className="text-secondary" cols="50" rows="5" placeholder="Isi Alamat "></textarea></li> */}
                                            {/* <button type="submit" className="btn btn-success pull-right m-2">
                                                <span className="fa fa-check"></span> Simpan
                                            </button> */}
                                        </table>
                                    </div>
                                </div>

                                <Modal id="modal_users" title="Form User" bg_header="success"
                                    text_header="white">
                                    <form onSubmit={this.Save}>
                                        <div className="form-group">
                                            <label for="id_user">ID</label>
                                            <input type="text" className="form-control" name="id_user"
                                                value={this.state.id_user} onChange={this.bind} disabled />
                                        </div>
                                        <div className="form-group">

                                            <label for="first_name">First Name</label>
                                            <input type="text" className="form-control" name="first_name"
                                                value={this.state.first_name} onChange={this.bind} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="last_name">Last Name</label>
                                            <input type="text" className="form-control" name="last_name"
                                                value={this.state.last_name} onChange={this.bind} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="gender">Gender</label>
                                            <select class="form-control" name="gender" value={this.state.gender} onChange={this.bind} required>
                                                <option value="1">Perempuan</option>
                                                <option value="2">Laki-laki</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="date_birth">Tanggal Lahir</label>
                                            <input type="date" className="form-control" name="date_birth"
                                                value={this.state.date_birth} onChange={this.bind} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="no_hp">No. Handphone</label>
                                            <input type="tel" className="form-control" name="no_hp"
                                                value={this.state.no_hp} onChange={this.bind} required />
                                        </div>
                                        <div className="form-group">
                                            <label for="alamat">Alamat</label>
                                            <input type="text" className="form-control" name="alamat"
                                                value={this.state.alamat} onChange={this.bind} required />
                                        </div>
                                        <button type="submit" className="btn btn-success pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                        </button>
                                    </form>
                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profil;
