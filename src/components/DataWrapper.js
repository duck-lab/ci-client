import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

export default function DataWrapper(WrappedComponent) {
  @inject('store')
  @observer
  class DataFetcher extends Component {
    constructor(props) {
      super(props)
      this.store = this.props.store.appState
    }

    componentDidMount() {
      console.log(this.props)
      let pathname = this.props.match.url
      let id = this.props.match.id ? this.props.match.id : null
      this.store.fetchData(pathname, id)
    }

    componentWillUnmount() {
      this.store.clearItems()
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
  DataFetcher.propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }
  return DataFetcher
}
