import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import { fetchGroups } from '../actions';
import RightMenu from 'components/RightMenu'

// Normally you'd import your action creators, but I don't want to create
// a file that you're just going to delete anyways!
const actionCreators = {
  increment : () => ({ type : 'COUNTER_INCREMENT' })
};

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
  }

  constructor (props) {
    super(props);

    this.state = {
      groups: false
    };
  }

  componentWillMount() {
    // const { dispatch } = this.props;
    // dispatch(fetchGroups());
    fetch('http://127.0.0.1:8000/init').then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        // Examine the text in the response
        response.json().then((data) => {
          this.setState({
            menuData: data
          });
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  renderMenu() {
    return (
      <RightMenu menuData={this.state.menuData} />
    );
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <RaisedButton label='Increment' onClick={this.props.actions.increment}/>
        {this.state.menuData && this.renderMenu()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
