export default {
    container: {
        default_search_bar: {
            active: true,
            sort_order: 1000,
            content: require('../../../customize/catalog/components/search/bar').default
        },
        default_recents: {
            active: false,
            sort_order: 2000,
            content: require('../../../core/screens/catalog/components/search/recents').default
        },
        default_suggestion: {
            active: true,
            sort_order: 2000,
            content: require('../../../customize/catalog/components/search/suggestion').default
        },
        // default_results: {
        //     active: true,
        //     sort_order: 3000,
        //     content: require('../../../customize/catalog/components/search/results').default
        // },
    },
    content: {

    }
}
