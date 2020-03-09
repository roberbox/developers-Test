import React from 'react';
import {ContainerList, ColContainer,CantainerLoading} from '../../../Styles/index'
import { Table, Row } from 'antd';


const ListOfexchangeRate = (props) => {
    const { currencyTypesList, currencyTypesListB ,arrayWithFilters, icon, arrayWithFiltersB, Categorys } = props
    console.log('hijo',icon);
    
    const size = {
        xs: {span: 10},
        lg: {span: 10},
        xl: {span: 10}
    }
    const sizeIcon = {
        xs: {span: 2},
        lg: {span: 2},
        xl: {span: 2}
    }

    const columns = [
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
        }
      ];

      const columnsB = [
        {
          title: 'Currency',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
        }
      ];    

    return (
        <ContainerList Categorys={Categorys} >
            <Row>
                <ColContainer {...size}>
                {
                    arrayWithFilters === undefined ? 
                    <Table columns={columns} dataSource={currencyTypesList} />
                    :
                    <Table columns={columns} dataSource={arrayWithFilters} />
                }    
                </ColContainer>    
                <ColContainer {...sizeIcon}>
                    <CantainerLoading>
                        {icon}
                    </CantainerLoading>
                </ColContainer>
                <ColContainer {...size}>
                {
                    arrayWithFiltersB === undefined ? 
                    <Table columns={columnsB} dataSource={currencyTypesListB} />
                    :
                    <Table columns={columnsB} dataSource={arrayWithFiltersB} />
                }    
                </ColContainer>    
            
            </Row>
            
        </ContainerList>
    );
};

export default ListOfexchangeRate;