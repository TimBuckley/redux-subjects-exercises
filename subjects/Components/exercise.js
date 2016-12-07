////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'

let styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}


class Tab extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    active: React.PropTypes.bool
  }
  render() {
    const { name, active } = this.props
    return (
      <div
        className="Tab"
        style={active ? styles.activeTab : styles.tab}
      >
        {name}
      </div>
    )
  }
}


class Tabs extends React.Component {
  state = {
    id: 0
  }

  static propTypes = {
    data: React.PropTypes.array
  }

  onClickHandler(idx) {
    this.setState({
      id: idx
    })
  }

  render() {
    const { data } = this.props
    const tabs = data.map((tab, idx) => (
      <Tab
        key={tab.id}
        name={tab.name}
        active={idx === this.state.id}
        onClick={() => this.onClickHandler(idx)}
      />
    ))
    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {data
            .filter((_e, idx) => this.state.id === idx)[0]
            .description
          }
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  static propTypes = {
    countries: React.PropTypes.array
  }
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

ReactDOM.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
