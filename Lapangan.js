import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LapanganItem from './LapanganItem';

export default class Lapangan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lapangan: [],
            find: "",
            filter: ""
        };
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    GetLapangan = () => {
        let url = "http://localhost/lapangan/public/lapangan";
        axios.get(url)
            .then(res => {
                this.setState({ lapangan: res.data.lapangan });
            })
            .catch(error => {
                console.log(error);
            });
    }

    Search = (e) => {
        e.preventDefault()
        if (e.keyCode === 13) {
            let url = "http://localhost/lapangan/public/lapangan/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(res => {
                    this.setState({ lapangan: res.data.lapangan });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.GetLapangan();
    }

    render() {
        const renderData = this.state.lapangan.map((item, id) => {
            return (
                <LapanganItem item={item} key={id} refresh={() => this.GetLapangan()} />
            )
        })
        return (
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-3">
                        <input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Pencarian.." />
                        <hr></hr>
                        <h4>Kategori</h4>
                        <form onSubmit={this.Filter}>
                            <div className="form-group">
                                <select className="form-control" name="filter" value={this.state.value} onChange={this.bind}>
                                    <option value="">Choose...</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-info pull-right m-2">
                                Filter
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-9">

                        <div className="row">
                            {renderData}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
