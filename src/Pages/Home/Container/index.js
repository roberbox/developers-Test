import React, { Component } from 'react';
import {BackGround, CantainerLoading} from '../../../Styles/index';
import {Layout, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SelectTypeOfChange from '../Component/SelectTypeOfChange';
import ListOfexchangeRate from '../Component/ListOfexchangeRate';
import axios from 'axios';

const { Header, Footer, Content } = Layout;

class Home extends Component {

    state= {
        categorys: [],
        currencyTypesList: undefined,  
        selectedCurrency: '',
        serverStatus: 200,
        difentValueCurrency:  false,
        arrayWithFilters: undefined,
        arrayWithFiltersB: undefined, 
        icon: ''       
    }

    componentDidMount() {
        this.currencyList()
        this.getCategorys()
        this.setClientConfiguration()
    }

    setClientConfiguration = () => {
        const filter =JSON.parse(localStorage.getItem('filter'))
        filter !== null && this.setState({arrayWithFilters: filter }) 
        const filterB =JSON.parse(localStorage.getItem('filterB'))
        filterB !== null && this.setState({arrayWithFiltersB: filterB }) 
        const icon = localStorage.getItem('icon')
        icon !== null && this.setState({icon:icon})
    }


    componentDidUpdate(prevProps) {
        const oldCurrencyValue = JSON.parse(localStorage.getItem('currencyValue '))
        const {currencyTypesList} =this.state
        oldCurrencyValue !== null && oldCurrencyValue.map(element => {
            currencyTypesList.map(subElement => {               
                element.currency === subElement.currency && element.value !== subElement.value && this.setState({ difentValueCurrency: true });   
            })
        })
    }

    getCategorys = async () => { 
        await axios.get('http://localhost:3000/configuration').then(
            result => {
            const category = result.data.currencyPairs;
            const obj =[];
            Object.entries(category).map(element => element[1].map(subelement => obj.push(subelement)));
            const categoryDist = Array.from(new Set(obj.map(e => e.code))).map(code => {
                return {code: code, name: obj.find(e => e.code === code).name }});    
            this.setState({Categorys: categoryDist})          
        }
        )
    }

    currencyList = async () => {
        await axios.get('https://api.exchangeratesapi.io/latest').then(
            result => { 
                const obj = []
                Object.getOwnPropertyNames(result.data.rates).forEach((val, index ,array) => {    
                    obj.push({"key": index ,"currency": val, "value": result.data.rates[val]})
                })   
                this.setState({currencyTypesList: obj, serverStatus: result.status })
                localStorage.setItem('currencyValue', JSON.stringify(obj));      
            }
        )
    }
    
    CategoryClicked = event => {
        const {currencyTypesList} = this.state
        const obj = []; 
        currencyTypesList.filter(filter => filter.currency === event && obj.push(filter))
        this.setState({arrayWithFilters : obj})
        localStorage.setItem('filter', JSON.stringify(obj));
        this.compareteCurrency();
    }

    CategoryClickedB = event => {
        const {currencyTypesList} = this.state
        const obj = []; 
        currencyTypesList.filter(filter => filter.currency === event && obj.push(filter))
        this.setState({arrayWithFiltersB : obj})
        localStorage.setItem('filterB', JSON.stringify(obj));
        this.compareteCurrency();
    }
    

    compareteCurrency = () => {
        const {arrayWithFilters, arrayWithFiltersB} = this.state;
        const currency = JSON.parse(localStorage.getItem('filter'))
        const currencyB = JSON.parse(localStorage.getItem('filterB'))
        arrayWithFilters && arrayWithFiltersB !== undefined &&
        currency.map(element =>{
            currencyB.map(subElement =>{
                element.value > subElement.value && this.setState({icon: '>'}, localStorage.setItem('icon', '>'))  
                element.value < subElement.value && this.setState({icon: '<'}, localStorage.setItem('icon', '<'))  
                element.value === subElement.value && this.setState({icon: '='}, localStorage.setItem('icon', '=')) 
            })
        }) 
    }

    handleQuitFitlers = () =>{
        this.setState({arrayWithFilters: undefined, arrayWithFiltersB: undefined, icon: ''})
        localStorage.removeItem('filter');
        localStorage.removeItem('filterB');
        localStorage.removeItem('icon')
        this.currencyList();  
    }

    render() {
        const {Categorys, currencyTypesList, icon,selectedCurrency, arrayWithFilters, arrayWithFiltersB ,serverStatus, difentValueCurrency} = this.state;    
        const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
        return (
                <>
                {
                    serverStatus === 200 ?
                    <Layout>
                    <Header>hola</Header>
                    <Content >
                        <BackGround onClick={this.prueba}>
                            {
                                Categorys === undefined ?
                                <CantainerLoading>
                                    <Spin indicator={antIcon} />
                                </CantainerLoading>
                                :<>
                                    <SelectTypeOfChange 
                                        allCategorys={Categorys} 
                                        CategoryClicked={this.CategoryClicked}
                                        CategoryClickedB={this.CategoryClickedB}
                                        serverStatus={serverStatus}
                                        quitFilters={this.handleQuitFitlers}
                                    />
                                    {
                                        currencyTypesList !== undefined &&  
                                            <ListOfexchangeRate
                                                difentValueCurrency={difentValueCurrency}
                                                currencyTypesList={currencyTypesList}
                                                currencyTypesListB={currencyTypesList}
                                                selectedCurrency={selectedCurrency}
                                                arrayWithFilters={arrayWithFilters}
                                                arrayWithFiltersB={arrayWithFiltersB}
                                                serverStatus={serverStatus}
                                                icon={icon}
                                                Categorys={Categorys}
                                            />
                                        }
                                </>
                            }
                            
                        </BackGround>
                    </Content>
                    <Footer>Footer</Footer>
                    </Layout>
                    :
                    <>
                    System error, please recharge the page
                    </>        
                }
                </>
        );
    }
}

export default Home;