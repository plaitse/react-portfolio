import React, { Component } from 'react';
// import * as WebgGl from './gl-matrix';

// import * as Test from './Tetrahedron-webgl';
import init from './Init';
import styles from './Tetrahedron.module.css';

class tetrahedron extends Component {
    
    componentDidMount() {
        init('tetra');
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <canvas id='tetra' width={500} height={500}></canvas>
            </div>
        );
    }
}

export default tetrahedron;