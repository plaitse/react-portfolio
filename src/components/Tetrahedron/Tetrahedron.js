import React, { Component } from 'react';

import init from './WebGL/init';
import styles from './Tetrahedron.module.css';

class tetrahedron extends Component {
    state = {
        show: true,
        width: window.innerWidth / 3
    }

    componentDidMount() {
        init('tetra');
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if (document.getElementById('tetra') != null) {
            this.setState({ show: false });
            setTimeout(() => { 
                this.setState({ show: true });
                init('tetra'); 
            }, 50);
        }
        this.setState({width: window.innerWidth / 3});
    }

    render() {
        return (
            <div className={styles.wrapper}>
                { this.state.show ? (
                    <canvas id='tetra' width={this.state.width} height={this.state.width}></canvas>
                ) : null }
            </div>
        );
    }
}

export default tetrahedron;
