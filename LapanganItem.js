import React from 'react';

export default class LapnganItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            total: 0
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addToSewa = (item) => {
        // let oldItems = JSON.parse(localStorage.getItem('sewa')) || []
        // let newid = item.id
        // let match = oldItems.find(({ id }) => id === newid);
        // if (match) {
        //     match['total'] = match['total'] + item.harga;
        // }
        // else {
        let newItem = {
            'id': item.id,
            'lapangan': item.nama,
            'harga': item.harga,
        };
        // oldItems.push(newItem);
        // }
        localStorage.setItem('sewa', JSON.stringify(newItem));
        alert("item berhasil ditambah")
        window.location.href = "/sewa"
        this.props.refresh();
        console.log("SEWA", localStorage.getItem('sewa'))
    }

    render() {
        const { item } = this.props;
        let check = JSON.parse(localStorage.getItem('sewa')) || []
        let match = check.id === item.id;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100" style={{ marginBottom: "10px" }}>
                    <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + item.gambar} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="" style={{ textDecoration: "none" }}>{item.nama}</a>
                        </h4>
                        <h5>Rp. {item.harga}</h5>
                        <div>
                            {!match ?
                                <button className="btn btn-sm btn-warning text-white mt-2"
                                    onClick={() => this.addToSewa(item)}>
                                    Sewa
                                </button>

                                :
                                <div></div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
