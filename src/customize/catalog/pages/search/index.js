import React from 'react';
import { Container, Content } from 'native-base';
import SimiPageComponent from "@base/components/SimiPageComponent";
import NavigationManager from "@helper/NavigationManager";
import Events from '@helper/config/events';
import NewConnection from '@base/network/NewConnection';
import { products } from '@helper/constants';
import { connect } from 'react-redux';
class SearchProducts extends SimiPageComponent {

    constructor(props) {
        super(props);
        this.isBack = true;
        this.showSearch = false;
        this.state = {
            ...this.state,
            suggestion: [],
            recentVisiable: true,
            products: null,
            loadMore: true,
        }
        this.onRecentVisiable = this.onRecentVisiable.bind(this);
        this.openSearchResults = this.openSearchResults.bind(this);
    }

    onRecentVisiable(boolean) {
        this.setState({
            recentVisiable: boolean,
        })
    }
    request(query) {
        let params = [];
        params['filter[q]'] = query;
        new NewConnection()
            .init(products, 'get_products_data', this)
            .addGetData(params)
            .connect();
    }

    setData(data) {
        console.log("data: ", data);
        this.setState({ products: data.products });
        // this.props.storeData('setModalVisible', false);
        this.props.storeData('showLoading', { type: 'none' });
    }

    openSearchResults(query) {
        console.log("vao trong open")
        this.props.storeData('showLoading', { type: 'full' });
        this.tracking(query);
        if (this.recents) {
            this.recents.saveQuery(query);
        }
        this.request(query);
    }

    createRef(id) {
        switch (id) {
            case 'default_recents':
                return ref => (this.recents = ref);
            default:
                return undefined;
        }
    }

    addMorePropsToComponent(element) {
        return {
            onRef: this.createRef(element.id)
        };
    }

    renderPhoneLayout() {
        return (
            <Container style={{ paddingHorizontal: 10 }}>
                {this.renderLayoutFromConfig('search_layout', 'container')}
                {/* <Content>
                    {this.renderLayoutFromConfig('search_layout', 'content')}
                </Content> */}
            </Container>
        );
    }

    tracking(query) {
        let data = {};
        data['event'] = 'search_action';
        data['action'] = 'view_search_results';
        data['search_term'] = query;
        Events.dispatchEventAction(data, this);
    }

}
const mapStateToProps = (state) => {
    return { data: state.redux_data };
}
//Save to redux.
const mapDispatchToProps = (dispatch) => {
    return {
        storeData: (type, data) => {
            dispatch({ type: type, data: data })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
