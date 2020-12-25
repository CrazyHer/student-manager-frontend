
const defaultState = {
    loading: false,
    data: [
        { content: '国家奖学金', audited: false, date: '2022/09', key: 1 },
        { content: '学业二等奖学金', audited: true, date: '2021/09', key: 2 }
    ]
};
export default (state = defaultState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}