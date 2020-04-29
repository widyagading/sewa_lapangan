import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";

class Sewa extends Component {
    constructor(props) {
        super(props)
        this.bind = this.bind.bind(this)
        this.state = {
            carts: [],
            total: 0,
            profil: [],
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            message: "",
            action: "",
            find: "",
            message: ""
        }
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    getSewa = () => {
        let items = localStorage.getItem('sewa') ? JSON.parse(localStorage.getItem('sewa')) : []

        this.setState({
            carts: items,
            total: items.harga,
            id_lapangan: items.id
        }, () => {
            console.log(this.state.id_lapangan)
            localStorage.removeItem("sewa")
        });
    }

    componentDidMount() {
        this.getSewa()
        this.getProfile()
    }

    removeFromSewa = (lapangan) => {
        let carts = JSON.parse(localStorage.getItem('sewa'));
        let sewa = carts.filter(item => item.id !== lapangan.id);
        localStorage.setItem('sewa', JSON.stringify(sewa));
        this.getSewa()
    }

    clearSewa = () => {
        localStorage.removeItem('sewa');
        this.setState({ carts: [] });
    }

    getProfile = () => {
        let id = JSON.parse(localStorage.getItem('id'))
        this.setState({
            id_user: id
        })
    }

    checkout = (e) => {
        e.preventDefault()
        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action", "insert");
        form.append("id_lapangan", this.state.id_lapangan);
        form.append("id_user", this.state.id_user);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hid_usere");  
                this.setState({
                    message: response.data.message
                });

                console.log(response.data.message);

                window.location.href = "/lapangan"
                $("messasge").toast("show");
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { carts, total } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="py-5 text-center">
                        <h2>Checkout</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6 order-md-1 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your Cart</span>
                            </h4>

                            <table class="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Nama Lapangan</th>
                                        <th scope="col">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h4 className="text-capitalize font-weight">{carts.lapangan}</h4>
                                        </td>
                                        <td>
                                            <h5>
                                                <span className="badge badge-success">Rp. {carts.harga}</span>
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div><h4>
                                <small>Total Harga: </small>
                                <span className="float-right badge badge-warning text-white">Rp. {total}</span>
                            </h4><hr />
                            </div>

                        </div>
                        <div className="col-md-6 order-md-2">
                            <h4 className="mb-2">Pilih Durasi Sewa</h4>
                            <form onSubmit={this.checkout}>
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
                                <hr />
                                <button className="btn btn-warning btn-lg btn-block text-white" type="submit">
                                    Continue to checkout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sewa;