import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles.css'

export default class Modal extends React.Component {
    async setModalState(nomeDoIdDoModal) {
        var modal = document.getElementById(nomeDoIdDoModal)

        if (modal.style.display === 'none') {
            modal.style.display = 'block'
        } else {
            this.sleep(2000).then(() => {
                modal.style.display = 'none'
            })
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <React.Fragment>
                <div id="modalCarregando" style={{ display: "none" }}>
                    <div id="modal-backgound"></div>
                    <div className="modal-dialog modal-dialog-centered" tabIndex="-1" role="dialog" aria-labelledby="modalCarregando" aria-modal="true">
                        <div className="modal-dialog w-100">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p className="mt-2 mb-0 text-center">Carregando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}