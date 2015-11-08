import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class RightMenu extends Component {
  static propTypes = {
    menuData: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      facultyId: null,
      specialityId: null,
      groupId: null
      //currentLevel: 'FAC'
    };
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  handleMenuChange(event, value) {
    let id = value.key;
    if (id === 'BACK') {
      if (this.state.groupId) {
        this.setState({
          groupId: null,
          specialityId: null
        });
      } else if (this.state.specialityId) {
        this.setState({
          specialityId: null
        });
      } else if (this.state.facultyId) {
        this.setState({
          facultyId: null
        });
      }
    } else {
      id = +id;
      if (this.state.groupId) {
        this.setState({
          groupId: id
        });
      } else if (this.state.specialityId) {
        this.setState({
          groupId: id
        });
      } else if (this.state.facultyId) {
        this.setState({
          specialityId: id
        });
      } else {
        this.setState({
          facultyId: id
        });
      }
    }
  }

  renderMenu(items) {
    const menuItems = items.map((item) => {
      if (this.state.groupId === item.id) {
        return <MenuItem key={item.id} primaryText={item.label} disabled />;
      }
      return <MenuItem key={item.id} primaryText={item.label} />;
    });
    return (
      <Menu onItemTouchTap={this.handleMenuChange}>
        {menuItems}
      </Menu>
    );
  }

  render() {
    const menuData = this.props.menuData;
    let items;
    if (this.state.groupId) {
      items = menuData.groups
        .filter(item => item.specialityId === this.state.specialityId)
        .map(item => ({
          'id': item.id,
          'label': item.title
        }));
    } else if (this.state.specialityId) {
      items = menuData.groups
        .filter(item => item.specialityId === this.state.specialityId)
        .map(item => ({
          'id': item.id,
          'label': item.title
        }));
    } else if (this.state.facultyId) {
      items = menuData.specialities
        .filter(item => item.facultyId === this.state.facultyId)
        .map(item => ({
          'id': item.id,
          'label': item.short
        }));
    } else {
      items = menuData.faculties.map(item => ({
        'id': item.id,
        'label': item.short
      }));
    }
    if (this.state.facultyId) {
      items.push({
        'id': 'BACK',
        'label': 'Назад'
      });
    }
    return this.renderMenu(items);
  }
}
