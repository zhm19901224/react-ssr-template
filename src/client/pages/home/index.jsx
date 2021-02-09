import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHomeList } from './store/actionCreators'
import styles from './index.css'

const Home = (props) => {
    const { homeList } = props;

    // 只能在客户端执行，服务端不会执行，拿不到数据，所以以下不能用
    useEffect(() => {
        !homeList.legnth && props.getHomeList()
    }, []);
    return (
        <>
            <div className={styles.tt}>这是首页！</div>
            {
                homeList.map(({ title, id }) => <div key={id}>{title}</div>)
            }
        </>
    ) 
}

Home.loadData = (store) => {
    // 负责服务端渲染之前把当前路由页面内的数据加载好
    return store.dispatch(getHomeList(true))
}

export default connect(({ home }) => ({
    ...home,    // home结构就是reducer中定义的state
}), dispatch => ({
    getHomeList() {
        dispatch(getHomeList(false))
    }
}))(Home)