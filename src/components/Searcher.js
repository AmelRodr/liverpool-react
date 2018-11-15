import React, { Component } from 'react';
import getProducts from '../services/GetProducts'
import SearcherDisplay from './SearcherDisplay'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContents: 'flex-end',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 400,
    },
});

class Searcher extends Component {

    state = {
        historial: [],
        productos: [],
        loading: false,
        cantidad: 0,
        filter: ''

    }
    componentWillMount() {
        this.getData()
    }
    onSubmit = (e) => {
        e.preventDefault()
        const { filter, historial } = this.state
        historial.push(filter)
        localStorage.setItem('historial', JSON.stringify(historial))
        this.props.history.push(`/tienda/:${filter}`)
        getProducts(filter)
            .then(res => {
                let array = res.data.contents[0].mainContent
                var tam = array.length
                let datos = res.data.contents[0].mainContent[tam - 1].contents[0].records
                let cantidad = datos.length;
                this.setState({ productos: datos, cantidad: cantidad })

                localStorage.setItem('productos', JSON.stringify(datos));

            }).catch(e => console.log(e))
    }

    getData() {
        let productos = JSON.parse(localStorage.getItem('productos'))
        let historial = JSON.parse(localStorage.getItem('historial'))
        if (productos === undefined) {
            return
        } else {
            this.setState({ productos: productos, historial: historial })
        }
    }

    onChange = (event) => {
        const value = event.target.value
        this.setState({ filter: value })

    }

    render() {
        const { productos, historial } = this.state
        const { classes } = this.props
        return (
            <div>
                <div style={{ width: '100%', height: '4em', backgroundColor: '#ED0093', display: 'flex' }}>
                    <div style={{ width: '20%' }}><img src="https://assets.liverpool.com.mx/assets/images/logos/liverpool-logo.svg" style={{ width: '70%', height: '80%', padding: '3% 10%' }} alt="" /></div>
                    <form onSubmit={this.onSubmit} className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="outlined-search"
                            label="Buscar"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            onChange={this.onChange}
                            style={{ width: '100%', height: '80%', margin: '3% 0% 0% 20%' }}
                        />
                    </form>
                </div>

                {productos !== 0 ?
                    <div style={{ backgroundColor: '#eff1ea', width: '100%' }}>
                        <div>
                            <h3>Historial de busqueda:</h3>
                            
                            {historial.map((h) =>
                                <ul>
                                    <li style={{ listStyle: 'none', float: 'left', padding: '10px' }} >{h}</li>
                                    
                                </ul>
                            )}
                          
                        </div>
                      
                        <div>
                            <Grid container spacing={16} justify={'center'} style={{ width: '100%', padding: 10, margin: 10 }}>
                                {productos.map((p, i) =>
                                    <Grid key={i} item>
                                        <SearcherDisplay product={p} ></SearcherDisplay>
                                    </Grid>
                                )}
                            </Grid>
                        </div>
                    </div> : <h2>Sin resultados de busqueda</h2>}
            </div>


        )
    }

}

Searcher.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Searcher);

