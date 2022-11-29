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
            search: null
        }
        this.search = null;
        this.onRecentVisiable = this.onRecentVisiable.bind(this);
        this.openSearchResults = this.openSearchResults.bind(this);
        this.handlerQueryAndSortBy = this.handlerQueryAndSortBy.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.canVisiableModal = false;
        this.orders = null;
    }

    onRecentVisiable(boolean) {
        this.setState({
            recentVisiable: boolean,
        })
    }
    request(query, order, dir) {
        this.props.storeData('setModalVisible', false);
        let params = [];
        params['filter[q]'] = query;
        if (order && dir) {
            params['order'] = order;
            params['dir'] = dir;
        }
        new NewConnection()
            .init(products, 'get_products_data', this)
            .addGetData(params)
            .connect();
    }

    onChangeSearch(keyword) {
        this.search = keyword;
        this.setState({ search: keyword })
    }

    setData(data) {
        this.setState({ products: data.products });
        this.orders = data.orders;
        this.props.storeData('showLoading', { type: 'none' });
    }

    openSearchResults(query) {
        this.search = query;
        this.props.storeData('showLoading', { type: 'full' });
        this.tracking(query);
        if (this.recents) {
            this.recents.saveQuery(query);
        }
        this.request(query);
    }

    handlerQueryAndSortBy(query, order, dir) {
        this.props.storeData('showLoading', { type: 'full' });
        this.request(query, order, dir);
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
