import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class DataSewa extends Component {
    constructor() {
        super();
        this.state = {
            datasewa: [],
            id: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
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

    Edit = (item) => {
        // membuka modal
        $("#modal_datasewa").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id: item.id_sewa,
            id_lapangan: item.id_lapangan,
            id_user: item.id_user,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
            status: item.status
        }, () => {
            console.log("UW", this.state.id_lapangan)
        });
    }

    get_datasewa = () => {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa";
        axios.get(url)
            .then(response => {
                this.setState({ datasewa: response.data.sewa });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Drop = id => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/" + id;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    this.get_datasewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount = () => {
        this.get_datasewa();
    }

    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");

        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("id_lapangan", this.state.id_lapangan);
        form.append("id_user", this.state.id_user);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);

        axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_datasewa();

                $("#modal_datasewa").modal("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/find";
            let form = new FormData();
            form.append("tgl", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ datasewa: response.data.sewa });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    usedHandler = (id) => {
        let url = "http://localhost/lapangan/public/sewa/used/" + id;

        axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_datasewa();
            })
            .catch(error => {
                console.log(error);
            });
    }

    doneHandler = (id) => {
        let url = "http://localhost/lapangan/public/sewa/done/" + id;

        axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_datasewa();
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="container py-4">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Sewa</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Cari Berdasarkan Tanggal" />
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
                                        <th>ID Lapangan</th>
                                        <th>ID User</th>
                                        <th>Tanggal Penyewaan</th>
                                        <th>Waktu Mulai</th>
                                        <th>Waktu Selesai</th>
                                        <th>Durasi</th>
                                        <th>Status</th>
                                        <th style={{textAlign: "center"}}>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.datasewa.map((item) => {
                                        return (
                                            <tr key={item.id_sewa}>
                                                <td>{item.id_sewa}</td>
                                                <td>{item.id_lapangan}</td>
                                                <td>{item.id_user}</td>
                                                <td>{item.tgl_book}</td>
                                                <td>{item.wkt_mulai}</td>
                                                <td>{item.wkt_selesai}</td>
                                                <td>{item.durasi}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <button className="m-1 btn btn-sm btn-warning" onClick={() => this.usedHandler(item.id_sewa)}>
                                                        Used
                                                    </button>
                                                    <button className="m-1 btn btn-sm btn-success" onClick={() => this.doneHandler(item.id_sewa)}>
                                                        Done
                                                    </button>
                                                    <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                        <span className="fa fa-edit">Edit</span>
                                                    </button>
                                                    <button className="m-1 btn btn-sm btn-danger"
                                                        onClick={() => this.Drop(item.id_sewa)}>
                                                        <span className="fa fa-trash">Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal id="modal_datasewa" title="Edit Data Sewa" bg_header="success"
                    text_header="white">
                    <form onSubmit={this.Save}>
                        <div className="form-group">
                            <label for="tgl_book">Tanggal Sewa</label>
                            <input type="date" className="form-control" name="tgl_book"
                                value={this.state.tgl_book} onChange={this.bind} required />
                        </div>
                        <div className="form-group">
                            <label for="wkt_mulai">Waktu Mulai</label>
                            <input type="time" className="form-control" name="wkt_mulai"
                                value={this.state.wkt_mulai} onChange={this.bind} required />
                        </div>
                        <div className="form-group">
                            <label for="wkt_selesai">Waktu Selesai</label>
                            <input type="time" className="form-control" name="wkt_selesai"
                                value={this.state.wkt_selesai} onChange={this.bind} required />
                        </div>
                        <button type="submit" className="btn btn-success pull-right m-2">
                            <span className="fa fa-check"></span> Simpan
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }

}
export default DataSewa;